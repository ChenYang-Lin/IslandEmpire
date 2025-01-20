import { ENTITY_DATA } from "../../GameData.js";
import Enemy from "./Enemy.js";


export default class Goblin extends Enemy {
    constructor(scene, name, x, y, texture, frame) {
        const entityData = ENTITY_DATA[name];
        // scene, x, y, name, texture, frame
        super(scene, "goblin", x, y, "goblin", "goblin_idle_left");

        
        this.scene.characterManager.characterGroup.add(this);

        this.speed = 32;
        this.swordLength = 16;

        this.timer = 0;
        this.tempDir = 1;
        this.action = "idle";
        this.moveToLandX = 0;
        this.moveToLandY = 0;

        this.target = "player"
        this.tempTargetsInAttackRange = []
        this.targetsInAttackRange = []
        

        this.anims.play(`goblin_idle_left`, true);

        console.log(this.position.x - 16)
        this.attackRangeSensor = this.scene.physics.add.image(this.position.x - 16, this.position.y - 16);
        this.attackRangeSensor.body.setCircle(15, 0, 0);

        this.followTargetRangeSensor = this.scene.physics.add.image(this.position.x - 16, this.position.y - 16);
        this.followTargetRangeSensor.body.setCircle(30, 0, 0);

        // Check overlap for opposite Team
        this.scene.physics.add.overlap(this.attackRangeSensor, this.scene.collisionController.allyGroup, (self, target) => {

            if (!this.tempTargetsInAttackRange.includes(target)) {
                this.tempTargetsInAttackRange.push(target)
            }
            if (!this.targetsInAttackRange.includes(target)) {
                this.targetsInAttackRange.push(target)
            }
            this.targetsInAttackRange.forEach((target) => {
                if (target.name === "player") {
                    this.animationController.swordAttack(); 
                    return;
                }
            })
        });
    }


    updateTargetInRange(time, delta) {
        this.timer += delta;
        this.targetsInAttackRange = this.targetsInAttackRange.filter(target => this.tempTargetsInAttackRange.includes(target));
        this.tempTargetsInAttackRange = [];

    }

    moveToLand() {
        let velocity = new Phaser.Math.Vector2();
        if (this.onGrid.x === this.moveToLandX && this.onGrid.y === this.moveToLandY) {
            console.log(this.onGrid.y, this.moveToLandY )   
            this.action = "moveToTarget";
            // this.action = "moveRandomly";
            this.animationController.move(velocity, "up", this);
            return;
        }
        velocity.y = -1;
        this.animationController.move(velocity, "up", this);
    }

    destroySelf() {
        super.destroySelf();
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
                this.moveToTarget(this.scene.player.characterOnControl);
                break;
            case "moveRandomly":
                this.moveRandomly(time, delta);
                break;
            case "moveToLand":
                this.moveToLand();
                break;
            default:
        }

        this.attackRangeSensor.x = this.position.x;
        this.attackRangeSensor.y = this.position.y;

        this.updateTargetInRange(time, delta);



        // this.animationController.swordAttack(); 
        // this.animationController.move(velocity, "left", this)
    }
}