

export default class Wish {
    constructor(scene, hud) {
        this.scene = scene;
        this.hud = hud;

        
        this.spinnerScale = 1;
        this.spinnerDegree = 0;
        this.spinnerAcceleration = 0;
        this.spinnerLooper;
        this.isSpinning = false;

        this.spinBtn = document.getElementById("spin-btn");
        this.spinner = document.getElementById("spinner");


        console.log(this.number)
        this.spinBtn.addEventListener("click", () => {
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
            }, 5000)
        })
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