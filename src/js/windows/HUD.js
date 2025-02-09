
import { ENTITY_DATA } from "../GameData.js";
import QuestManager from "./QuestManager.js";
import Reward from "./Reward.js";
import Shop from "../Shop.js";
import Wish from "./Wish.js";
import Crafting from "../Crafting.js";

export default class HUD {
    constructor(scene) {
        this.scene = scene;

        this.hud = document.getElementById("hud");
        this.inventorySlotsContainer = document.getElementById("inventory-slots-container");
        this.collectableContainer = document.getElementById("collectables-container");
        this.actionBtnsContainer = document.getElementById("action-buttons-container");

        // UIs
        this.shopUI = document.getElementById("shop-ui");
        this.wishUI = document.getElementById("wish-ui");
        this.questUI = document.getElementById("quest-ui");
        this.inventoryUI = document.getElementById("inventory-ui");
        this.constructionUI = document.getElementById("construction-ui");
        this.exitUI = document.getElementById("exit-ui");
        this.constructionContainer = document.getElementById("construction-container");
        this.initHUD();

    }

    initHUD() {



        this.reward = new Reward(this.scene, this);
        this.shop = new Shop(this.scene, this);
        this.wish = new Wish(this.scene, this);
        this.questManager = new QuestManager(this.scene, this);
        this.crafting = new Crafting(this.scene);

        console.log(this.scene.player.characterOnControl)

        this.shopUI.addEventListener("pointerdown", () => {
            this.shop.openWindow();
        })

        this.wishUI.addEventListener("pointerdown", () => {
            this.wish.openWindow();
        })

        this.questUI.addEventListener("pointerdown", () => {
            this.crafting.openWindow();
        })

        this.wishUI.addEventListener("pointerdown", () => {
            this.wish.openWindow();
        })

        this.inventoryUI.addEventListener("pointerdown", () => {
            this.scene.inventory.openWindow();
        })
        
        this.constructionUI.addEventListener("pointerdown", () => {
            this.showConstructionSceneUIs();
            this.scene.endScene();
            this.scene.scene.start("ConstructionScene");
        })
        this.setActionButton();
        this.showMainSceneUIs();

        // Control btn uis
        this.setFarmingBtn();
        this.setConsumableBtn();

        
        // this.showConstructionSceneUIs();
        // this.scene.scene.start("ConstructionScene");

        
        this.screenResizeUpdate();
    }


    screenResizeUpdate() {
        this.closeHUD();
        setTimeout(() => {    
            // zoom depends on screen resolution
            let islandEmpire = document.getElementById("island-empire").children[0];
            let width = window.getComputedStyle(islandEmpire).width;
            width = parseInt(width, 10)
            // console.log("screen width: ", width);
            if (width > 1200) {
                // console.log("zoom: 2");
                this.scene.camera.setZoom(2);
            } else {
                // console.log("zoom: 1");
                this.scene.camera.setZoom(1);
            }


            this.openHUD();
            this.wish.resize();
            this.questManager.createBoxShadow();
        }, 100);
    }


    renderCurrentFPS() {
        let fps = Math.floor(this.scene.sys.game.loop.actualFps);
        
        let fpsDiv = document.getElementById("fps");
        fpsDiv.innerHTML = `FPS: ${fps}`;
    }

    setActionButton() {
        // let icon = document.getElementById("action-btn-icon");
        // let selectedIndex = this.inventory.inventoryWindow.selectedIndex;
        // let name = this.inventory.inventoryOrder[selectedIndex];
        // if (name) 
        //     icon.src = this.scene.sys.game.textures.getBase64("item", name);
        // else
        //     icon.src = ""
    }

    setFarmingBtn(farmingItem) {
        let item = farmingItem;
        if (!item) {
            for (const [key, value] of Object.entries(this.scene.inventory.inventory)) {
                if (ENTITY_DATA[key].category !== "farming")
                    continue;
                item = key;
                this.scene.inventory.selectedFarmingItem = key;
                break;
            }    
        }
        let farmingBtnImg = document.getElementById("farming-btn-img");
        farmingBtnImg.src = this.scene.sys.game.textures.getBase64("item", item);
    }

    setConsumableBtn(consumableItem) {
        let item = consumableItem;
        if (!item) {
            for (const [key, value] of Object.entries(this.scene.inventory.inventory)) {
                if (ENTITY_DATA[key]?.category !== "consumable")
                    continue;
                item = key;
                this.scene.inventory.selectedConsumableItem = key;
                break;
            }    
        }
        let consumableBtnImg = document.getElementById("consumable-btn-img");
        if (item) {
            consumableBtnImg.src = this.scene.sys.game.textures.getBase64("item", item);
        } 
        
    }

    createCollectablesContainer(collectables) {
        // console.log("calling")
        let collectablesContainer = document.getElementById("collectables-container");
        
        collectablesContainer.innerHTML = ""; // refresh container;

        // Create collectables button
        collectables.forEach((collectable, i) => {
            let interactable = collectable.interactionData;
            let collectableBtn = document.createElement("button");
            collectableBtn.classList.add("collectable-btn");
            // collectableBtn.setAttribute("index", `${i}`);
            collectableBtn.addEventListener("pointerdown", () => {
                // console.log(interactable)
                switch (interactable.type) {
                    case "collectable":
                        this.scene.eventEmitter.emit(`pickup-${interactable.name}`);
                        collectableBtn.remove();
                        this.scene.inventory.addItem(interactable.name, interactable.quantity);
                        // console.log(this.scene.player.sensors.touchingNearbyObjects[i].parent)
                        this.scene.player.touchingNearbyObjects[i].parent.onDeath("player");
                        this.scene.collisionController.addCollectableCollected(collectable);
                        break;
                    case "entrance":
                        console.log("moving to new map");
                        this.scene.endScene();
                        console.log("new destination", interactable.destination)
                        this.scene.scene.start("MainScene", { map: interactable.destination });
                        break;
                    default:
                }
            })

            // Create collectable img
            let collectableImg = document.createElement('img');
            collectableImg.classList.add("collectable-img");
            collectableImg.src = this.scene.sys.game.textures.getBase64("item", interactable.name);

            // Create collectable text
            let collectableText = document.createElement("div");
            collectableText.classList.add("collectable-name");
            collectableText.innerHTML = `${interactable.name}`;
    
            collectableBtn.appendChild(collectableImg);
            collectableBtn.appendChild(collectableText);
            collectablesContainer.appendChild(collectableBtn);
                    
        })
    }

    openItemSwitchPanel(category) {
        let itemSwitchPanel = document.getElementById("item-switch-panel");
        itemSwitchPanel.style.display = "block";

        let itemSwitchList = document.getElementById("item-switch-list");

        itemSwitchList.innerHTML = "";

        for (const [key, value] of Object.entries(this.scene.inventory.inventory)) {
            // if (!ENTITY_DATA[key]?.category)
            //     continue;
            if (ENTITY_DATA[key]?.category !== category)
                continue;

            let item = document.createElement("div");
            item.classList.add("panel-item");
            item.setAttribute("key", `${key}`);
            item.addEventListener("pointerdown", () => {
                if (category === "farming") {
                    this.setFarmingBtn(key);
                    this.scene.inventory.selectedFarmingItem = key;
                } else if (category === "consumable") {
                    this.setConsumableBtn(key);
                    this.scene.inventory.selectedConsumableItem = key;
                }
                this.closeItemSwitchPanel();
            })

            let itemImgWrapper = document.createElement("div");
            itemImgWrapper.classList.add("panel-item-img-wrapper");

            let itemImg = document.createElement("img");
            itemImg.classList.add("panel-item-img")
            itemImg.src = this.scene.sys.game.textures.getBase64("item", key);

            let itemQuantity = document.createElement("div");
            itemQuantity.classList.add("panel-item-quantity");
            itemQuantity.innerHTML = value;

            itemImgWrapper.appendChild(itemImg);
            item.appendChild(itemImgWrapper)
            item.appendChild(itemQuantity)
            itemSwitchList.appendChild(item);
        }
    }

    closeItemSwitchPanel() {
        let itemSwitchPanel = document.getElementById("item-switch-panel");
        itemSwitchPanel.style.display = "none";
    }

    

    hideMainSceneUIs() {
        // this.inventorySlotsContainer.style.display = "none";
        this.collectableContainer.style.display = "none";
        this.actionBtnsContainer.style.display = "none";
        this.shopUI.style.display = "none";
        this.constructionUI.style.display = "none";
    }

    showMainSceneUIs() {
        this.hideConstructionSceneUIs();
        // this.inventorySlotsContainer.style.display = "flex";
        this.collectableContainer.style.display = "block";
        this.actionBtnsContainer.style.display = "flex";
        this.shopUI.style.display = "block";
        this.constructionUI.style.display = "block";
    }

    showConstructionSceneUIs() {
        let joystick = document.getElementById("joystick");
        if (joystick) {
            joystick.remove();
        }
        this.hideMainSceneUIs();
        this.exitUI.style.display = "block";
        this.constructionContainer.style.display = "block";
    }

    hideConstructionSceneUIs() {
        this.exitUI.style.display = "none";
        this.constructionContainer.style.display = "none";
    }

    showEntityGeneralInfoHUD() {
        let entityGeneralInfoContainer = document.getElementById("entity-general-info-container");
        entityGeneralInfoContainer.style.display = "block";
    }

    hideEntityGeneralInfoHUD() {
        let entityGeneralInfoContainer = document.getElementById("entity-general-info-container");
        entityGeneralInfoContainer.style.display = "none";
    }

    closeHUD () {
        this.hud.style.display = "none";
    }

    openHUD() {
        this.hud.style.display = "block";
    }

    update() {
        // this.renderCurrentFPS();
        this.setActionButton();
        this.scene.inputController.selectedEntity?.showGeneralInfoHUD();
    }   
}