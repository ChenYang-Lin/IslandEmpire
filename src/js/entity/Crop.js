
import { ENTITY_DATA } from "../GameData.js";

export default class Crop extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, sowingTime) {
        let phase = (Math.random() < 0.5) ? "_0" : "_0_alt"; // randomly choose two seed image;
        let frame = name + phase;
        console.log(frame)
        super(scene, x, y, "crops_grow", frame)

        this.scene = scene;
        this.name = name;
        this.depth = this.y;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.x += ENTITY_DATA[this.name].repositionedX;
        this.y += ENTITY_DATA[this.name].repositionedY;
        this.setSize(ENTITY_DATA[this.name].width, ENTITY_DATA[this.name].height);
        this.setOffset(ENTITY_DATA[this.name].offsetX, ENTITY_DATA[this.name].offsetY);

        this.harvestable = false;
        this.sowingTime = sowingTime;
        this.timeToGrow = ENTITY_DATA[this.name].timeToGrow;
        this.growTime = Date.now() - this.sowingTime;
        this.harvestableTime = sowingTime + this.timeToGrow;
        this.totalPhase = ENTITY_DATA[this.name].totalPhase;

        this.isHovered = false;
        this.setInteractive(this.scene.input.makePixelPerfect());
        this.graphics = this.scene.add.graphics();
        this.postFxPlugin = this.scene.plugins.get('rexoutlinepipelineplugin');
        this.on('pointerover', () => {
            // Add postfx pipeline
            this.postFxPlugin.add(this, {
                thickness: 1,
                outlineColor: 0xFFE50C
            });
            this.isHovered = true;
            this.createProgressBar();            
        })
        this.on('pointerout', () => {
            // Remove all outline post-fx pipelines
            this.postFxPlugin.remove(this);
            this.isHovered = false;
            this.destroyProgressBar()
        })
        this.on('pointerdown', () => {
            // 
        })
    }

    static preload(scene) {
        scene.load.atlas("crops_grow", "assets/crops_grow.png", "assets/crops_grow_atlas.json")
    }

    get position() {
        return {
            x: this.x - ENTITY_DATA[this.name].repositionedX,
            y: this.y - ENTITY_DATA[this.name].repositionedY,
        }
    }

    get onGrid() {
        return {
            x: Math.floor((this.x - ENTITY_DATA[this.name].repositionedX) / 32),
            y: Math.floor((this.y - ENTITY_DATA[this.name].repositionedY) / 32),
        }
    }



    createProgressBar() {
        this.graphics = this.scene.add.graphics();
        // Progress Box 
        this.graphics.fillStyle(0x000000, 1);
        this.progressBox = this.graphics.fillRoundedRect(this.x - this.displayWidth / 2, this.y - this.displayHeight / 2 + 32 - 6, this.displayWidth, 6, 2); // x, y, width, height, radius
        this.progressBox.depth = this.depth + 1;
        this.graphics.fillStyle(0x0000ff, 1);

        // Progress Bar
        let completionPercentage = this.growTime / this.timeToGrow;
        let progressBarWidth = (this.growTime > this.timeToGrow) ? (this.displayWidth - 4) : (this.displayWidth - 4) * completionPercentage;
        this.progressBar = this.graphics.fillRoundedRect(this.x - this.displayWidth / 2 + 2, this.y - this.displayHeight / 2 + 2 + 32 - 6, progressBarWidth, 6 - 4, 1); // x, y, width, height, radius
        this.progressBar.depth = this.depth + 2;
    }

    destroyProgressBar() {
        this.progressBox?.destroy();
        this.progressBar?.destroy();
    }

    onDeath() {
        this.scene.worldManager.growingCrops[`${this.onGrid.x},${this.onGrid.y}`] = undefined;
        this.scene.worldManager.map[`${this.onGrid.x},${this.onGrid.y}`].crop = undefined;
        this.destroy();
    }

    update() {
        // Update progress bar
            
        if (this.isHovered) {
            this.destroyProgressBar();
            this.createProgressBar();
        }
        if (this.harvestable)
            return;
        if (Date.now() > this.harvestableTime) {
            this.harvestable = true;
            this.scene.worldManager.collectablesGroup.add(this);
        }
        this.growTime = Date.now() - this.sowingTime;
        let phase = Math.floor((this.growTime / this.timeToGrow) * this.totalPhase);
        this.setFrame(this.name + "_" + phase);

    }
}