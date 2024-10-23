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
            
            this.scene.inventory.addItem(item.name, item.quantity);

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

            // quality border shadow
            let quality = ITEM_DATA[item.name].quality;
            switch (quality) {
                case 1: 
                    rewardItem.style.boxShadow = "0 0 2px 1px rgb(255, 255, 255)";
                    break;
                case 2: 
                    rewardItem.style.boxShadow = "0 0 2px 1px rgb(30,255,0)";
                    break;
                case 3: 
                    rewardItem.style.boxShadow = "0 0 2px 1px rgb(0,112,221)";
                    break;
                case 4: 
                    rewardItem.style.boxShadow = "0 0 3px 2px rgb(163,53,238)";
                    break;
                case 5: 
                    rewardItem.style.boxShadow = "0 0 3px 3px rgb(255, 230, 0)";
                    break;
            }
        })
    }

    randomReward(num, givenProbability) {
        let itemList = [];

        let probability = givenProbability ?? {
            one: 1,
            two: 0.20,
            three: 0.08,
            four: 0.02,
            five: 0.005, 
            // one: 0.8,
            // two: 0.6,
            // three: 0.40,
            // four: 0.2,
            // five: 0.1, 
        };

        for (let i = 0; i < num; i++) {
            let chance = Math.random();
            console.log("chance: " + chance)
            let quality;
            if (chance < probability.five) {
                quality = 5;
            } else if (chance < probability.four) {
                quality = 4;
            } else if (chance < probability.three) {
                quality = 3;
            } else if (chance < probability.two) {
                quality = 2;
            } else {
                quality = 1;
            }

            
            let items = Object.fromEntries(
                Object.entries(ITEM_DATA).filter(([key, value]) => value.quality === quality)
            )

            items = Object.keys(items)

            let itemName = items[Math.floor(Math.random() * items.length)]
            itemList.push({ name: itemName, quantity: 1, quality: quality });
        }
        itemList.sort((a, b) => b.quality - a.quality);
        this.showRewardScreen(itemList);
    }

    hideRewardScreen() {
        this.rewardContainer.style.display = "none";
    }
}