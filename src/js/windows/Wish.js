import { CHARACTER_TABLE, ENTITY_DATA, ENTITY_TABLE, REWARD_CHANCE_DATA } from "../GameData.js";


export default class Wish {
    constructor(scene, hud) {
        this.scene = scene;
        this.hud = hud;

        this.qualityColor = "blue";
        this.spinQualityValue = 1;
        this.itemList = [];
        this.wishHistory = [];


        this.standardPityCounterFour = 0;
        this.standardPityCounterFive = 0;

        this.wishContainer = document.getElementById("wish-container");
        this.initWishScreen();
    }

    initWishScreen() {
        this.initBanner();
        this.initSpinner();
        
        this.exitBtn = document.getElementById("banner-exit-btn")
        this.exitBtn.addEventListener("pointerdown", () => {
            console.log("exit wish page");
            this.closeWindow();
        }) 
    }

    initBanner() {
        this.fragmentQuantityText = document.getElementById("fragment-quantity-text");
        this.eventQuantityText = document.getElementById("event-quantity-text");
        this.standardQuantityText = document.getElementById("standard-quantity-text");

        this.wishOneBtn = document.getElementById("wish-one-btn");
        this.wishOneBtn.addEventListener("pointerdown", () => {
            if (this.scene.inventory.wishStandard >= 1) {
                this.scene.inventory.wishStandard--;
                this.spinnerSpin(1);
                this.updateCurrency();
            }
        })
        this.wishTenBtn = document.getElementById("wish-ten-btn");
        this.wishTenBtn.addEventListener("pointerdown", () => {
            if (this.scene.inventory.wishStandard >= 10) {
                this.scene.inventory.wishStandard -= 10;
                this.spinnerSpin(10);
                this.updateCurrency();
            }
        })

        this.updateCurrency();


    }

    initSpinner() {
        this.spinnerContainer = document.getElementById("spinner-container")
        this.spinner = document.getElementById("spinner");
        this.spinnerBody = document.getElementById("spinner-body");
        this.spinnerPiece = document.querySelectorAll(".spinner-piece")
        this.spinnerPieceIcon = document.querySelectorAll(".spinner-piece-icon");
        this.spinnerPieceIcon.forEach((icon) => {
            let items = ["stone", "potato_seed", "bottle_water", "bread", "fiber", "wood", "soldier", ]

            let itemName = items[Math.floor(Math.random() * items.length)]

            let entityData = ENTITY_TABLE[itemName]
            if (CHARACTER_TABLE[itemName]) {
                icon.classList.add("scale-4");
            }
            let texture = entityData.texture ?? "item";
            let frame = entityData.frame ?? itemName;

            icon.src = this.scene.sys.game.textures.getBase64(texture, frame);
        })


        this.spinnerScale = 1;
        this.spinnerDegree = 0;
        this.spinnerAcceleration = 0;
        this.spinnerLooper;
        this.isSpinning = false;
        
        this.hideSpinnerContainer();
    }

    updateCurrency() {
        this.fragmentQuantityText.innerHTML = `${this.scene.inventory.wishFragment}`;
        this.eventQuantityText.innerHTML = `${this.scene.inventory.wishEvent}`;
        this.standardQuantityText.innerHTML = `${this.scene.inventory.wishStandard}`;
    }

    wishOne() {
        
        let type = "banner_standard";
        let data = REWARD_CHANCE_DATA[type];

        let chance = Math.random();
        let quality = 6;
        let list;

        console.log(chance)


        for (let [key, value] of Object.entries(data)) {
            quality--;
            if (chance <= value.chance) {
                list = value.list;
                break;
            }
        }
        this.standardPityCounterFour++;
        this.standardPityCounterFive++;

        if (quality <= 5 && this.standardPityCounterFive >= 80) {
            quality = 5;
        } else if (quality <= 4 && this.standardPityCounterFour >= 10) {
            quality = 4;
        } 

        if (quality === 4) {
            list = data.four.list;
            this.standardPityCounterFour = 0;
        }
        if (quality === 5) {
            list = data.five.list;
            this.standardPityCounterFive = 0;
        }

        if (quality > this.spinQualityValue) {
            this.spinQualityValue = quality;
        }

        this.wishHistory.push(quality);


        let randomIndex = Math.floor(Math.random() * list.length);
        let randomRewardName = list[randomIndex];
        
        // console.log(randomRewardName);

        this.scene.inventory.addItem(randomRewardName, 1);
        
        return randomRewardName;
    }

    spinnerSpin(wishQuantity) {
        this.showSpinnerContainer();
        if (this.isSpinning) 
            return;

        this.itemList = [];
        this.spinQualityValue = 1;
        for (let i = 0; i < wishQuantity; i++) {
            let rewardName = this.wishOne();
            this.itemList.push(rewardName);
        }


        console.log(this.wishHistory)
        
        this.spinnerAcceleration = 0;
        this.color = "#00c1ff"; // blue spinner border 
        this.spinnerDegree = 0;
        this.qualitySet = false;
        this.alpha = 0;

        // Spinner spin
        this.spinnerLooper = setInterval(() => {
            this.isSpinning = true;
            spinner.style.transform = `rotate(${this.spinnerDegree}deg) scale(${this.spinnerScale})`

            if (this.spinnerAcceleration < 8)  {
                this.spinnerAcceleration += 0.2;
            }
            this.spinnerDegree += this.spinnerAcceleration;
            if (this.spinnerDegree > 359) {
                this.spinnerDegree = 0;
            }

            if (this.alpha < 255 && !this.qualitySet) {
                this.alpha += 2;
                spinner.style.borderColor = `${this.color}${this.alpha.toString(16)}`
            }
        }, 20);
        
        // Spinner quality color change
        setTimeout(() => {
            this.alpha = 255;
            this.qualitySet = true;
            this.spinnerAcceleration = 15;
            
            switch (this.spinQualityValue) {
                case 5: 
                    this.qualityColor = "gold";
                    break;
                case 4: 
                    this.qualityColor = "purple";
                    break;
                case 3: 
                    this.qualityColor = "blue";
                    break;
                case 2: 
                    this.qualityColor = "green";
                    break;
                case 1: 
                    this.qualityColor = "gray";
                    break;
                default:
                    this.qualityColor = "transparent";
            }

            spinner.style.borderColor = this.qualityColor;
            this.spinnerPiece.forEach((element) => {
                element.classList.add(`spinner-piece-${this.qualityColor}`)
            });
            
            this.spinnerBody.classList.add(`spinner-piece-${this.qualityColor}`);
        }, 3000)
        
        // Show reward screen; and reset spinner
        setTimeout(() => {
            clearInterval(this.spinnerLooper);
            this.isSpinning = false; 
            this.qualitySet = false;

            this.spinnerPiece.forEach((element) => {
                element.classList.remove("spinner-piece-gray")
                element.classList.remove("spinner-piece-green")
                element.classList.remove("spinner-piece-blue")
                element.classList.remove("spinner-piece-purple")
                element.classList.remove("spinner-piece-gold")
            });

            this.spinnerBody.classList.remove("spinner-piece-gray")
            this.spinnerBody.classList.remove("spinner-piece-green")
            this.spinnerBody.classList.remove("spinner-piece-blue")
            this.spinnerBody.classList.remove("spinner-piece-purple")
            this.spinnerBody.classList.remove("spinner-piece-gold")

            this.hud.reward.showRewardScreen(this.itemList);
            this.hideSpinnerContainer();
        }, 5000)
    }

    showSpinnerContainer() {
        this.spinnerContainer.style.display = "block";
    }

    hideSpinnerContainer() {
        this.spinnerContainer.style.display = "none";
    }

    openWindow() {
        this.wishContainer.style.display = "block";
    }

    closeWindow() {
        this.wishContainer.style.display = "none";
        this.hideSpinnerContainer();
    }

    resizeSpinner() {
        let size;
        if (this.hud.hud.offsetHeight < this.hud.hud.offsetWidth) {
            size = this.hud.hud.offsetHeight;
        } else {
            size = this.hud.hud.offsetWidth;
        }
        this.spinnerScale = size / 500;
        this.spinnerScale *= 0.8
        this.spinner.style.transform = `scale(${this.spinnerScale})`;
    }

    resize() {
        this.resizeSpinner();

    }
}