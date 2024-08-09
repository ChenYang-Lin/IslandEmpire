import { ENTITY_DATA } from "../GameData.js";



export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, texture, frame, entityData) {
        
        super(scene, x, y, texture, frame);

        this.entityData = entityData;
        this.name = name;
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.imageWidth = this.entityData.imageWidth ?? 1;
        this.imageHeight = this.entityData.imageHeight ?? 1;
        this.colliderWidth = this.entityData.colliderWidth ?? 1;
        this.colliderHeight = this.entityData.colliderHeight ?? 1;
        this.offsetX = this.entityData.offsetX ?? 0;
        this.offsetY = this.entityData.offsetY ?? 0;

        this.adjustX = 0;
        if (this.colliderWidth % 2 === 0) {
            this.adjustX = 16;
        }
        this.adjustY = 0;
        if (this.colliderHeight % 2 === 0) {
            this.adjustY = 16;
        }
        

        this.x = x + (-this.imageWidth / 2 + this.offsetX + this.colliderWidth / 2) * 32 + this.adjustX; 
        this.y = y + (this.imageHeight / 2 - this.offsetY - this.colliderHeight / 2) * 32 + this.adjustY;
        
        this.setSize(this.colliderWidth * 32, this.colliderHeight * 32);
        this.setOffset(this.offsetX * 32, this.offsetY * 32);
        
        this.depth = this.position.y;
    }

    static preload(scene) {
        scene.load.atlas("goblin", "assets/character/goblin.png", "assets/character/goblin_atlas.json")
        scene.load.animation("goblin_anim", "assets/character/goblin_anim.json");
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


    

    onDeath() {
        // console.log(`${this.onGrid.x},${this.onGrid.y}`)
        this.scene.worldManager.map[`${this.onGrid.x},${this.onGrid.y}`].entities = [];
        this.scene.worldManager.saveMapToLocalStorage();
        this.destroy();
    }
}