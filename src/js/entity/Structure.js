import { ENTITY_DATA } from "../GameData.js";
import Entity from "./Entity.js";



export default class Structure extends Entity {
    constructor(scene, x, y, texture, name) {
        const entityData = ENTITY_DATA[name];
        // scene, x, y, name, texture, frame
        super(scene, x, y, name, texture, name, entityData);

        this.name = name;
        

        
        this.scene.worldManager.obstacleCollidersGroup.add(this);
    }
    
}