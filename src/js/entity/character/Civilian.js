import { ENTITY_DATA } from "../../GameData.js"
import Ally from "./Ally.js";


export default class Civilian extends Ally {
    constructor(scene, name, x, y, texture, frame) {
        super(scene, "civilian", x, y, "civilian", "civilian_idle_left");
        
        this.speed = 32;


        if (this.scene.currentMap === "island") {
            this.tempInterval = setInterval(() => {
                if (Math.random() < 0.005) {
                    console.log(this.name, "hoe")
                    this.animationController.hoe();
                }
                if (Math.random() < 0.005) {
                    console.log(this.name, "sow")
                    this.animationController.sow("potato_seed");
                }
            }, 2000);
        }
    }


 
    destroySelf() {
        clearInterval(this.tempInterval);
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