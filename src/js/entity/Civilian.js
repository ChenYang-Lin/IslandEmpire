import { ENTITY_DATA } from "../GameData.js"
import Ally from "./Ally.js";


export default class Civilian extends Ally {
    constructor(scene, x, y, name, texture, frame) {
        const entityData = ENTITY_DATA[name];
        super(scene, x, y, "civilian", "civilian", "civilian_idle_left", entityData);
        
        this.speed = 32;


        if (this.scene.currentMap === "island") {
            this.tempInterval = setInterval(() => {
                if (Math.random() < 0.5) {
                    console.log(this.name, "hoe")
                    this.animationController.hoe();
                } else {
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
        super.update();
        
        
        // console.log(this.currPath)
        this.moveRandomly(time, delta);
    }
}