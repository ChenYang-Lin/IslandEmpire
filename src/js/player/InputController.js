

export default class InputController {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.keyJ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);


        this.joyLeft = false;
        this.joyRight = false;
        this.joyUp = false;
        this.joyDown = false;

        this.joyStick;
        this.createJoyStick();
    }

    createJoyStick() {
        this.joyStick = this.scene.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
            x: 400,
            y: 700,
            radius: 100,
            base: this.scene.add.circle(0, 0, 100, 0x888888),
            thumb: this.scene.add.circle(0, 0, 50, 0xcccccc),
            // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
            // forceMin: 16,
            // enable: true
        });
        
        this.joyStick.on('update', () => {
            let cursorKeys = this.joyStick.createCursorKeys();
            this.joyLeft = cursorKeys.left.isDown;
            this.joyRight = cursorKeys.right.isDown;
            this.joyUp = cursorKeys.up.isDown;
            this.joyDown = cursorKeys.down.isDown;
        }, this);

    }


    movementController() {
        let velocity = new Phaser.Math.Vector2();
        let direction;
        

        if (this.cursor.up.isDown || this.joyUp) {
            velocity.y -= 1;
            direction = "up";
        }
        
        if (this.cursor.down.isDown || this.joyDown) {
            velocity.y += 1;
            direction = "down";
        }

        if (this.cursor.right.isDown || this.joyRight) {
            velocity.x += 1;
            direction = "right";
        }
        
        if (this.cursor.left.isDown || this.joyLeft) {
            velocity.x -= 1;
            direction = "left";
        }

        velocity.normalize();

        this.player.animationController.move(velocity, direction);

    }

    actionsController() {
        if (this.keyJ.isDown) {
            this.player.animationController.attack();
        }
    }

    update() {
        this.movementController();
        this.actionsController();
    
    }
}