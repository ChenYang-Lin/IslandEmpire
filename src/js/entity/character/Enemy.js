import Character from "./Character.js";


export default class Enemy extends Character {
    constructor(scene, name, id, x, y, texture, frame) {
        let isAlly = false;
        super(scene, name, id, x, y, texture, frame, isAlly);

        this.scene.collisionController.enemyGroup.add(this);
        this.showHealthBar = true;

        
    }

    
    destroySelf() {
        this.scene.collisionController.enemyGroup.remove(this);
        super.destroySelf();
    }

    update(time, delta) {
        super.update(time, delta);
        // return update if entity destroyed.
        if (!this.body) 
            return;
        
        
    }

}