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

    update(time, delta) {
        this.timer += delta;
        if (this.timer >= 1000){
            this.tempDir *= -1;
            this.timer = 0;
        }
        let velocity = new Phaser.Math.Vector2();
        velocity.x += 1 * this.tempDir;
        velocity.normalize();

        // this.animationController.swordAttack(); 
        // this.animationController.move(velocity, "left", this)
    }
}