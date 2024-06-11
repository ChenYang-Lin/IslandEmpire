


export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, ENTITY_DATA) {
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.ENTITY_DATA = ENTITY_DATA;
        this.depth = this.y;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.repositionedX = this.ENTITY_DATA.repositionedX ?? 0;
        this.repositionedY = this.ENTITY_DATA.repositionedY ?? 0;
        this.width = this.ENTITY_DATA.width ?? 32;
        this.height = this.ENTITY_DATA.height ?? 32;
        this.offsetX = this.ENTITY_DATA.offsetX ?? 0;
        this.offsetY = this.ENTITY_DATA.offsetY ?? 0;
        
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