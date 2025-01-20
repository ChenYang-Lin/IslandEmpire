import { ENTITY_DATA } from "../../GameData.js";
import Ally from "./Ally.js";



export default class Soldier extends Ally {
    constructor(scene, name, x, y, texture, frame) {

        super (scene, "soldier", x, y, "soldier", "soldier_idle_left");

        this.speed = 32;
        
        this.timer = 0;
        // this.action = "idle";
        this.action = "moveRandomly";
        

        this.target;


        this.tempTargetsInAttackRange = [];
        this.targetsInAttackRange = [];

        this.tempTargetsInFollowableRange = [];
        this.targetsInFollowableRange = [];

        
        this.anims.play(`soldier_idle_left`, true);

        this.attackRangeSensor = this.scene.physics.add.image(this.position.x - 16, this.position.y - 16);
        this.attackRangeSensor.body.setCircle(15, 0, 0);

        this.followableRangeSensor = this.scene.physics.add.image(this.position.x - 16, this.position.y - 16);
        this.followableRangeSensor.body.setCircle(60, -45, -45);

        // Check for opposite Team in attack range
        this.scene.physics.add.overlap(this.attackRangeSensor, this.scene.collisionController.enemyGroup, (self, target) => {

            if (!this.tempTargetsInAttackRange.includes(target)) {
                this.tempTargetsInAttackRange.push(target)
            }
            if (!this.targetsInAttackRange.includes(target)) {
                this.targetsInAttackRange.push(target)
            }
        });

        // Check for opposite Team in followable range
        this.scene.physics.add.overlap(this.followableRangeSensor, this.scene.collisionController.enemyGroup, (self, target) => {

            if (!this.tempTargetsInFollowableRange.includes(target)) {
                this.tempTargetsInFollowableRange.push(target)
            }
            if (!this.targetsInFollowableRange.includes(target)) {
                this.targetsInFollowableRange.push(target)
                if (!this.target) {
                    this.target = target;
                }
            }

        });
    }

    updateTargetInAttackRange(time, delta) {
        this.timer += delta;
        this.targetsInAttackRange = this.targetsInAttackRange.filter(target => this.tempTargetsInAttackRange.includes(target));
        this.tempTargetsInAttackRange = [];

        if (this.targetsInAttackRange.includes(this.target)) {
            this.animationController.swordAttack(); 
        }
    }

    updateTargetInFollowableRange(time, delta) {
        this.timer += delta;
        this.targetsInFollowableRange = this.targetsInFollowableRange.filter(target => this.tempTargetsInFollowableRange.includes(target));
        this.tempTargetsInFollowableRange = [];

        if (this.targetsInFollowableRange.includes(this.target)) {
            // console.log("followable: ", this.target)
            this.action = "moveToTarget";
        } else {
            this.target = null;
            this.action = "moveRandomly";
        }

    }




    update(time, delta) {

        super.update(time, delta);
        // return update if entity destroyed.
        if (!this.body) 
            return;
        
        switch (this.action) {            
            case "idle":
                break;
            case "moveToTarget":
                this.moveToTarget(this.target);
                break;
            case "moveRandomly":
                this.moveRandomly(time, delta);
                break;
            default:
        }
        // console.log(this.onGrid.x, this.onGrid.y, this.position.x, this.position.y)
        // console.log()
        // if (!this.target) {
        //     this.action = "moveRandomly";
        // }

        this.attackRangeSensor.x = this.position.x;
        this.attackRangeSensor.y = this.position.y;
        this.followableRangeSensor.x = this.position.x;
        this.followableRangeSensor.y = this.position.y;

        this.updateTargetInAttackRange(time, delta);
        this.updateTargetInFollowableRange(time, delta);


    }
}