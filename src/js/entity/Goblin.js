import { ENTITY_DATA } from "../GameData.js";
import Character from "./Character.js";


export default class Goblin extends Character {
    constructor(scene, x, y, texture, name) {
        const entityData = ENTITY_DATA[name];
        // scene, x, y, name, texture, frame
        super(scene, x, y, "goblin", "goblin", "goblin_idle_left", entityData);


        this.anims.play(`goblin_walk_left`, true);
        
    }
}