import Character from "./Character.js";


export default class Enemy extends Character {
    constructor(scene, x, y, name, texture, frame, entityData) {
        let isAlly = false;
        super(scene, x, y, name, texture, frame, entityData, isAlly);

        this.scene.collisionController.enemyGroup.add(this);
    }

    onHit(damage) {
        this.anims.play(`goblin_death`, false);
    }
}