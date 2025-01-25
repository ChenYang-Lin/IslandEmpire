import Ally from "./Ally.js"
import State from "./Stats.js";


export default class Survivor extends Ally {
    constructor(scene, name, x, y, texture, frame) {
        super(scene, name, x, y, texture, frame);

        this.speed = 48;

        this.scene.characterManager.characterGroup.add(this);
    }

    destroySelf() {
        super.destroySelf();
    }

    update(time, delta) {
        super.update();
        // return update if entity destroyed.
        if (!this.body) 
            return;

        
    }
}