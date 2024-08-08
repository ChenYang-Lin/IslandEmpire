import { ITEM_DATA } from "../GameData.js";

export default class InputController {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.keyJ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


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

            this.scene.sys.game.scale.resize(window.innerWidth, window.innerHeight);
            this.joyStick.x = 100;
            this.joyStick.y = this.scene.sys.game.canvas.height - 100;
        });

        this.initMobileBtns();


    }

    initMobileBtns() {
        let attackBtn = document.getElementById("attack-btn");
        attackBtn.addEventListener("pointerdown", () => {
            this.playAttackAnim("sword");
        })

        let farmingBtn = document.getElementById("farming-btn");
        farmingBtn.addEventListener("pointerdown", () => {
            this.beginFarmingAction();
        })
        let farmingBtnSwitcher = document.getElementById("farming-btn-switcher");
        farmingBtnSwitcher.addEventListener("pointerdown", () => {
            this.scene.hud.openItemSwitchPanel("farming");
        })

        let consumableBtn = document.getElementById("consumable-btn");
        consumableBtn.addEventListener("pointerdown", () => {
            this.scene.player.useItem(this.scene.hud.inventory.inventoryWindow.selectedConsumableItem);
        })
        let consumableBtnSwitcher = document.getElementById("consumable-btn-switcher");
        consumableBtnSwitcher.addEventListener("pointerdown", () => {
            this.scene.hud.openItemSwitchPanel("consumable");
        })


        let itemSwitchExitBtn = document.getElementById("item-switch-exit-btn");
        itemSwitchExitBtn.addEventListener("pointerdown", () => {
            this.scene.hud.closeItemSwitchPanel();
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


    
    playToolUsageAnimation(tool) {
        switch (tool) {
            case "hoe":
                this.player.animationController.hoe();
            default:
        }
    }

    beginFarmingAction() {
        let selectedItem = this.scene.hud.inventory.inventoryWindow.selectedFarmingItem;

        switch (ITEM_DATA[selectedItem].type) {
            case "tool":
                this.playToolUsageAnimation(selectedItem)
                break;
            case "seed":
                this.player.animationController.sow(selectedItem);
                break;
            default:
        }
    }


  

    update() {
        this.movementController();
        if (this.keyJ.isDown) {
            this.beginAction();
        }
        if (this.keyP.isDown) {
            let shop = this.scene.shop;
            shop.isOpen ? shop.closeWindow() : shop.openWindow();
            shop.inAction = true;
        }
        if (this.keyP.isUp) {
            this.scene.hud.shop.inAction = false;
        }
        
    }


}