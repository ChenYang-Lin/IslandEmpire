import { ITEM_DATA } from "../GameData.js";

export default class InputController {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.keyJ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        window.addEventListener('resize', () => {
            console.log("window resized")

            this.scene.sys.game.scale.resize(window.innerWidth, window.innerHeight);
        });

        this.initMobileBtns();
        this.createJoyStick();
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
        this.joy2 = new JoyStick('joyDiv2', {
            width: 150,
            height: 150,
            internalFillColor: '#9C9898',
            internalLineWidth: 1,
            internalStrokeColor: "#9C9898",
            externalLineWidth: 1,
            externalStrokeColor: "#9C9898",
            autoReturnToCenter: 1,
        })
        this.joy = new JoyStick('joyDiv', {
            width: 150,
            height: 150,
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
                    break;
                case "NE":
                    this.joyUp = true;
                    this.joyRight = true;
                    break;
                case "E":
                    this.joyRight = true;
                    break;
                case "SE":
                    this.joyRight = true;
                    this.joyDown = true;
                    break;
                case "S":
                    this.joyDown = true;
                    break;
                case "SW":
                    this.joyDown = true;
                    this.joyLeft = true;
                    break;
                case "W":
                    this.joyLeft = true;
                    break;
                case "NW":
                    this.joyUp = true;
                    this.joyLeft = true;
                    break;
                default:
            }
        });

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