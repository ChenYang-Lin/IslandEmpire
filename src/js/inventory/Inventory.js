import InventoryWindow from "./InventoryWindow.js";


export default class Inventory {
    constructor(scene) {
        this.scene = scene;

        this.inventorySize = 8;
        this.inventory = {
            "sword": 1,
            "hoe": 1,
            "stone": 2,
            "potato_seed": 3,
        }
        this.inventoryOrder = [
            "sword", 
            "potato_seed",
            "hoe", 
            "stone"];

        this.inventoryWindow = new InventoryWindow(this.scene, this);
    }

    addItem(name, quantity) {
        if (this.inventoryOrder.includes(name)) {
            this.inventory[name] += quantity;
            this.inventoryWindow.createInventoryWindow();
            return;
        }
        
        for (let i = 0; i < this.inventorySize; i++) {
            if (this.inventoryOrder[i]) { // There is already an item in the current slot
                if (i !== this.inventorySize - 1) 
                    continue;
                else {
                    console.log("inventory is full")
                }
            } else { // Current slot is empty
                this.inventoryOrder[i] = name;
                this.inventory[name] = quantity;
                this.inventoryWindow.createInventoryWindow();
                console.log(this.inventory, this.inventoryOrder);
                return;
            }
        }
    }

    swapItems(a, b) {
        let temp = this.inventoryOrder[a]
        this.inventoryOrder[a] = this.inventoryOrder[b];
        this.inventoryOrder[b] = temp;
        this.inventoryWindow.createInventoryWindow();
    }

}