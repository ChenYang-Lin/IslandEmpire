import { SHOP_DATA } from "../GameData.js";



export default class Shop {
    constructor(scene) {
        this.scene = scene;

        this.isOpen = false;
        this.inAction = false;

        this.selectedItem = 0;

        this.shopContainer = document.getElementById("shop-container");
        this.createShopWindow();
    }

    createShopWindow() {
        let shopItemList = document.getElementById("shop-item-list");

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
            console.log(this.selectedItem)
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
            shopItemDescriptionsPrice.innerHTML = `${SHOP_DATA[i].price}`;

            shopItemDescriptions.appendChild(shopItemDescriptionsName);
            shopItemDescriptions.appendChild(shopItemDescriptionsPrice);

            let shopItemLimit = document.createElement("div");
            shopItemLimit.classList.add("shop-item-limit");
            shopItemLimit.innerHTML = "Unlimited";
    
            shopItem.appendChild(shopItemImg)
            shopItem.appendChild(shopItemDescriptions)
            shopItemList.appendChild(shopItem);
        }

    }

    openWindow() {
        if(this.inAction) 
            return
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