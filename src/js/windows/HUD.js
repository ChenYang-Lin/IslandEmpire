
import { ITEM_DATA } from "../GameData.js";
import Reward from "./Reward.js";
import Shop from "./Shop.js";
import Wish from "./Wish.js";
import Inventory from "./inventory/Inventory.js";

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
        this.inventoryUI = document.getElementById("inventory-ui");
        this.constructionUI = document.getElementById("construction-ui");
        this.exitUI = document.getElementById("exit-ui");
        this.constructionContainer = document.getElementById("construction-container");
        this.initHUD();

    }

    initHUD() {



        this.inventory = new Inventory(this.scene, this);
        this.reward = new Reward(this.scene, this);
        this.shop = new Shop(this.scene, this);
        this.wish = new Wish(this.scene, this);

        this.scene.player.stats.renderStatsDisplay();

        this.shopUI.addEventListener("pointerdown", () => {
            this.shop.openWindow();
        })

        this.wishUI.addEventListener("pointerdown", () => {
            this.wish.openWindow();
        })

        this.inventoryUI.addEventListener("pointerdown", () => {
            this.inventory.openWindow();
        })
        
        this.constructionUI.addEventListener("pointerdown", () => {
            this.showConstructionSceneUIs();
            this.scene.scene.start("ConstructionScene");
        })
        this.setActionButton();
        this.showMainSceneUIs();

        // Control btn uis
        this.setFarmingBtn();
        this.setConsumableBtn();

        
        // this.showConstructionSceneUIs();
        // this.scene.scene.start("ConstructionScene");

        
        this.windowSizeSynchronization();


    }



    windowSizeSynchronization() {
        // Make sure the size of HUD window is same as game size.
        let islandEmpire = document.getElementById("island-empire").children[0];
        this.closeHUD();

        setTimeout(() => {    
            this.openHUD();
            // hud.style.width = window.getComputedStyle(islandEmpire).width;
            // hud.style.height = window.getComputedStyle(islandEmpire).height;

            this.wish.resize();

        }, 50);
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
            for (const [key, value] of Object.entries(this.inventory.inventory)) {
                if (ITEM_DATA[key].category !== "farming")
                    continue;
                item = key;
                this.inventory.inventoryWindow.selectedFarmingItem = key;
                break;
            }    
        }
        let farmingBtnImg = document.getElementById("farming-btn-img");
        farmingBtnImg.src = this.scene.sys.game.textures.getBase64("item", item);
    }

    setConsumableBtn(consumableItem) {
        let item = consumableItem;
        if (!item) {
            for (const [key, value] of Object.entries(this.inventory.inventory)) {
                if (ITEM_DATA[key].category !== "consumable")
                    continue;
                item = key;
                this.inventory.inventoryWindow.selectedConsumableItem = key;
                break;
            }    
        }
        let consumableBtnImg = document.getElementById("consumable-btn-img");
        consumableBtnImg.src = this.scene.sys.game.textures.getBase64("item", item);
    }

    createCollectablesContainer(collectables) {
        // console.log("calling")
        let collectablesContainer = document.getElementById("collectables-container");
        
        collectablesContainer.innerHTML = ""; // refresh container;

        // Create collectables button
        collectables.forEach((collectable, i) => {
            let collectableBtn = document.createElement("button");
            collectableBtn.classList.add("collectable-btn");
            // collectableBtn.setAttribute("index", `${i}`);
            collectableBtn.addEventListener("pointerdown", () => {
                collectableBtn.remove();
                this.inventory.addItem(collectable.collectable, 1);
                this.scene.player.sensors.touchingNearbyCollectables[i].onDeath();
                this.scene.collisionController.addCollectableCollected(collectable);
            })

            // Create collectable img
            let collectableImg = document.createElement('img');
            collectableImg.classList.add("collectable-img");
            collectableImg.src = this.scene.sys.game.textures.getBase64("item", collectable.collectable);

            // Create collectable text
            let collectableText = document.createElement("div");
            collectableText.classList.add("collectable-name");
            collectableText.innerHTML = `${collectable.collectable}`;
    
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

        for (const [key, value] of Object.entries(this.inventory.inventory)) {
            if (ITEM_DATA[key].category !== category)
                continue;

            let item = document.createElement("div");
            item.classList.add("panel-item");
            item.setAttribute("key", `${key}`);
            item.addEventListener("pointerdown", () => {
                if (category === "farming") {
                    this.setFarmingBtn(key);
                    this.inventory.inventoryWindow.selectedFarmingItem = key;
                } else if (category === "consumable") {
                    this.setConsumableBtn(key);
                    this.inventory.inventoryWindow.selectedConsumableItem = key;
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
        this.hideMainSceneUIs();
        this.exitUI.style.display = "block";
        this.constructionContainer.style.display = "block";
    }

    hideConstructionSceneUIs() {
        this.exitUI.style.display = "none";
        this.constructionContainer.style.display = "none";
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
    }   
}