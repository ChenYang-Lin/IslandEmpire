import Drops from "./Drops.js";
import { ENTITY_DATA } from "./GameData.js";

export default class Resource extends Phaser.Physics.Arcade.Sprite {

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

        if (ENTITY_DATA[this.name].hasSecondPart){
            this.createSecondPart();
            this.hasSecondPart = true;
        }

        this.maxHP = ENTITY_DATA[this.name].maxHP;
        this.hp = this.maxHP;
    }

    static preload(scene) {
        scene.load.atlas("resource", "assets/resource.png", "assets/resource_atlas.json")
    }

    get position() {
        return {
            x: this.x - ENTITY_DATA[this.name].repositionedX,
            y: this.y - ENTITY_DATA[this.name].repositionedY,
        }
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
        ENTITY_DATA[this.name].drops.forEach((name) => {
            console.log(this.position.x, this.position.y)
            let drops = new Drops(this.scene, this.position.x, this.position.y, "item", name);
        })
        this.destroy();
    }
}