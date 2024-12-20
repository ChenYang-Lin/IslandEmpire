import { ENTITY_DATA } from "../GameData.js";
import Character from "./Character.js";



export default class Animal extends Character {
    constructor(scene, x, y, name, texture, frame) {
        const entityData = ENTITY_DATA[name];
        super(scene, x, y, name, texture, frame, entityData);

        this.speed = 16;
    }

    update(time, delta) {
        super.update();
        this.moveRandomly(time, delta);
    }
}