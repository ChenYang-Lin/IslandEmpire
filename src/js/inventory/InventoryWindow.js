


export default class InventoryWindow {
    constructor(scene, inventory) {
        this.scene = scene;
        this.inventory = inventory;

        this.dragIndex = -1;
        this.dropIndex = -1;
    
        this.createInventoryWindow();
    }

    createInventoryWindow() {
        let inventorySlotsContainer = document.getElementById("inventory-slots-container");
        inventorySlotsContainer.innerHTML = '';
        for (let i = 0; i < this.inventory.inventorySize; i++) {
            // Create inventory slots and append to inventorySlotsContainer
            let inventorySlot = document.createElement("div");
            inventorySlot.classList.add("inventory-slot");
            
            let { itemImg, itemQuantityText } = this.createInventorySlot(i)
            inventorySlot.appendChild(itemImg);
            inventorySlot.appendChild(itemQuantityText);
            inventorySlotsContainer.appendChild(inventorySlot);
        }
    }

    createInventorySlot(slotIndex) {
        // Create Item Img
        let itemImg = document.createElement('img');
        itemImg.classList.add("item-img")
        itemImg.setAttribute('draggable', true);
        // itemImg.addEventListener('dragstart', this.dragStart.bind(this));
        // itemImg.addEventListener('dragend', this.dragEnd.bind(this));

        // Create Item Quantity Text
        let itemQuantityText = document.createElement("div");
        itemQuantityText.classList.add("item-quantity-text");

        // See if current slot has item
        let name = this.inventory.inventoryOrder[slotIndex];
        if (name) {
            let quantity = this.inventory.inventory[name];
            itemImg.src = this.scene.sys.game.textures.getBase64("item", name);
            itemQuantityText.innerHTML = `x${quantity}`;
        }
        
        return { itemImg, itemQuantityText };
    }

    dragStart(e) {
    //     e.target.className += ' hold';
    //     setTimeout(() => (e.target.parentNode.innerHTML = ""), 0);
    //     let currentGrid = e.target.parentNode;
    //     this.dragIndex = Array.from(currentGrid.parentNode.children).indexOf(currentGrid);
    // }

    // dragEnd() {
    //     console.log("dragEnd")
    //     const items = document.getElementById("item-grids").children
    //     if (this.dragIndex < 0) return;

    //     console.log(this.dragIndex)
    //     console.log(this.dropIndex)
    //     if (this.dropIndex >= 0) {
    //         // let fill = this.createItemIcon(this.inventory.inventory[this.dragIndex].name)
    //         let currItem = this.inventory.inventory[this.dragIndex]
    //         let fill = this.createItemIcon(currItem.name, currItem.quantity)
    //         if (this.inventory.inventory[this.dropIndex] !== undefined) {
    //             items.item(this.dragIndex).appendChild(fill);
    //         } else {
    //             items.item(this.dropIndex).appendChild(fill);
    //         }
    //         this.inventory.swapItems(this.dragIndex, this.dropIndex);
    //         console.log(this.inventory.inventory)
    //     } else {
//     }
    }


}