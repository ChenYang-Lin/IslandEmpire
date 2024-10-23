import { ITEM_DATA, SHOP_DATA } from "./GameData.js";



export default class Shop {
    constructor(scene, hud) {
        this.scene = scene;
        this.hud = hud;

        this.isOpen = false;
        this.inAction = false;

        this.selectedItem = 0;


        this.shopContainer = document.getElementById("shop-container");
        this.shopQuantityWindow = document.getElementById("shop-quantity-window");
        this.init();
        
    }

    init() {
        this.createShopWindow();
    
        this.shopExitBtn = document.getElementById("shop-exit-btn");
        this.shopExitBtn.addEventListener("pointerdown", () => {
            this.closeWindow();
        })

        this.shopPurchaseBtn = document.getElementById("shop-purchase-btn");
        this.shopPurchaseBtn.addEventListener("pointerdown", () => {
            this.openQuantityWindow();
        })

        this.shopQuantityCancelBtn = document.getElementById("shop-quantity-cancel-btn");
        this.shopQuantityCancelBtn.addEventListener("pointerdown", () => {
            this.closeQuantityWindow();
        })

        this.initShopQuantityWindow();

    }

    createShopWindow() {
        let shopItemList = document.getElementById("shop-item-list");

        // Create Shop List
        shopItemList.innerHTML = "";
            // <div id="shop-item-list">
            //     <div class="shop-item">
            //         <img src="" alt="" class="shop-item-img">
            //         <div class="shop-item-descriptions">
            //             <div class="shop-item-descriptions-name">Wood</div>
            //             <div class="shop-item-descriptions-price">10 coins</div>
            //         </div>
            //         <div class="shop-item-limit">Unlimited</div>
            //     </div>
            //     <div class="shop-item"></div>
            // </div>
        for (let i = 0; i < SHOP_DATA.length; i++) {
            let shopItem = document.createElement("div");
            shopItem.classList.add("shop-item");
            if (i === this.selectedItem) {
                shopItem.classList.add("shop-item-selected");
            }
            shopItem.setAttribute("index", `${i}`);
            shopItem.addEventListener("pointerdown", () => {
                this.selectedItem = parseInt(shopItem.getAttribute("index"), 10);
                this.createShopWindow();
            })
    
            let shopItemImg = document.createElement("img");
            shopItemImg.classList.add("shop-item-img")
            shopItemImg.src = this.scene.sys.game.textures.getBase64("item", SHOP_DATA[i].name);

            let shopItemDescriptions = document.createElement("div");
            shopItemDescriptions.classList.add("shop-item-descriptions");

            let shopItemDescriptionsName = document.createElement("div");
            shopItemDescriptionsName.classList.add("shop-item-descriptions-name");
            shopItemDescriptionsName.innerHTML = `${SHOP_DATA[i].name}`;

            let shopItemDescriptionsPrice = document.createElement("div");
            shopItemDescriptionsPrice.classList.add("shop-item-descriptions-price");
            shopItemDescriptionsPrice.innerHTML = `Price: ${SHOP_DATA[i].price} coin`;

            shopItemDescriptions.appendChild(shopItemDescriptionsName);
            shopItemDescriptions.appendChild(shopItemDescriptionsPrice);

            let shopItemLimit = document.createElement("div");
            shopItemLimit.classList.add("shop-item-limit");
            shopItemLimit.innerHTML = "Unlimited";
    
            shopItem.appendChild(shopItemImg)
            shopItem.appendChild(shopItemDescriptions)
            shopItemList.appendChild(shopItem);
        }

        // Create Shop Info
        let shopItemInfoHeader = document.getElementById("shop-item-info-header");
        let shopItemInfoCategory = document.getElementById("shop-item-info-category");
        let shopItemInfoImg = document.getElementById("shop-item-info-img");
        let shopItemInfoDescription = document.getElementById("shop-item-info-description");
        let shopItemInfoOwned = document.getElementById("shop-item-info-owned");

        shopItemInfoHeader.innerHTML = `${SHOP_DATA[this.selectedItem].name}`;
        shopItemInfoCategory.innerHTML = `${ITEM_DATA[SHOP_DATA[this.selectedItem].name].category}`;
        shopItemInfoImg.src = this.scene.sys.game.textures.getBase64("item", SHOP_DATA[this.selectedItem].name);

        let owned = this.scene.inventory.inventory[SHOP_DATA[this.selectedItem].name];
        shopItemInfoOwned.innerHTML = `Owned: ${owned ? owned : 0}`;
    }

    initShopQuantityWindow() {
        this.shopQuantityImg = document.getElementById("shop-quantity-img");
        this.shopQuantityImg.src = this.scene.sys.game.textures.getBase64("item", SHOP_DATA[this.selectedItem].name);

        this.shopQuantityValue = document.getElementById("shop-quantity-quantity-value");
        this.shopQuantityRange = document.getElementById("shop-quantity-range");
        let shopQuantityDecreaseBtn = document.getElementById("shop-quantity-decrease-btn");
        let shopQuantityIncreaseBtn = document.getElementById("shop-quantity-increase-btn");
        
        this.quantity = 1;
        this.shopQuantityRange.value = this.quantity;

        let shopQuantityConfirmBtn = document.getElementById("shop-quantity-confirm-btn");
        shopQuantityConfirmBtn.addEventListener("pointerdown", () => {
            this.hud.inventory.addItem(SHOP_DATA[this.selectedItem].name, this.quantity);
            this.closeQuantityWindow();
        })


        shopQuantityDecreaseBtn.addEventListener("pointerdown", () => {
            if (this.quantity <= 1) 
                return;
            this.quantity -= 1;
            this.shopQuantityRange.value = this.quantity;
            this.shopQuantityValue.innerHTML = `${this.quantity}`;
        })
        shopQuantityIncreaseBtn.addEventListener("pointerdown", () => {
            if (this.quantity >= 100) 
                return;
            this.quantity += 1;
            this.shopQuantityRange.value = this.quantity;
            this.shopQuantityValue.innerHTML = `${this.quantity}`;
        })

        this.shopQuantityRange.addEventListener("input", (e) => {
            this.quantity = parseInt(e.target.value, 10);
            this.shopQuantityRange.value = this.quantity;
            this.shopQuantityValue.innerHTML = `${this.quantity}`;
        })
    }

    resetQuantityWindow() {
        this.quantity = 1;
        this.shopQuantityImg.src = this.scene.sys.game.textures.getBase64("item", SHOP_DATA[this.selectedItem].name);
        this.shopQuantityRange.value = 1;
        this.shopQuantityValue.innerHTML = "1";
    }

    openQuantityWindow() {
        this.resetQuantityWindow();
        this.shopQuantityWindow.style.display = "block";
    }

    closeQuantityWindow() {
        this.openWindow();
    }

    openWindow() {
        if(this.inAction) 
            return
        this.shopQuantityWindow.style.display = "none";
        this.createShopWindow();
        this.isOpen = true;
        this.shopContainer.style.display = "block";
    }

    closeWindow() {
        if(this.inAction) 
            return
        this.isOpen = false;
        this.shopContainer.style.display = "none";
    }
}