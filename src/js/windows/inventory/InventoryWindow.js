


export default class InventoryWindow {
    constructor(scene, inventory) {
        this.scene = scene;
        this.inventory = inventory;

        this.selectedIndex = 0;
        this.dragIndex = -1;
        this.dropIndex = -1;
    
        this.createInventoryWindow();
    }

    setSelectedIndex(e) {
        e.target.parentNode.childNodes[this.selectedIndex].classList.remove("selected"); // resets the border of a previously selected inventory slot
        e.target.classList.add("selected");
        this.selectedIndex = parseInt(e.target.getAttribute("index"), 10); // get selected inventory slot index.
    }

    createInventoryWindow() {
        let inventorySlotsContainer = document.getElementById("inventory-slots-container");
        inventorySlotsContainer.innerHTML = '';
        for (let i = 0; i < this.inventory.inventorySize; i++) {
            // Create inventory slots and append to inventorySlotsContainer
            let inventorySlot = document.createElement("div");
            inventorySlot.classList.add("inventory-slot");
            inventorySlot.setAttribute("index", `${i}`);
            inventorySlot.setAttribute('draggable', true);

            if (i === this.selectedIndex) {
                inventorySlot.classList.add("selected");
            }

            inventorySlot.addEventListener('pointerenter', (e) => {
                e.target.classList.add("hover");
            })

            inventorySlot.addEventListener('pointerleave', (e) => {
                e.target.classList.remove("hover");
            })
  
            inventorySlot.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.target.classList.add("hover");
            });
            
            inventorySlot.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.target.classList.remove("hover");
            });

            inventorySlot.addEventListener('dragstart', (e) => {
                this.setSelectedIndex(e);
                if (!this.inventory.inventoryOrder[this.selectedIndex])
                    e.preventDefault();
                e.target.classList.remove("hover");
                e.target.classList.remove("selected");   
            });

            inventorySlot.addEventListener('drop', (e) => {
                let initialSlot = e.target.parentNode.childNodes[this.selectedIndex];
                let currSlot = e.target;
                currSlot.classList.add("hover");
                this.setSelectedIndex(e);

                this.inventory.swapItems(parseInt(initialSlot.getAttribute("index"), 10), parseInt(currSlot.getAttribute("index"), 10));
            });

            inventorySlot.addEventListener('pointerdown', (e) => {
                this.setSelectedIndex(e);                
            })

            
            
            let { itemImg, itemQuantityText } = this.createSlotContent(i)
            inventorySlot.appendChild(itemImg);
            inventorySlot.appendChild(itemQuantityText);
            inventorySlotsContainer.appendChild(inventorySlot);
        }
    }

    createSlotContent(slotIndex) {
        // Create Item Img Container
        let itemImg = document.createElement('img');
        itemImg.classList.add("item-img");
        
        // Create Item Quantity Text Container
        let itemQuantityText = document.createElement("div");
        itemQuantityText.classList.add("item-quantity-text");

        // If there is an item in the current slot, fill the container with the corresponding content
        let name = this.inventory.inventoryOrder[slotIndex];
        if (name) {
            let quantity = this.inventory.inventory[name];
            itemImg.src = this.scene.sys.game.textures.getBase64("item", name);
            itemQuantityText.innerHTML = `x${quantity}`;
        }
        
        return { itemImg, itemQuantityText };
    }

}