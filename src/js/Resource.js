import { ENTITY_DATA } from "./GameData.js";

export default class Resource extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, resourceType) {
        super(scene, x, y, texture, resourceType);

        this.scene = scene;
        // this.setScale(0.8)
        // this.depth = this.y - ENTITY_DATA[resourceType].repositionedY
        this.depth = this.y;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.name = resourceType;

        this.x += ENTITY_DATA[resourceType].repositionedX;
        this.y += ENTITY_DATA[resourceType].repositionedY;
        this.setSize(ENTITY_DATA[resourceType].width, ENTITY_DATA[resourceType].height);
        this.setOffset(ENTITY_DATA[resourceType].offsetX, ENTITY_DATA[resourceType].offsetY);

        if (ENTITY_DATA[resourceType].hasSecondPart){
            this.createSecondPart();
            this.hasSecondPart = true;
        }

        this.maxHP = ENTITY_DATA[resourceType].maxHP;
        this.hp = this.maxHP;
    }

    static preload(scene) {
        scene.load.atlas("resource", "assets/resource.png", "assets/resource_atlas.json")
    }

    createSecondPart() {
        this.secondPart = this.scene.add.sprite(this.x, this.y, "resource", "tree_top")
        this.secondPart.depth = this.depth;
        this.secondPart.y -= 55;
    }

    onHit(damage) {
        this.hp -= damage;
        console.log(this.hp)
        console.log(this.hasSecondPart, this.maxHP / 2)
        if (this.hasSecondPart && this.hp < this.maxHP / 2) {
            this.secondPart.destroy();
        }
        if (this.hp <= 0) {
            this.onDeath();
        }
    }

    onDeath() {
        this.destroy();
    }
}