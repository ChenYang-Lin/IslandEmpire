import { ITEM_DATA } from "../GameData.js";
import Entity from "./Entity.js";

export default class Drops extends Entity {
    constructor(scene, x, y, texture, name) {
        const ENTITY_DATA = ITEM_DATA[name]
        super(scene, x, y, texture, name, ENTITY_DATA);

        this.name = name;

        
        this.collectable = this.ENTITY_DATA.collectable;

        this.scene.worldManager.collectablesGroup.add(this);

    }

    onDeath() {
        super.onDeath();
    }

    
}