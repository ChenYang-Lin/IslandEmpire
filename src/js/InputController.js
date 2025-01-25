import { ENTITY_DATA } from "./GameData.js";

export default class InputController {
    constructor(scene, player) {
        // if (InputController._instance) {
        //     return InputController._instance;
        // }

        this.scene = scene;
        this.player = player;
        this.test = 1;

        this.listeners = []
        
        this.init();

        this.selectedEntityREXOutline = this.scene.plugins.get('rexoutlinepipelineplugin');
        this.selectedEntity;

        // InputController._instance = this;
    }

    init() {
        this.attackBtn = document.getElementById("attack-btn");
        this.farmingBtn = document.getElementById("farming-btn");
        this.farmingSwitcherBtn = document.getElementById("farming-btn-switcher");
        this.consumableBtn = document.getElementById("consumable-btn");
        this.consumableSwitcherBtn = document.getElementById("consumable-btn-switcher");
        this.itemSwitchExitBtn = document.getElementById("item-switch-exit-btn");

        // Attack Btn Listener
        this.addNewEventListener(this.listeners, this.attackBtn, "pointerdown", () => {
            this.playAttackAnim("sword");
            this.player.autoControl = false;
        });
        // Farming Btn Listener
        this.addNewEventListener(this.listeners, this.farmingBtn, "pointerdown", () => {
            this.beginFarmingAction();
            this.player.autoControl = false;
        });
        // Farming Switcher Btn Listener
        this.addNewEventListener(this.listeners, this.farmingSwitcherBtn, "pointerdown", () => {
            this.scene.hud.openItemSwitchPanel("farming");
        });
        // Consumable Btn Listener
        this.addNewEventListener(this.listeners, this.consumableBtn, "pointerdown", () => {
            this.scene.eventEmitter.emit("pointerdown-consumable-btn");
            let itemName = this.scene.inventory.selectedConsumableItem;
            if (!this.scene.inventory.removeItem(itemName, 1)) {
                console.log(itemName + " out")
                return;
            }
            this.scene.player.useItem(itemName);
            this.player.autoControl = false;
        });
        // Consumable Switcher Btn Listener
        this.addNewEventListener(this.listeners, this.consumableSwitcherBtn, "pointerdown", () => {
            this.scene.hud.openItemSwitchPanel("consumable");
        });
        // Item Switch Exit Btn Listener
        this.addNewEventListener(this.listeners, this.itemSwitchExitBtn, "pointerdown", () => {
            this.scene.hud.closeItemSwitchPanel();
        });

        // Clear selected entity highlight
        this.addNewEventListener(this.listeners, window, "pointerdown", () => {
            if (this.selectedEntity) {
                
                if (this.selectedEntity.body) { // make sure entity not yet destroyed
                    this.selectedEntity.handleDeselect();
                }
            }
        })

        // Window Resize Listener
        this.addNewEventListener(this.listeners, window, "resize", () => {
            this.scene.hud.screenResizeUpdate();
            this.scene.sys.game.scale.resize(window.innerWidth, window.innerHeight);
        });


        this.cursor = this.scene.input.keyboard.createCursorKeys();
        
        this.key1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

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
        // if (this.player.autoControl) {
        //     return;
        // }
        // "blocked/glitch helper slide code" 
        if (this.blockedDirections) {
            if (this.blockedCounter > 0) {
                let velocity = new Phaser.Math.Vector2();

                if (this.blockedDirections.includes("left") && this.blockedDirections.includes("up")) {
                    
                    if (this.blockedCounter <= 2) {
                        velocity.x = 0;
                        velocity.y = -2;
                    } else {
                        velocity.x = -2;
                        velocity.y = 0;
                    }
                } else if (this.blockedDirections.includes("up") && this.blockedDirections.includes("right")) {
                    if (this.blockedCounter <= 2) {
                        velocity.x = 2;
                        velocity.y = 0
                    } else {
                        velocity.x = -0;
                        velocity.y = -2;
                    }
                } else if (this.blockedDirections.includes("right") && this.blockedDirections.includes("down")) {
                    if (this.blockedCounter <= 2) {
                        velocity.x = -0;
                        velocity.y = 2
                    } else {
                        velocity.x = 2;
                        velocity.y = -0;
                    }
                } else if (this.blockedDirections.includes("down") && this.blockedDirections.includes("left")) {
                    if (this.blockedCounter <= 2) {
                        velocity.x = -2;
                        velocity.y = -0;
                    } else {
                        velocity.x = 0;
                        velocity.y = 2;
                    }
                } 
    
                this.blockedCounter--;    
                this.player.characterOnControl.animationController.move(velocity, this.direction);
                return;
            } else {
                this.blockedDirections = null;
            }
            return;
        } 


        let velocity = new Phaser.Math.Vector2();
        let directions = [];
        this.direction;
        this.blockedCounter = 0;
        

        if (this.cursor.up.isDown || this.keyW.isDown || this.joyUp) {
            velocity.y -= 1;
            this.direction = "up";
            directions.push("up");
        }
        
        if (this.cursor.down.isDown || this.keyS.isDown || this.joyDown) {
            velocity.y += 1;
            this.direction = "down";
            directions.push("down");
        }

        if (this.cursor.right.isDown || this.keyD.isDown || this.joyRight) {
            velocity.x += 1;
            this.direction = "right";
            directions.push("right");
        }
        
        if (this.cursor.left.isDown || this.keyA.isDown || this.joyLeft) {
            velocity.x -= 1;
            this.direction = "left";
            directions.push("left");
        }


        // give some slide to velocity when player moving the character but blocked by some obstacles
        if (this.scene.player.characterOnControl.body.velocity.x === 0 && this.scene.player.characterOnControl.body.velocity.y === 0 && this.moveCommand)  { // Moving key down but character not move

            if (directions.length === 2 && JSON.stringify(this.prevDirections) == JSON.stringify(directions)) { // player holding same input 
                    this.blockedDirections = directions;
                    this.blockedCounter = 4; // "blocked helper slide code" run two time and stop
                
            }

        } 
        
        this.prevDirections = directions;

        this.moveCommand = true;
        if (velocity.x === 0 && velocity.y === 0) {
            this.moveCommand = false;
        } 

        velocity.normalize();
        this.player.characterOnControl.animationController.move(velocity, this.direction);

    }

    playAttackAnim(type) {
        this.scene.eventEmitter.emit("pointerdown-attack-btn");
        switch (type) {
            case "sword":
                this.player.characterOnControl.animationController.swordAttack(); 
                break;
            default:
        }
        
    }


    
    playToolUsageAnimation(tool) {
        console.log(this)
        switch (tool) {
            case "hoe":
                this.player.characterOnControl.animationController.hoe();
            case "fishingrod":
                this.player.characterOnControl.animationController.fishing();
            default:
        }
    }

    beginFarmingAction() {
        let selectedItem = this.scene.inventory.selectedFarmingItem;

        switch (ENTITY_DATA[selectedItem].type) {
            case "tool":
                this.playToolUsageAnimation(selectedItem)
                break;
            case "seed":
                if (this.player.characterOnControl.animationController.sow(selectedItem)) {
                    this.scene.inventory.removeItem(selectedItem, 1);
                }
                
                break;
            default:
        }
    }


 

    addNewEventListener(listeners, element, eventType, listener) {
        element.addEventListener(eventType, listener);
        listeners.push({ element, eventType, listener });
    }

    removeAllEventListeners(listeners) {
        for (const { element, eventType, listener } of listeners) {
            element.removeEventListener(eventType, listener);
        }
    }



    destroySelf() {
        this.removeAllEventListeners(this.listeners);
        document.getElementById("joyDiv").innerHTML = ``
        this.joy = null;
        this.scene = null;
        this.player = null;
    }

    update() {
        
        this.movementController();
        if (this.keyJ.isDown) {
            this.playAttackAnim("sword");
            this.player.autoControl = false;
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


        if (this.key1.isDown) {
            this.scene.player.characterOnControl = this.scene.player.survivor;
            this.scene.camera.startFollow(this.player.characterOnControl);
        }

        if (this.key2.isDown) {
            this.scene.player.characterOnControl = this.scene.characterManager.characterList["soldier"];
            this.scene.camera.startFollow(this.player.characterOnControl);
        }
        
    }


}