import { ITEM_DATA } from "../GameData.js";



export default class Reward {
    constructor(scene, hud) {
        this.scene = scene;
        this.hud = hud;


        this.init();

    }

    init() {
        this.rewardContainer = document.getElementById("reward-container");
        this.rewardContainerWrapper = document.getElementById("reward-container-wrapper");
        this.rewardFooter = document.getElementById("reward-footer");
        this.rewardItemsContainer = document.getElementById("reward-items-container");

        this.rewardContainerWrapper.addEventListener("pointerdown", (e) => {
            if (e.target !== e.currentTarget) {
                return;
            }
            this.hideRewardScreen();
        });
        this.rewardFooter.addEventListener("pointerdown", (e) => {
            if (e.target !== e.currentTarget) {
                return;
            }
            this.hideRewardScreen();
        });
    }

    showRewardScreen(itemList) {
        this.rewardContainer.style.display = "block";
        this.rewardItemsContainer.innerHTML = "";

        itemList.forEach((item) => {
            
            this.hud.inventory.addItem(item.name, item.quantity);

            let rewardItem = document.createElement("div");
            rewardItem.classList.add("reward-item");
            rewardItem.addEventListener("pointerdown", (e) => {
                console.log("show item detail")
            });

            let rewardItemImg = document.createElement("img");
            rewardItemImg.classList.add("reward-item-img");
            rewardItemImg.src = this.scene.sys.game.textures.getBase64("item", item.name);

            let rewardItemQuantity = document.createElement("div");
            rewardItemQuantity.classList.add("reward-item-quantity");
            rewardItemQuantity.innerHTML = `x${item.quantity}`

            rewardItem.appendChild(rewardItemImg);
            rewardItem.appendChild(rewardItemQuantity);
            this.rewardItemsContainer.appendChild(rewardItem);
        })
    }

    randomReward(num) {
        let itemList = [];
        let items = Object.keys(ITEM_DATA);
        for (let i = 0; i < num; i++) {
            let itemName = items[Math.floor(Math.random() * items.length)]
            itemList.push({ name: itemName, quantity: 1 });
        }
        this.showRewardScreen(itemList);
    }

    hideRewardScreen() {
        this.rewardContainer.style.display = "none";
    }
}