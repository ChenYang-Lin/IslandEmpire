import { ITEM_DATA } from "../GameData.js";

export default class Drops extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, name) {
        super(scene, x, y, texture, name);

        this.scene = scene;
        this.depth = this.y;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.name = name;

        this.x += ITEM_DATA[this.name].repositionedX;
        this.y += ITEM_DATA[this.name].repositionedY;
        this.setSize(ITEM_DATA[this.name].width, ITEM_DATA[this.name].height);
        this.setOffset(ITEM_DATA[this.name].offsetX, ITEM_DATA[this.name].offsetY);
        this.collectable = ITEM_DATA[this.name].collectable;

        this.scene.worldManager.collectablesGroup.add(this);

    }

    onDeath() {
        this.destroy();
    }

    
}