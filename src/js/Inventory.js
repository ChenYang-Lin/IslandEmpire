import InventoryWindow from "./InventoryWindow.js";


export default class Inventory {
    constructor(scene) {
        this.scene = scene;

        this.coin = 1000;
        this.wishFragment = 1000;
        this.wishEvent = 10;
        this.wishStandard = 15;


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


        this.inventoryWindow = new InventoryWindow(this.scene, this);

        this.inAction = false;
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

    saveInventoryToLocalStorage() {
        localStorage.setItem("inventory", JSON.stringify(this.inventory));
    }

    loadInventoryToLocalStorage() {
        return JSON.parse(localStorage.getItem("inventory"));
    }

    swapItems(a, b) {
        let temp = this.inventoryOrder[a]
        this.inventoryOrder[a] = this.inventoryOrder[b];
        this.inventoryOrder[b] = temp;
        this.inventoryWindow.createInventoryWindow();
    }

    openWindow() {
        this.inventoryWindow.renderInventoryPanel();
        document.getElementById("inventory-container").style.display = "block";
    }

    closeWindow() {
        document.getElementById("inventory-container").style.display = "none";
    }

}