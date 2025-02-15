
import { CROP_GROW_DATA, INTERACTION_HITBOX_DATA } from "../GameData.js";
import Entity from "./Entity.js";

export default class Crop extends Entity {
    constructor(scene, name, id, x, y, sowingTime) {
        let phase = (Math.random() < 0.5) ? "_0" : "_0_alt"; // randomly choose two seed image;
        let frame = name + phase;
        super(scene, name, id, x, y, "crops_grow", name + "_0")
        
        this.name = name;
        console.log(this.name)
        this.entityData = CROP_GROW_DATA[this.name];

        this.harvestable = false;
        this.sowingTime = sowingTime;
        this.timeToGrow = this.entityData.timeToGrow;
        this.growTime = Date.now() - this.sowingTime;
        this.harvestableTime = sowingTime + this.timeToGrow;
        this.totalPhase = this.entityData.totalPhase;

        this.isHovered = false;
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

    }

    static preload(scene) {
        scene.load.atlas("crops_grow", "assets/crops_grow.png", "assets/crops_grow_atlas.json")
    }



    createProgressBar() {
        this.graphics = this.scene.add.graphics();
        // Progress Box 
        this.graphics.fillStyle(0x000000, 1);
        this.progressBox = this.graphics.fillRoundedRect(this.x - this.displayWidth / 2, this.y - this.displayHeight / 2 + 32 - 6, this.displayWidth, 6, 2); // x, y, width, height, radius
        this.progressBox.depth = this.depth + 1;
        this.graphics.fillStyle(0x0000ff, 1);

        // Progress Bar
        this.calculateCropProgress();
        let progressBarWidth = (this.growTime > this.timeToGrow) ? (this.displayWidth - 4) : (this.displayWidth - 4) * this.completionPercentage;
        this.progressBar = this.graphics.fillRoundedRect(this.x - this.displayWidth / 2 + 2, this.y - this.displayHeight / 2 + 2 + 32 - 6, progressBarWidth, 6 - 4, 1); // x, y, width, height, radius
        this.progressBar.depth = this.depth + 2;
    }

    calculateCropProgress() {
        this.completionPercentage = this.growTime / this.timeToGrow;
        if (this.completionPercentage >= 1) {
            this.completionPercentage = 1;
        }
    }

    destroyProgressBar() {
        this.progressBox?.destroy();
        this.progressBar?.destroy();
    }

    onHarvest(harvester) {
        if (!this.harvestable) {
            return;
        }
        let collectableList = [];
        INTERACTION_HITBOX_DATA[this.name]?.forEach((interactable) => {
            if (interactable.type === "collectable") {
                collectableList.push(interactable.name);
            }
        })
        collectableList.forEach((collectable) => {
            harvester.storageBag.push(collectable);
        })
        this.onDeath(harvester);
    }

    onDeath(attacker) {
        delete this.scene.worldManager.growingCrops[`${this.onGrid.x},${this.onGrid.y}`]
        delete this.scene.worldManager.map[`${this.onGrid.x},${this.onGrid.y}`].crop;
        delete this.scene.worldManager.saveMapToLocalStorage();
        this.destroyInteractionHitBox();
        super.onDeath(attacker);
    }

    setHarvestable() {
        this.harvestable = true;
        this.scene.worldManager.collectablesGroup.add(this);
        this.initInteractionHitBox(this, true);
    }

    showGeneralInfoHUD() {

        if (!this.body) 
            return;
        
        super.showGeneralInfoHUD();
        
        let progress = document.createElement("div");
        progress.setAttribute("id", "entity-general-info-progress");

        let progressBoxDiv = document.createElement("div");
        progressBoxDiv.setAttribute("id", "entity-general-info-progress-box");
        let progressPercentageDiv = document.createElement("div");
        progressPercentageDiv.setAttribute("id", "entity-general-info-progress-percentage");
        
        let progressBarDiv = document.createElement("div");
        progressBarDiv.setAttribute("id", "entity-general-info-progress-bar");
        progressBarDiv.appendChild(progressBoxDiv);
        progressBarDiv.appendChild(progressPercentageDiv);

        this.calculateCropProgress();
        progressPercentageDiv.style.width = `calc(${this.completionPercentage * 100}% - 4px)`;
        
        progress.appendChild(progressBarDiv);
        this.entityGeneralInfoList.appendChild(progress); // htrml: "id", "entity-general-info-list"
    }

    update() {
        // return update if entity destroyed.
        if (!this.body) 
            return;
        

            
        if (this.isHovered) {
            this.destroyProgressBar();
            this.createProgressBar();
        }
        if (this.harvestable) {
            return;
        }
        if (Date.now() > this.harvestableTime) {
            this.setHarvestable();
        }

        this.growTime = Date.now() - this.sowingTime;
        let phase = Math.floor((this.growTime / this.timeToGrow) * this.totalPhase);
        if (phase > this.totalPhase) {
            this.setFrame(this.name + "_" + this.totalPhase)
        } else {
            this.setFrame(this.name + "_" + phase);
        }

    }
}