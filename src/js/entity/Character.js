import AnimationController from "./AnimationController.js";
import Entity from "./Entity.js";
import Hitbox from "./Hitbox.js";


export default class Character extends Entity {
    constructor(scene, x, y, name, texture, frame, entityData, isAlly) {
        super(scene, x, y, name, texture, frame, entityData);

        this.isAlly = isAlly;
        this.direction = "left"
        this.speed = 64;
        this.swordLength = 32;
        
        this.animationController = new AnimationController(this.scene, this);
        this.hitbox = new Hitbox(this.scene, this);

    }

    onHit(damage) {       
        this.hp -= damage;
        this.renderHealthBar();
        if (this.hp <= 0) {
            this.onDeath();
        }
        
    }  

    onDeath() {
        this.anims.play(`goblin_death`, false);  
        this.healthBarBG?.destroy();
        this.healthBar?.destroy();
        this.destroyed = true;
        this.destroy();  
    }


    update() {
        
    }

}