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

        this.action = "rest";
        this.path;
        
        this.animationController = new AnimationController(this.scene, this);
        this.hitbox = new Hitbox(this.scene, this);

    }

    moveToGridCell(path) {
        if (path?.length > 0) {
            let velocity = new Phaser.Math.Vector2();
            this.nextGridCell = path[0];
    
            if (this.position.x < this.nextGridCell.tx*32-4) {
                velocity.x = 1;
                this.direction = "right";
            } else if (this.position.x > this.nextGridCell.tx*32+4) {
                velocity.x = -1;
                this.direction = "left";
            } else if (this.position.y > this.nextGridCell.ty*32+4) {
                velocity.y = -1;
                this.direction = "up";
            } else if (this.position.y < this.nextGridCell.ty*32-4) {
                velocity.y = 1;                
                this.direction = "down";
            } else {
                path.shift();
            }
            
            this.animationController.move(velocity, this.direction, this);
        } else {
            this.autoControl = false;
        }
    }


    onHit(attacker, damage) {       
        this.hp -= damage;
        this.renderHealthBar();

        super.onHit(attacker, damage);
    }  

    onDeath(attacker) {
        this.anims.play(`goblin_death`, false);  
        this.healthBarBG?.destroy();
        this.healthBar?.destroy();
        this.destroyed = true;

        super.onDeath(attacker);
    }


    update() {

        if (this.destroyed) return;


        
        
        this.depth = this.position.y
    }

}