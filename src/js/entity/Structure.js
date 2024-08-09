import { ENTITY_DATA } from "../GameData.js";
import Entity from "./Entity.js";



export default class Structure extends Entity {
    constructor(scene, x, y, texture, name) {
        // scene, x, y, name, texture, frame
        super(scene, x, y, name, texture, name);

        this.name = name;
        

        
        this.scene.worldManager.obstacleCollidersGroup.add(this);
    }
    
}