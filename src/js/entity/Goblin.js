import { ENTITY_DATA } from "../GameData.js";
import Enemy from "./Enemy.js";


export default class Goblin extends Enemy {
    constructor(scene, x, y, name, texture, frame) {
        const entityData = ENTITY_DATA[name];
        // scene, x, y, name, texture, frame
        super(scene, x, y, "goblin", "goblin", "goblin_idle_left", entityData);

        this.speed = 96;
        this.swordLength = 16;

        this.timer = 0;
        this.tempDir = 1;
        

        this.anims.play(`goblin_idle_left`, true);


    }

    getPathToPlayer() {
        console.log(this)
        return this.scene.worldManager.astar.findPath(
            this.scene.worldManager.map, 
            {tx: this.onGrid.x, ty: this.onGrid.y}, 
            {tx: this.scene.player.onGrid.x, ty: this.scene.player.onGrid.y}, 
            this.scene,
        )
    }

    moveToPlayer() {
        let velocity = new Phaser.Math.Vector2();
        if (this.pathToPlayer?.length > 0) {
            this.nextGridCell = this.pathToPlayer[0];
            console.log(this.position.y, this.nextGridCell.ty*32)
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
                this.pathToPlayer.shift();
            }
            
            this.animationController.move(velocity, this.direction, this);
            
        } else {
            console.log("finding path")
            this.pathToPlayer = this.getPathToPlayer();
        }
    }


    update(time, delta) {
        // this.timer += delta;
        // if (this.timer >= 1000){
        //     this.tempDir *= -1;
        //     this.timer = 0;
        // }
        // let velocity = new Phaser.Math.Vector2();
        // velocity.x += 1 * this.tempDir;
        // velocity.normalize();

        if (this.destroyed) return;
        
        
        
        this.moveToPlayer();

        // this.animationController.swordAttack(); 
        // this.animationController.move(velocity, "left", this)
    }
}