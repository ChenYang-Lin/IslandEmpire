import { ENTITY_DATA, ITEM_DATA } from "../GameData.js";


export default class Wish {
    constructor(scene, hud) {
        this.scene = scene;
        this.hud = hud;

        this.quality = "blue";
        this.itemList = []


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
            this.spinnerSpin(1);
        })
        this.wishTenBtn = document.getElementById("wish-ten-btn");
        this.wishTenBtn.addEventListener("pointerdown", () => {
            this.spinnerSpin(10);
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
            let items = Object.keys(ITEM_DATA);
            icon.src = this.scene.sys.game.textures.getBase64("item", items[Math.floor(Math.random() * items.length)]);
        })


        this.spinnerScale = 1;
        this.spinnerDegree = 0;
        this.spinnerAcceleration = 0;
        this.spinnerLooper;
        this.isSpinning = false;
        
        this.hideSpinnerContainer();
    }

    updateCurrency() {
        this.fragmentQuantityText.innerHTML = `${this.hud.inventory.wishFragment}`;
        this.eventQuantityText.innerHTML = `${this.hud.inventory.wishEvent}`;
        this.standardQuantityText.innerHTML = `${this.hud.inventory.wishStandard}`;
    }

    wishOne() {
        // get chance
        let chance = Math.random();
        // if (chance < 0.3) {
        if (chance < 0.1) {
            // 10% Purple
            this.quality = "purple";
        // } else if (chance < 0.6) {
        } else if (chance < 0.95) {
            // 85% Blue
            this.quality = "blue";
        } else {
            // 5% Gold
            this.quality = "gold";
        }

        let items = Object.keys(ITEM_DATA);
        let itemName = items[Math.floor(Math.random() * items.length)]
        console.log(itemName)
        this.itemList.push({ name: itemName, quantity: 1 });
        this.hud.inventory.addItem(itemName, 1);
    }

    spinnerSpin(wishQuantity) {
        this.showSpinnerContainer();
        if (this.isSpinning) 
            return;

        this.itemList = [];
        for (let i = 0; i < wishQuantity; i++) {
            this.wishOne();
        }


        
        this.spinnerAcceleration = 0;
        this.color = "#00c1ff";
        this.spinnerDegree = 0;
        this.qualitySet = false;
        this.alpha = 0;

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
        setTimeout(() => {
            this.alpha = 255;
            this.qualitySet = true;
            this.spinnerAcceleration = 15;

            spinner.style.borderColor = this.quality;
            this.spinnerPiece.forEach((element) => {
                element.classList.add(`spinner-piece-${this.quality}`)
            });
            
            this.spinnerBody.classList.add(`spinner-piece-${this.quality}`);
        }, 3000)
        setTimeout(() => {
            clearInterval(this.spinnerLooper);
            this.isSpinning = false; 
            this.qualitySet = false;

            this.spinnerPiece.forEach((element) => {
                element.classList.remove("spinner-piece-blue")
                element.classList.remove("spinner-piece-purple")
                element.classList.remove("spinner-piece-gold")
            });

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