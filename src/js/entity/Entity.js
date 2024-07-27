


export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, entityData) {
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.entityData = entityData;
        this.depth = this.y;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.repositionedX = this.entityData.repositionedX ?? 0;
        this.repositionedY = this.entityData.repositionedY ?? 0;
        this.width = this.entityData.width ?? 32;
        this.height = this.entityData.height ?? 32;
        this.offsetX = this.entityData.offsetX ?? 0;
        this.offsetY = this.entityData.offsetY ?? 0;
        
        this.x += this.repositionedX;
        this.y += this.repositionedY;
        this.setSize(this.width, this.height);
        this.setOffset(this.offsetX, this.offsetY);
    }

    get position() {
        return {
            x: this.x - this.repositionedX,
            y: this.y - this.repositionedY,
        }
    }

    get onGrid() {
        return {
            x: Math.floor(this.position.x / 32),
            y: Math.floor(this.position.y / 32),
        }
    }

    

    onDeath() {
        this.destroy();
    }
}