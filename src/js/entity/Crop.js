
import { ENTITY_DATA } from "../GameData.js";

export default class Crop extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name) {
        let phase = (Math.random() < 0.5) ? "_0" : "_0_alt"; // randomly choose two seed image;
        let frame = name + phase;
        console.log(frame)
        super(scene, x, y, "crops_grow", frame)

        this.scene = scene;
        this.depth = this.y;
        this.name = name;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.x += ENTITY_DATA[this.name].repositionedX;
        this.y += ENTITY_DATA[this.name].repositionedY;
        this.setSize(ENTITY_DATA[this.name].width, ENTITY_DATA[this.name].height);
        this.setOffset(ENTITY_DATA[this.name].offsetX, ENTITY_DATA[this.name].offsetY);
    }

    static preload(scene) {
        scene.load.atlas("crops_grow", "assets/crops_grow.png", "assets/crops_grow_atlas.json")
    }
}