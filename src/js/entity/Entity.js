


export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, entityData) {
        super(scene, x, y, texture, frame);

        console.log(this.scene)
        this.entityData = entityData;
        this.depth = this.y;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        
        


        this.repositionedX = this.entityData.repositionedX ?? 0;
        this.repositionedY = this.entityData.repositionedY ?? 0;
        this.imageWidth = this.entityData.imageWidth ?? 1;
        this.imageHeight = this.entityData.imageHeight ?? 1;
        this.width = this.entityData.width ?? 1;
        this.height = this.entityData.height ?? 1;
        this.offsetX = this.entityData.offsetX ?? 0;
        this.offsetY = this.entityData.offsetY ?? 0;

        this.adjustX = 0;
        if (this.width % 2 === 0) {
            this.adjustX = 16;
        }
        this.adjustY = 0;
        if (this.height % 2 === 0) {
            this.adjustY = 16;
        }
        
        // this.x += this.repositionedX;
        // this.y += this.repositionedY;

        this.x = x + (-this.imageWidth / 2 + this.offsetX + this.width / 2) * 32 + this.adjustX; 
        this.y = y + (this.imageHeight / 2 - this.offsetY - this.height / 2) * 32 + this.adjustY;
        this.setSize(this.width * 32, this.height * 32);
        this.setOffset(this.offsetX * 32, this.offsetY * 32);
    }

    get position() {
        return {
            x: this.x - this.adjustX - (-this.imageWidth / 2 + this.offsetX + this.width / 2) * 32,
            y: this.y - this.adjustY - (this.imageHeight / 2 - this.offsetY - this.height / 2) * 32,
        } 
    }

    get onGrid() {
        return {
            x: Math.floor(this.position.x / 32),
            y: Math.floor(this.position.y / 32),
        }
    }

    

    onDeath() {
        // console.log(`${this.onGrid.x},${this.onGrid.y}`)
        this.scene.worldManager.map[`${this.onGrid.x},${this.onGrid.y}`].entities = [];
        this.scene.worldManager.saveMapToLocalStorage();
        this.destroy();
    }
}