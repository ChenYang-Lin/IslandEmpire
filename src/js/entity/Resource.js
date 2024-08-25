import Drops from "./Drops.js";
import { ENTITY_DATA } from "../GameData.js";
import Entity from "./Entity.js";

export default class Resource extends Entity {

    constructor(scene, x, y, texture, name) {
        const entityData = ENTITY_DATA[name];
        // scene, x, y, name, texture, frame, entityData
        super(scene, x, y, name, texture, name, entityData);

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

        this.transparentSprites = [];
        let transparentHitBox = this.entityData.transparentHitBox;
        transparentHitBox.forEach((hitbox) => {
            let colliderBody = this.scene.add.sprite(this.secondPart.x, this.secondPart.y, "resource", "tree_top");
            colliderBody.alpha = 0;
            this.transparentSprites.push(colliderBody);
            this.scene.physics.add.existing(colliderBody);

            colliderBody.body.setSize(hitbox.transparentWidth * 32, hitbox.transparentHeight * 32);
            colliderBody.body.setOffset(hitbox.transparentOffsetX * 32, hitbox.transparentOffsetY * 32);
            
            this.scene.physics.add.overlap(this.scene.player, colliderBody, (player, hitbox) => {
                    this.secondPart.alpha = 0.3;
                    setTimeout(() => {
                        this.secondPart.alpha = 1;
                    }, 50)
                }
            );
        })




        
    }

    onHit(damage) {
        this.hp -= damage;
        if (this.hasSecondPart && this.hp < this.maxHP / 2) {
            this.transparentSprites.forEach((transparentSprite) => {
                transparentSprite.destroy();
            })
            this.secondPart.destroy();
        }
        if (this.hp <= 0) {
            this.onDeath();
        }
    }

    onDeath() {
        this.entityData.drops.forEach((name) => {
            let drops = new Drops(this.scene, this.position.x + Math.floor(Math.random() * 20), this.position.y + Math.floor(Math.random() * 20), "item", name);
        })
        super.onDeath();
    }
}