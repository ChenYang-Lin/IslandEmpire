


export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.depth = this.y;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

    }
}