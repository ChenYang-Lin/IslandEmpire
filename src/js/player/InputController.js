import { ITEM_DATA } from "../GameData.js";

export default class InputController {
    constructor(scene, player) {
        // if (InputController._instance) {
        //     return InputController._instance;
        // }

        this.scene = scene;
        this.player = player;
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.keyJ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        window.addEventListener('resize', () => {
            console.log("window resized")

            this.scene.hud.screenResizeUpdate();
            this.scene.sys.game.scale.resize(window.innerWidth, window.innerHeight);
        });

        this.initMobileBtns();
        this.createJoyStick();

        // InputController._instance = this;
    }

    initMobileBtns() {
        let attackBtn = document.getElementById("attack-btn");
        attackBtn.addEventListener("pointerdown", () => {
            this.playAttackAnim("sword");
            this.player.autoControl = false;
        })

        let farmingBtn = document.getElementById("farming-btn");
        farmingBtn.addEventListener("pointerdown", () => {
            this.beginFarmingAction();
            this.player.autoControl = false;
        })
        let farmingBtnSwitcher = document.getElementById("farming-btn-switcher");
        farmingBtnSwitcher.addEventListener("pointerdown", () => {
            this.scene.hud.openItemSwitchPanel("farming");
        })

        let consumableBtn = document.getElementById("consumable-btn");
        consumableBtn.addEventListener("pointerdown", () => {
            this.scene.eventEmitter.emit("pointerdown-consumable-btn");
            this.scene.player.useItem(this.scene.hud.inventory.inventoryWindow.selectedConsumableItem);
            this.player.autoControl = false;
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
        
        this.joy = new JoyStick('joyDiv', {
            width: 120,
            height: 120,
            internalFillColor: '#9C9898',
            internalLineWidth: 1,
            internalStrokeColor: "#9C9898",
            externalLineWidth: 1,
            externalStrokeColor: "#9C9898",
            autoReturnToCenter: 1,
        }, (stickData) => {
            this.joyLeft = false;
            this.joyRight = false;
            this.joyUp = false;
            this.joyDown = false;
            switch (stickData.cardinalDirection) {
                case "N":
                    this.joyUp = true;
                    this.player.autoControl = false;
                    this.scene.eventEmitter.emit("pointerdown-joystick");
                    break;
                case "NE":
                    this.joyUp = true;
                    this.joyRight = true;
                    this.player.autoControl = false;
                    this.scene.eventEmitter.emit("pointerdown-joystick");
                    break;
                case "E":
                    this.joyRight = true;
                    this.player.autoControl = false;
                    this.scene.eventEmitter.emit("pointerdown-joystick");
                    break;
                case "SE":
                    this.joyRight = true;
                    this.joyDown = true;
                    this.player.autoControl = false;
                    this.scene.eventEmitter.emit("pointerdown-joystick");
                    break;
                case "S":
                    this.joyDown = true;
                    this.player.autoControl = false;
                    this.scene.eventEmitter.emit("pointerdown-joystick");
                    break;
                case "SW":
                    this.joyDown = true;
                    this.joyLeft = true;
                    this.player.autoControl = false;
                    this.scene.eventEmitter.emit("pointerdown-joystick");
                    break;
                case "W":
                    this.joyLeft = true;
                    this.player.autoControl = false;
                    this.scene.eventEmitter.emit("pointerdown-joystick");
                    break;
                case "NW":
                    this.joyUp = true;
                    this.joyLeft = true;
                    this.player.autoControl = false;
                    this.scene.eventEmitter.emit("pointerdown-joystick");
                    break;
                default:
            }
        });

    }


    movementController() {
        let velocity = new Phaser.Math.Vector2();
        let direction;
        let moved = false;
        

        if (this.cursor.up.isDown || this.joyUp) {
            velocity.y -= 1;
            direction = "up";
            moved = true;
        }
        
        if (this.cursor.down.isDown || this.joyDown) {
            velocity.y += 1;
            direction = "down";
            moved = true;
        }

        if (this.cursor.right.isDown || this.joyRight) {
            velocity.x += 1;
            direction = "right";
            moved = true;
        }
        
        if (this.cursor.left.isDown || this.joyLeft) {
            velocity.x -= 1;
            direction = "left";
            moved = true;
        }


        velocity.normalize();
        if (this.player.autoControl) {
            return;
        }
        this.player.animationController.move(velocity, direction);

    }

    playAttackAnim(type) {
        this.scene.eventEmitter.emit("pointerdown-attack-btn");
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
            case "fishingrod":
                this.player.animationController.fishing();
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