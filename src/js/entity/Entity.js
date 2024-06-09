


export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, ENTITY_DATA) {
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.ENTITY_DATA = ENTITY_DATA;
        this.depth = this.y;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.x += this.ENTITY_DATA.repositionedX;
        this.y += this.ENTITY_DATA.repositionedY;
        this.setSize(this.ENTITY_DATA.width, this.ENTITY_DATA.height);
        this.setOffset(this.ENTITY_DATA.offsetX, this.ENTITY_DATA.offsetY);
    }

    get position() {
        return {
            x: this.x - this.ENTITY_DATA.repositionedX,
            y: this.y - this.ENTITY_DATA.repositionedY,
        }
    }

    get onGrid() {
        return {
            x: Math.floor((this.x - this.ENTITY_DATA.repositionedX) / 32),
            y: Math.floor((this.y - this.ENTITY_DATA.repositionedY) / 32),
        }
    }

    

    onDeath() {
        this.destroy();
    }
}