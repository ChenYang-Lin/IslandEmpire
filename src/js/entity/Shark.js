import Entity from "./Entity.js";


export default class Shark extends Entity {
    constructor(scene, name, x, y, texture, frame) {
        super(scene, name, x, y, texture, frame);

        this.speed = 32;
        this.direction = "right";
        this.anims.play(`shark_right`, true);
    }

    attackLand() {
        if (this.onGrid.x) {
            
        }
    }

    update() {
        
        let velocity = new Phaser.Math.Vector2();
        // velocity.x = 1;

        // console.log(this.onGrid)
        if (this.onGrid.x > 5) {
            this.direction = "left";
        }
        if (this.onGrid.x < -5) {
            this.direction = "right";
        }

        switch (this.direction) {
            case "left":
                velocity.x = -1;
                break;
            case "right":
                velocity.x = 1;
        }

        
        velocity = velocity.scale(this.speed);
        this.setVelocity(velocity.x, velocity.y);
        this.anims.play(`shark_${this.direction}`, true);
    }
}