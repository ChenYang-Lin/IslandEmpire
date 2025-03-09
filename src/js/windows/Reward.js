import { ENTITY_DATA, ENTITY_TABLE, CHARACTER_TABLE, REWARD_CHANCE_DATA } from "../GameData.js";



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

        // sort by quality in ascending order
        itemList.sort((a, b) => ENTITY_DATA[b].quality - ENTITY_DATA[a].quality);

        itemList.forEach((itemName) => {
            

            let rewardItem = document.createElement("div");
            rewardItem.classList.add("reward-item");
            rewardItem.addEventListener("pointerdown", (e) => {
                console.log("show item detail")
            });

            let rewardItemImg = document.createElement("img");
            rewardItemImg.classList.add("reward-item-img");


            let entityData = ENTITY_TABLE[itemName.name]
            if (CHARACTER_TABLE[itemName.name]) {
                rewardItemImg.classList.add("scale-4");
            }

            let texture = entityData.texture ?? "item";
            let frame = entityData.frame ?? itemName.name;
            rewardItemImg.src = this.scene.sys.game.textures.getBase64(texture, frame);

            let rewardItemQuantity = document.createElement("div");
            rewardItemQuantity.classList.add("reward-item-quantity");
            rewardItemQuantity.innerHTML = `x${1}`

            rewardItem.appendChild(rewardItemImg);
            rewardItem.appendChild(rewardItemQuantity);
            this.rewardItemsContainer.appendChild(rewardItem);

            console.log(itemName.name)

            // quality border shadow
            let quality = ENTITY_DATA[itemName.name].quality;
            switch (quality) {
                case 1: 
                    rewardItem.style.boxShadow = "0 0 2px 1px rgb(255, 255, 255)";
                    break;
                case 2: 
                    rewardItem.style.boxShadow = "0 0 2px 1px rgb(30,255,0)";
                    break;
                case 3: 
                    rewardItem.style.boxShadow = "0 0 3px 2px rgb(0,112,221)";
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

    hideRewardScreen() {
        this.rewardContainer.style.display = "none";
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
                Object.entries(ENTITY_DATA).filter(([key, value]) => value.quality === quality)
            )

            items = Object.keys(items)

            let itemName = items[Math.floor(Math.random() * items.length)]
            itemList.push({ name: itemName, quantity: 1, quality: quality });
        }
        itemList.sort((a, b) => b.quality - a.quality);
        this.showRewardScreen(itemList);
    }

    getOneRandomReward(num, type, displayScreen) {
        let data = REWARD_CHANCE_DATA[type];

        let chance = Math.random();
        let list;

        for (let [key, value] of Object.entries(data)) {
            if (chance <= value.chance) {
                list = value.list;
                break;
            }
        }

        let randomIndex = Math.floor(Math.random() * list.length);
        let randomRewardName = list[randomIndex];
        
        // console.log(randomRewardName);

        this.scene.inventory.addItem(randomRewardName, 1);
        return randomRewardName;
    }


    fishingReward(x, y) {
        let randomRewardName = this.getOneRandomReward(1, "fishing_wl_1", false)

        let rewardImage = this.scene.add.image(x, y, "item", randomRewardName);
        rewardImage.depth += 8;
        rewardImage.displayWidth = 24;
        rewardImage.displayHeight = 24;
        
        let counter = 0;
        let rewardImageInterval = setInterval(() => {
            if (counter < 1000) {
                counter += 100;
                rewardImage.y -= 1;
                rewardImage.alpha -= 0.05;
            } else {
                rewardImage.destroy();
                clearInterval(rewardImageInterval);
            }
        }, 100)
    }

}