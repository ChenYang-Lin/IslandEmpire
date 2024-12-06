import { ITEM_DATA } from "../GameData.js";
import Entity from "./Entity.js";

export default class Drops extends Entity {
    constructor(scene, x, y, texture, name) {
        const entityData = ITEM_DATA[name]
        // scene, x, y, name, texture, frame, entityData
        super(scene, x, y, name, texture, name, entityData);

        this.name = name;

        
        this.collectable = this.entityData.collectable;

        // this.scene.worldManager.collectablesGroup.add(this);
        this.initInteractionHitBox(this);

    }

    onDeath(attacker) {
        this.destroyInteractionHitBox();
        super.onDeath(attacker);
    }

    
}