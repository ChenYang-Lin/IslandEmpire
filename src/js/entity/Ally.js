import Character from "./Character.js";


export default class Ally extends Character {
    constructor(scene, x, y, name, texture, frame, entityData) {
        let isAlly = true;
        super(scene, x, y, name, texture, frame, entityData, isAlly);


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