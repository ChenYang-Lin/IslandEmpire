import Drops from "./Drops.js";
import { ENTITY_DATA } from "../GameData.js";
import Entity from "./Entity.js";

export default class Resource extends Entity {

    constructor(scene, name, x, y, texture) {
        // const entityData = ENTITY_DATA[name];
        // scene, x, y, name, texture, frame, entityData
        super(scene, name, x, y, texture, name);

        this.name = name;
        this.hasSecondPart = false;
        

        if (this.entityData.type === "multiple"){
            this.createSecondPart();
            this.hasSecondPart = true;
        }

        this.maxHP = this.entityData.maxHP;
        this.hp = this.maxHP;


        
        this.scene.worldManager.resourceCollidersGroup.add(this);
    }

    static preload(scene) {
        scene.load.atlas("resource", "assets/resource.png", "assets/resource_atlas.json")
    }

    createSecondPart() {
        this.secondPart = this.scene.add.sprite(this.x, this.y, "resource", "tree_top");
        this.secondPart.depth = this.depth;
        this.secondPart.y -= 55;

        // Transparent hitbox
        this.initTransparentHitBox(this.secondPart);


    }

    setTransparent(opacity) {
        this.secondPart.alpha = opacity;
    }



    onHit(attacker, damage) {
        this.hp -= damage;
        if (this.hasSecondPart && this.hp < this.maxHP / 2) {
            this.transparentSprites.forEach((transparentSprite) => {
                transparentSprite.destroy();
            })
            this.secondPart.destroy();
        }
        super.onHit(attacker, damage);
    }

    onDeath(attacker) {
        this.entityData.drops.forEach((name) => {
            let drops = new Drops(this.scene, name, this.position.x + Math.floor(Math.random() * 20), this.position.y + Math.floor(Math.random() * 20), "item", name);
        })
        
        if (this.scene.currentMap !== "infinite-forest" && this.onGrid.x >= 0 && this.scene.worldManager.map[`${this.onGrid.x},${this.onGrid.y}`]) {
            this.scene.worldManager.map[`${this.onGrid.x},${this.onGrid.y}`].entities = [];
            this.scene.worldManager.saveMapToLocalStorage();
        }
        super.onDeath(attacker);
    }
}