

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

        window.addEventListener('resize', () => {
            this.joyStick.x = 150;
            this.joyStick.y = this.scene.sys.game.canvas.height - 150;
        });

        this.scene.input.on("wheel",  (pointer, gameObjects, deltaX, deltaY, deltaZ) => {

            if (deltaY > 0) {
                var newZoom = this.scene.camera.zoom -.1;
                if (newZoom > 0.5) {
                    this.scene.camera.zoom = newZoom;     
                }
            }
          
            if (deltaY < 0) {
                var newZoom = this.scene.camera.zoom +.1;
                if (newZoom < 2.5) {
                    this.scene.camera.zoom = newZoom;     
                }
            }
    
            // this.camera.centerOn(pointer.worldX, pointer.worldY);
            // this.camera.pan(pointer.worldX, pointer.worldY, 2000, "Power2");
          
          });

    }

    createJoyStick() {
        this.joyStick = this.scene.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
            x: 150,
            y: this.scene.sys.game.canvas.height - 150,
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
            console.log(window.innerWidth);
            // this.joyStick.x = 400;
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