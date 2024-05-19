


export default class InventoryWindow {
    constructor(scene) {
        this.scene = scene;
        this.inventory = this.scene.inventory;
        this.inventoryOrder = this.scene.inventoryOrder;
    
    }

    initWindow() {
        let inventorySlotsContainer = document.getElementById("inventory-slots-container");
        inventorySlotsContainer.innerHTML = '';
        for (let i = 0; i < this.inventoryOrder.length; i++) {
            if (!this.inventoryOrder[i]) 
                continue;
            let item = this.inventoryOrder[i];
            let inventorySlot = this.createInventorySlot(item, this.inventory[item])
            inventorySlotsContainer.appendChild(inventorySlot);
        }
    }

    createInventorySlot(name, quantity) {
        console.log("createing")
        let inventorySlot = document.createElement("div");
        inventorySlot.classList.add("inventory-slot");

        // Create Item Img
        let itemImg = document.createElement('img');
        itemImg.classList.add("item-icon")
        // itemImg.setAttribute('draggable', true);
        // itemImg.addEventListener('dragstart', this.dragStart.bind(this));
        // itemImg.addEventListener('dragend', this.dragEnd.bind(this));
        
        itemImg.src = this.scene.scene.sys.game.textures.getBase64("item", name);

        // Create Item Quantity Text
        let itemQuantityText = document.createElement("div");
        itemQuantityText.classList.add("item-quantity-text");
        itemQuantityText.innerHTML = `x${quantity}`;

        inventorySlot.appendChild(itemImg);
        inventorySlot.appendChild(itemQuantityText);

        return inventorySlot;

    }


}