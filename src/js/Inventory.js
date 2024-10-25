import { ITEM_DATA } from "./GameData.js";

export default class Inventory {
    constructor(scene) {
        this.scene = scene;

        this.coin = 1000;
        this.wishFragment = 1000;
        this.wishEvent = 10;
        this.wishStandard = 15;

        // inventory window
        this.selectedFarmingItem;
        this.selectedConsumableItem;

        this.selectedCategoryIndex = 0;
        this.selectedCategory = "weapon"
    
        // this.renderInventoryPanel();

        this.init();
    }

    init() {
        if (localStorage.getItem("inventory")) {
            this.inventory = this.loadInventoryToLocalStorage();
        } else {
            this.inventory = {
                "sword": 1,
                "fishingrod": 1,
                "hoe": 1,
                "stone": 2,
                "potato_seed": 3,
                "drumstick_raw": 1,
                "egg": 1,
                "apple": 7,
                "bagel": 1,
                "banana": 3,
                "bread": 1,
                "burger": 1,
                "burrito": 1,
                "croissant": 1,
                "doughnut": 1,
                "eggplant_seed": 1,
            }
            this.saveInventoryToLocalStorage();
        }
        
        // Inventory Window
        let inventoryContainer = document.getElementById("inventory-container");
        let exitBtn = document.getElementById("inventory-exit-btn");

        exitBtn.addEventListener("pointerdown", () => {
            inventoryContainer.style.display = "none";
        })

        let categoryElements = document.querySelectorAll(".panel-category-element");
        for (let i = 0; i < categoryElements.length; i++) {
            categoryElements[i].addEventListener("pointerdown", () => {
                this.selectedCategoryIndex = i;
                this.selectedCategory = categoryElements[i].getAttribute("data-category");
                this.renderInventoryPanel();
            })
        }
    }

    addItem(name, quantity) {
        if (this.inventory[name]) {
            this.inventory[name] += quantity
        } else {
            this.inventory[name] = quantity;
        }
        this.saveInventoryToLocalStorage();
    }

    removeItem(name, quantity) {
        if (this.inventory[name] >= quantity) {
            this.inventory[name] -= quantity;
            if (this.inventory[name] === 0) {
                delete this.inventory[name];
                this.scene.hud.setConsumableBtn();
            }
            this.saveInventoryToLocalStorage();
        } else {
            return false;
        }
        return true;
    }

    renderInventoryPanel() {
        this.renderInventorySelectedCategory();
        this.renderInventoryList();
    }

    renderInventorySelectedCategory() {
        let inventoryCategoryContainer = document.getElementById("inventory-category-container");
        let categoryElements = inventoryCategoryContainer.children
        
        for (let i = 0; i < categoryElements.length; i++) {
            categoryElements[i].classList.remove("panel-category-element-selected");
        }

        categoryElements[this.selectedCategoryIndex].classList.add("panel-category-element-selected");
    }

    renderInventoryList() {
        let inventoryList = document.getElementById("inventory-list");

        // Create Inventory Items
        inventoryList.innerHTML = "";

        let firstItem = true;
        
        for (const [key, value] of Object.entries(this.inventory)) {
            if (ITEM_DATA[key].category !== this.selectedCategory)
                continue;

            if (firstItem) {
                firstItem = false;
                this.renderItemDetailBox(key);
            }
            
            let item = document.createElement("div");
            item.classList.add("panel-item");
            item.setAttribute("key", `${key}`);
            item.addEventListener("pointerdown", () => {
                this.renderItemDetailBox(key)
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
            inventoryList.appendChild(item);
        }
        
    }

    renderItemDetailBox(selectedItem) {
        const inventoryItemDetail = document.getElementById("inventory-detail");
        

        let image = this.scene.sys.game.textures.getBase64('item', selectedItem)
        let owned = this.inventory[selectedItem];
        let type = ITEM_DATA[selectedItem].type;
        inventoryItemDetail.innerHTML = 
        `
        <div class="panel-detail-header">${selectedItem}</div>
        <div class="panel-detail-body">
            <div class="panel-detail-body-type">${type}</div>
            <img src="${image}" alt="" class="panel-detail-body-img">
        </div>
        <div class="panel-detail-descriptions">Some descriptions</div>
        <div class="panel-detail-owned">Owned: ${owned}</div>
        `

    }


    saveInventoryToLocalStorage() {
        localStorage.setItem("inventory", JSON.stringify(this.inventory));
    }

    loadInventoryToLocalStorage() {
        return JSON.parse(localStorage.getItem("inventory"));
    }


    openWindow() {
        this.renderInventoryPanel();
        document.getElementById("inventory-container").style.display = "block";
    }

    closeWindow() {
        document.getElementById("inventory-container").style.display = "none";
    }

}