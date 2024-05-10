

export default class InputController {
    constructor(scene) {
        this.scene = scene;
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.keyJ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    }

    movementController() {
        let velocity = new Phaser.Math.Vector2();
        let direction;
        

        if (this.cursor.up.isDown) {
            velocity.y -= 1;
            direction = "up";
        }
        
        if (this.cursor.down.isDown) {
            velocity.y += 1;
            direction = "down";
        }

        if (this.cursor.right.isDown) {
            velocity.x += 1;
            direction = "right";
        }
        
        if (this.cursor.left.isDown) {
            velocity.x -= 1;
            direction = "left";
        }

        velocity.normalize();

        this.scene.player.animationController.move(velocity, direction);

    }

    actionsController() {
        if (this.keyJ.isDown) {
            this.scene.player.animationController.attack();
        }
    }

    update() {
        this.movementController();
        this.actionsController();
    
    }
}