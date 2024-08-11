import Ally from "./Ally.js"


export default class Survivor extends Ally {
    constructor(scene, x, y, name, texture, frame) {
        const entityData = ENTITY_DATA[name];
        // scene, x, y, name, texture, frame
        super(scene, x, y, "player", "player", "player_idle_left", entityData);

        this.speed = 96;
        this.swordLength = 32;
    }

    update(time, delta) {
        
    }
}