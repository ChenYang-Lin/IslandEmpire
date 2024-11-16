import { ENTITY_DATA } from "../GameData.js";



export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, texture, frame, entityData, isAlly) {
        
        super(scene, x, y, texture, frame);

        this.entityData = entityData;
        this.name = name;
        this.isAlly = isAlly;
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.imageWidth = this.entityData.imageWidth ?? 1;
        this.imageHeight = this.entityData.imageHeight ?? 1;
        this.colliderWidth = this.entityData.colliderWidth ?? 1;
        this.colliderHeight = this.entityData.colliderHeight ?? 1;
        this.offsetX = this.entityData.offsetX ?? 0;
        this.offsetY = this.entityData.offsetY ?? 0;
        this.hpBarOffsetY = this.entityData.hpBarOffsetY ?? 20;
        this.hpBarWidth = this.entityData.hpBarWidth ?? 32;

        // Default stats
        this.maxHp = 30;
        this.hp = this.maxHp;

        this.adjustX = 0;
        if (this.colliderWidth % 2 === 0) {
            this.adjustX = 16;
        }
        this.adjustY = 0;
        if (this.colliderHeight % 2 === 0) {
            this.adjustY = 16;
        }
        

        this.setPosition(x, y);
        
        this.setSize(this.colliderWidth * 32, this.colliderHeight * 32);
        this.setOffset(this.offsetX * 32, this.offsetY * 32);
        
        this.depth = this.position.y;


        // Selected
        this.setInteractive(this.scene.input.makePixelPerfect());
 
        this.on('pointerdown', () => {
            // Add postfx pipeline
            this.scene.inputController.selectedEntity = this;
            this.scene.inputController.selectedEntityREXOutline.add(this, {
                thickness: 1,
                outlineColor: 0xFF0000
            });
            console.log('clicked: ', this.name)
        })



    }

    static preload(scene) {
        scene.load.atlas("player", "assets/player.png", "assets/player_atlas.json");
        scene.load.animation("player_anim", "assets/player_anim.json");
        scene.load.atlas("player_fishing", "assets/player_fishing.png", "assets/player_fishing_atlas.json");
        scene.load.animation("player_fishing_anim", "assets/player_fishing_anim.json");
        
        scene.load.atlas("goblin", "assets/character/goblin.png", "assets/character/goblin_atlas.json")
        scene.load.animation("goblin_anim", "assets/character/goblin_anim.json");

        scene.load.atlas("raft", "assets/entity/raft.png", "assets/entity/raft_atlas.json")
        scene.load.animation("raft_anim", "assets/entity/raft_anim.json");
    }

    setPosition(x, y) {
        this.x = x + (-this.imageWidth / 2 + this.offsetX + this.colliderWidth / 2) * 32 + this.adjustX; 
        this.y = y + (this.imageHeight / 2 - this.offsetY - this.colliderHeight / 2) * 32 + this.adjustY;
    }

    get position() {
        let x = this.x - this.adjustX - (-this.imageWidth / 2 + this.offsetX + this.colliderWidth / 2) * 32;
        let y = this.y - this.adjustY - (this.imageHeight / 2 - this.offsetY - this.colliderHeight / 2) * 32;
        // console.log(this.name, x, y);
        return { x, y } 
    }

    get onGrid() {
        return {
            x: Math.floor((this.position.x+16) / 32),
            y: Math.floor((this.position.y+16) / 32),
        }
    }

    renderHealthBar() {
        this.graphics = this.scene.add.graphics();

        this.healthBarBG?.destroy();
        this.healthBar?.destroy();

        let x = this.position.x - (this.hpBarWidth/2);
        let y = this.position.y - this.hpBarOffsetY;
        let width = this.hpBarWidth;
        let height = 6;
        let radius = 2;


        // HealthBarBackground
        this.graphics.fillStyle(0x000000, 1);
        this.healthBarBG = this.graphics.fillRoundedRect(x, y, width, height, radius); // x, y, width, height, radius
        this.healthBarBG.depth = this.depth + 1;
        

        // Healthbar
        this.graphics.fillStyle(0xff0000, 1);
        if (this.isAlly === undefined) {
            this.graphics.fillStyle(0x0000ff, 1);
        } else if (this.isAlly) {
            this.graphics.fillStyle(0x00ff00, 1);
        }
        console.log(this.hp, this.maxHp)
        this.healthBar = this.graphics.fillRoundedRect(x+2, y+2, (this.hp/this.maxHp)*(width-4), height-4, 1); // x, y, width, height, radius
        this.healthBar.depth = this.depth + 2;
    }

    onHit(attacker, damage) {    
        if (this.hp <= 0) { 
            console.log(attacker)
            this.onDeath(attacker);
        }
    }  


    onDeath(attacker) {
        this.scene.eventEmitter.emit(`${attacker}-destroy-${this.name}`);
        this.destroy();
        
    }
    
    destroySelf() {
        this.destroy();
    }
}