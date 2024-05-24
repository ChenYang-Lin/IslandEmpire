import { ENTITY_DATA } from "../GameData.js";

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
            console.log("window resized")
            this.scene.hud.initHUD();

            this.scene.sys.game.scale.setParentSize(window.innerWidth, window.innerHeight); // make sure game is not overflow in ios safari.
            this.joyStick.x = 100;
            this.joyStick.y = this.scene.sys.game.canvas.height - 100;
        });

        this.initMobileBtns();


    }

    initMobileBtns() {
        let actionBtn = document.getElementById("action-btn")
        actionBtn.addEventListener("touchstart", () => {
            console.log("action")
            this.beginAction();
        })
    }

    createJoyStick() {
        this.joyStick = this.scene.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
            x: 100,
            y: this.scene.sys.game.canvas.height - 100,
            radius: 70,
            base: this.scene.add.circle(0, 0, 70, 0x888888),
            thumb: this.scene.add.circle(0, 0, 20, 0xcccccc),
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

    playAttackAnim(type) {
        switch (type) {
            case "sword":
                this.player.animationController.swordAttack(); 
                break;
            default:
        }
        
    }

    playToolUsageAnimation(type) {
        switch (type) {
            case "hoe":
                this.player.animationController.useHoe();
            default:
        }
    }

    beginAction() {
        let selectedIndex = this.scene.inventory.inventoryWindow.selectedIndex;
        let selectedItem = this.scene.inventory.inventoryOrder[selectedIndex];
        
        if (ENTITY_DATA[selectedItem].category === "weapon") {
            this.playAttackAnim(ENTITY_DATA[selectedItem].type);
        }
        if (ENTITY_DATA[selectedItem].category === "tool") {
            this.playToolUsageAnimation(ENTITY_DATA[selectedItem].type);
        }
    }

    update() {
        this.movementController();
        if (this.keyJ.isDown) {
            this.beginAction();
        }
    
    }


}