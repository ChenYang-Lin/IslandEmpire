import { ITEM_DATA } from "./GameData.js";

export default class InputController {
    constructor(scene, player) {
        // if (InputController._instance) {
        //     return InputController._instance;
        // }

        this.scene = scene;
        this.player = player;



        this.init();

        
        // InputController._instance = this;
    }

    init() {
        this.attackBtn = document.getElementById("attack-btn");
        this.farmingBtn = document.getElementById("farming-btn");
        this.farmingSwitcherBtn = document.getElementById("farming-btn-switcher");
        this.consumableBtn = document.getElementById("consumable-btn");
        this.consumableSwitcherBtn = document.getElementById("consumable-btn-switcher");
        this.itemSwitchExitBtn = document.getElementById("item-switch-exit-btn");

        this.attackBtn.addEventListener("pointerdown", this.handleAttackBtnClickBind)
        this.farmingBtn.addEventListener("pointerdown", this.handleFarmingBtnClickBind);
        this.farmingSwitcherBtn.addEventListener("pointerdown", this.handleFarmingSwitcherBtnClickBind);
        this.consumableBtn.addEventListener("pointerdown", this.handleConsumableBtnClickBind);
        this.consumableSwitcherBtn.addEventListener("pointerdown", this.handleConsumableSwitcherBtnClickBind);
        this.itemSwitchExitBtn.addEventListener("pointerdown", this.handleItemSwitchExitBtnClickBind);

        window.addEventListener('resize', this.handleWindowResizeBind);


        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.keyJ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyX = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        
        this.createJoyStick();
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
        console.log(this)
        switch (tool) {
            case "hoe":
                this.player.animationController.hoe();
            case "fishingrod":
                this.player.animationController.fishing();
            default:
        }
    }

    beginFarmingAction() {
        let selectedItem = this.scene.inventory.selectedFarmingItem;

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

    handleAttackBtnClickBind = this.handleAttackBtnClick.bind(this);
    handleFarmingBtnClickBind = this.handleFarmingBtnClick.bind(this);
    handleFarmingSwitcherBtnClickBind = this.handleFarmingSwitcherBtnClick.bind(this);
    handleConsumableBtnClickBind = this.handleConsumableBtnClick.bind(this);
    handleConsumableSwitcherBtnClickBind = this.handleConsumableSwitcherBtnClick.bind(this);
    handleItemSwitchExitBtnClickBind = this.handleItemSwitchExitBtnClick.bind(this);
    handleWindowResizeBind = this.handleWindowResize.bind(this);


    handleAttackBtnClick() {
        this.playAttackAnim("sword");
        this.player.autoControl = false;
    }

    handleFarmingBtnClick() {
        this.beginFarmingAction();
        this.player.autoControl = false;
    }

    handleFarmingSwitcherBtnClick() {
        this.scene.hud.openItemSwitchPanel("farming");
    }

    handleConsumableBtnClick() {
        this.scene.eventEmitter.emit("pointerdown-consumable-btn");
        let itemName = this.scene.inventory.selectedConsumableItem;
        if (!this.scene.inventory.removeItem(itemName, 1)) {
            console.log(itemName + " out")
            return;
        }
        this.scene.player.useItem(itemName);
        this.player.autoControl = false;
    }

    handleConsumableSwitcherBtnClick() {
        this.scene.hud.openItemSwitchPanel("consumable");
    }

    handleItemSwitchExitBtnClick() {
        this.scene.hud.closeItemSwitchPanel();
    }

    handleWindowResize() {
        console.log("window resized")
        this.scene.hud.screenResizeUpdate();
        this.scene.sys.game.scale.resize(window.innerWidth, window.innerHeight);
    }



    destroySelf() {
        this.attackBtn.removeEventListener("pointerdown", this.handleAttackBtnClickBind);
        this.farmingBtn.removeEventListener("pointerdown", this.handleFarmingBtnClickBind);
        this.farmingSwitcherBtn.removeEventListener("pointerdown", this.handleFarmingSwitcherBtnClickBind);
        this.consumableBtn.removeEventListener("pointerdown", this.handleConsumableBtnClickBind);
        this.consumableSwitcherBtn.removeEventListener("pointerdown", this.handleConsumableSwitcherBtnClickBind);
        this.itemSwitchExitBtn.removeEventListener("pointerdown", this.handleItemSwitchExitBtnClickBind);

        window.removeEventListener("resize", this.handleWindowResizeBind)
    }

    update() {
        if (this.destroyed) {
            return;
        }
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


        if (this.keyX.isDown && this.testX === false) {
            this.testX = true;
            console.log("test");
            this.scene.player.destroySelf();
        }
        if (this.keyX.isUp && this.testX === true) {
            this.testX = false;
        }
        
    }


}