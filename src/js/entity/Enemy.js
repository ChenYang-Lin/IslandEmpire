import Character from "./Character.js";


export default class Enemy extends Character {
    constructor(scene, name, x, y, texture, frame, entityData) {
        let isAlly = false;
        super(scene, name, x, y, texture, frame, entityData, isAlly);

        this.scene.collisionController.enemyGroup.add(this);

        
        this.renderHealthBar();
    }




}