import { ENTITY_DATA } from "../GameData.js";
import Entity from "./Entity.js";

export default class Drops extends Entity {
    constructor(scene, name, x, y, texture, frame) {
        // scene, name, x, y, texture, frame
        console.log("drop:, ",texture, frame)
        super(scene, name, x, y, texture, frame);


        console.log("new drop: ", this.name);
        this.collectable = this.entityData.collectable;

        this.scene.worldManager.collectablesGroup.add(this);
        this.initInteractionHitBox(this, true);

    }

    onDeath(attacker) {
        super.onDeath(attacker);
    }

    
}