


export default class InventoryWindow {
    constructor(scene, inventory) {
        this.scene = scene;
        this.inventory = inventory;

        this.selectedIndex = 0;
        this.dragIndex = -1;
        this.dropIndex = -1;
    
        this.createInventoryWindow();
        this.renderInventoryPanel();

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

    renderInventoryPanel() {
        let inventoryList = document.getElementById("inventory-list");

        // Create Inventory Items
        inventoryList.innerHTML = "";
        
        for (const [key, value] of Object.entries(this.inventory.inventory)) {
            console.log(key, value);

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

        this.renderItemDetailBox("stone");
    }

    renderItemDetailBox(selectedItem) {
        const inventoryItemDetail = document.getElementById("inventory-detail");

        let image = this.scene.sys.game.textures.getBase64('item', selectedItem)
        inventoryItemDetail.innerHTML = 
        `
        <div class="panel-detail-header">${selectedItem}</div>
        <div class="panel-detail-body">
            <div class="panel-detail-body-type">${"Item Type"}</div>
            <img src="${image}" alt="" class="panel-detail-body-img">
        </div>
        <div class="panel-detail-descriptions">Some descriptions</div>
        `

    }
}