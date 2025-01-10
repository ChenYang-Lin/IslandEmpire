import Character from "./Character.js";


export default class Ally extends Character {
    constructor(scene, name, x, y, texture, frame, entityData) {
        let isAlly = true;
        super(scene, name, x, y, texture, frame, entityData, isAlly);


        this.scene.collisionController.allyGroup.add(this);
        
    }

    destroySelf() {
        this.scene.collisionController.allyGroup.remove(this);
        super.destroySelf();
    }
    
    update() {
        super.update();
    }
}