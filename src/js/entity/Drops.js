import { ENTITY_DATA } from "../GameData.js";

export default class Drops extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, name) {
        super(scene, x, y, texture, name);

        this.scene = scene;
        this.depth = this.y;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.name = name;

        this.x += ENTITY_DATA[this.name].repositionedX;
        this.y += ENTITY_DATA[this.name].repositionedY;
        this.setSize(ENTITY_DATA[this.name].width, ENTITY_DATA[this.name].height);
        this.setOffset(ENTITY_DATA[this.name].offsetX, ENTITY_DATA[this.name].offsetY);

        this.scene.dropsCollidersGroup.add(this);

    }

    
}