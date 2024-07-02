


export default class InventoryWindow {
    constructor(scene, inventory) {
        this.scene = scene;
        this.inventory = inventory;

        this.selectedIndex = 0;
        this.dragIndex = -1;
        this.dropIndex = -1;
    
        this.createInventoryWindow();
        this.renderInventoryWindow();

        let inventoryContainer = document.getElementById("inventory-container");
        let exitBtn = document.getElementById("inventory-exit-btn");

        exitBtn.addEventListener("pointerdown", () => {
            inventoryContainer.style.display = "none";
        })
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

    renderInventoryWindow() {
        let inventoryList = document.getElementById("inventory-list");

        // Create Inventory Items
        inventoryList.innerHTML = "";
        
        for (const [key, value] of Object.entries(this.inventory.inventory)) {
            console.log(key, value);

            let itemWrapper = document.createElement("div");
            itemWrapper.classList.add("inventory-item-wrapper");
            itemWrapper.setAttribute("key", `${key}`);
            itemWrapper.addEventListener("pointerdown", () => {
                this.renderItemDetailBox(key)
            })

            let itemImgWrapper = document.createElement("div");
            itemImgWrapper.classList.add("invenotry-item-img-wrapper");

            let itemImg = document.createElement("img");
            itemImg.classList.add("invenntory-item-img")
            itemImg.src = this.scene.sys.game.textures.getBase64("item", key);

            let itemQuantity = document.createElement("div");
            itemQuantity.classList.add("inventory-item-quantity");
            itemQuantity.innerHTML = value;

            itemImgWrapper.appendChild(itemImg);
            itemWrapper.appendChild(itemImgWrapper)
            itemWrapper.appendChild(itemQuantity)
            inventoryList.appendChild(itemWrapper);
        }

        this.renderItemDetailBox("stone");
    }

    renderItemDetailBox(selectedItem) {
        let name = document.getElementById("inventory-description-name");
        let type = document.getElementById("inventory-description-type");
        let image = document.getElementById("inventory-description-img");
        let owned = document.getElementById("inventory-description-owned");
        let descriptions = document.getElementById("inventory-description-descriptions");

        name.innerHTML = `${selectedItem}`;
        // type.innerHTML = `${}`;
        image.src = this.scene.sys.game.textures.getBase64("item", selectedItem);
        owned.innerHTML = `${this.inventory.inventory[selectedItem]}`;
        // descriptions.innerHTML = `${}`;
    }
}