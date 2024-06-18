import { ITEM_DATA } from "../GameData.js";

export default class InputController {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.keyJ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyI = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        
        this.inventoryOpen = false;


        this.joyLeft = false;
        this.joyRight = false;
        this.joyUp = false;
        this.joyDown = false;

        this.joyStick;
        this.createJoyStick();

        window.addEventListener('resize', () => {
            console.log("window resized")
            // this.scene.hud.renderHUD();
            this.scene.hud.windowSizeSynchronization();

            this.scene.sys.game.scale.setParentSize(window.innerWidth, window.innerHeight); // make sure game is not overflow in ios safari.
            this.joyStick.x = 100;
            this.joyStick.y = this.scene.sys.game.canvas.height - 100;
        });

        this.initMobileBtns();


    }

    initMobileBtns() {
        let actionBtn = document.getElementById("action-btn")
        actionBtn.addEventListener("pointerdown", () => {
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
                this.player.animationController.hoe();
            default:
        }
    }

    playItemUsageAnimaiton(type, selectedItem) {
        switch (type) {
            case "seed":
                this.player.animationController.sow(selectedItem);
            default:
        }
    }

    beginAction() {
        let selectedIndex = this.scene.hud.inventory.inventoryWindow.selectedIndex;
        let selectedItem = this.scene.hud.inventory.inventoryOrder[selectedIndex];

        switch (ITEM_DATA[selectedItem].category) {
            case "weapon":
                this.playAttackAnim(ITEM_DATA[selectedItem].type);
                break;
            case "tool":
                this.playToolUsageAnimation(ITEM_DATA[selectedItem].type);
                break;
            case "item":
                this.playItemUsageAnimaiton(ITEM_DATA[selectedItem].type, selectedItem);
                break;
            default:
        }
    }

    renderHoveredGrid() {
        
    }

  

    update() {
        this.movementController();
        if (this.keyJ.isDown) {
            this.beginAction();
        }
        if (this.keyP.isDown) {
            let shop = this.scene.hud.shop;
            shop.isOpen ? shop.closeWindow() : shop.openWindow();
            shop.inAction = true;
        }
        if (this.keyI.isDown) {
            let inventoryContainer = document.getElementById("inventory-container");
            
            if (this.inventoryOpen) {
                inventoryContainer.style.display = "none";
                this.inventoryOpen = false;
            } else {
                inventoryContainer.style.display = "block";
                this.inventoryOpen = true;
            } 

        }
        if (this.keyP.isUp) {
            this.scene.hud.shop.inAction = false;
        }
        this.renderHoveredGrid();
        
    }


}