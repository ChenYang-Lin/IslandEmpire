import InventoryWindow from "./InventoryWindow.js";


export default class Inventory {
    constructor(scene) {
        this.scene = scene;

        this.inventorySize = 8;
        this.inventory = {
            "stone": 2,
        }
        this.inventoryOrder = ["stone"];

        this.inventoryWindow = new InventoryWindow(this.scene, this);
    }

    addItem(name, quantity) {
        if (this.inventory[name]) {
            this.inventory[name] += quantity;
        } else {
            this.inventory[name] = quantity;
        }
        if (!this.inventoryOrder.includes(name)) {
            this.inventoryOrder.push(name);
        }
        console.log(this.inventory, this.inventoryOrder);
        this.inventoryWindow.createInventoryWindow();
    }

}