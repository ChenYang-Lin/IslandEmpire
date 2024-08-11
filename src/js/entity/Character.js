import AnimationController from "./AnimationController.js";
import Entity from "./Entity.js";
import Hitbox from "./Hitbox.js";


export default class Character extends Entity {
    constructor(scene, x, y, name, texture, frame, entityData) {
        super(scene, x, y, name, texture, frame, entityData);

        this.direction = "left"
        this.speed = 96;
        this.swordLength = 32;
        
        this.animationController = new AnimationController(this.scene, this);
        this.hitbox = new Hitbox(this.scene, this);

    }


    update() {
        
    }

}