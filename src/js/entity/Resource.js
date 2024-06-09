import Drops from "./Drops.js";
import { RESOURCE_DATA } from "../GameData.js";
import Entity from "./Entity.js";

export default class Resource extends Entity {

    constructor(scene, x, y, texture, name) {
        const ENTITY_DATA = RESOURCE_DATA[name];
        super(scene, x, y, texture, name, ENTITY_DATA);

        this.name = name;
        this.hasSecondPart = false;
        

        if (this.ENTITY_DATA.type === "multiple"){
            this.createSecondPart();
            this.hasSecondPart = true;
        }

        this.maxHP = this.ENTITY_DATA.maxHP;
        this.hp = this.maxHP;

        
        this.scene.worldManager.resourceCollidersGroup.add(this);
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
        if (this.hasSecondPart && this.hp < this.maxHP / 2) {
            this.secondPart.destroy();
        }
        if (this.hp <= 0) {
            this.onDeath();
        }
    }

    onDeath() {
        this.ENTITY_DATA.drops.forEach((name) => {
            let drops = new Drops(this.scene, this.position.x + Math.floor(Math.random() * 20), this.position.y + Math.floor(Math.random() * 20), "item", name);
        })
        super.onDeath();
    }
}