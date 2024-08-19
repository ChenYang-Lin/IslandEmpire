

export default class Wish {
    constructor(scene, hud) {
        this.scene = scene;
        this.hud = hud;

        


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
        this.wishOneBtn = document.getElementById("wish-one-btn");

        this.wishOneBtn.addEventListener("pointerdown", () => {
            console.log("wish one");
            this.spinnerSpin();
        })
    }

    initSpinner() {
        this.spinnerContainer = document.getElementById("spinner-container")
        this.spinner = document.getElementById("spinner");

        this.spinnerScale = 1;
        this.spinnerDegree = 0;
        this.spinnerAcceleration = 0;
        this.spinnerLooper;
        this.isSpinning = false;
        
        this.hideSpinnerContainer();
    }

    spinnerSpin() {
        this.showSpinnerContainer();
        if (this.isSpinning) 
            return;
        this.spinnerAcceleration = 0;
        this.spinnerDegree = 0;
        this.spinnerLooper = setInterval(() => {
            this.isSpinning = true;
            spinner.style.transform = `rotate(${this.spinnerDegree}deg) scale(${this.spinnerScale})`
            spinner.style.borderColor = `blue`;
            if (this.spinnerAcceleration < 15) 
                this.spinnerAcceleration += 0.1;
            this.spinnerDegree += this.spinnerAcceleration;
            if(this.spinnerDegree > 359) {
                this.spinnerDegree = 0;
            }
        }, 20);
        setTimeout(() => {
            clearInterval(this.spinnerLooper);
            this.isSpinning = false; 
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
        console.log(this.hud.hud.offsetHeight)
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