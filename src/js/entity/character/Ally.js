import Character from "./Character.js";


export default class Ally extends Character {
    constructor(scene, name, x, y, texture, frame) {
        let isAlly = true;
        super(scene, name, x, y, texture, frame, isAlly);


        this.scene.collisionController.allyGroup.add(this);
        this.showHealthBar = true;
        
    }

    destroySelf() {
        this.scene.collisionController.allyGroup.remove(this);
        super.destroySelf();
    }
    
    update(time, delta) {
        super.update(time, delta);
        
        if (!this.body) 
            return;
        

    }
}