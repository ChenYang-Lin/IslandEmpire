import { ENTITY_DATA } from "../../GameData.js";
import Character from "./Character.js";



export default class Animal extends Character {
    constructor(scene, name, x, y, texture, frame) {
        super(scene, name, x, y, texture, frame);

        this.speed = 16;
    }

    destroySelf() {
        super.destroySelf();
    }

    update(time, delta) {
        super.update(time, delta);
        // return update if entity destroyed.
        if (!this.body) 
            return;
        
        this.moveRandomly(time, delta);
    }
}