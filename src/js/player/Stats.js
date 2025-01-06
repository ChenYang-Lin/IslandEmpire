

export default class State {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        this.lastWorkingTime = Date.now();

        // Player status
        this.maxHp = 100;
        this.hp = 50;
        this.maxHunger = 10;
        this.hunger = 10;
        this.maxThirst = 10;
        this.thirst = 10;

        this.energy = 100;
        this.speed = 96;
        this.attackDmg = 1;


        this.healthBarCurrent = document.getElementById("health-bar-current");
        this.healthBarValue = document.getElementById("health-bar-value");
        this.hungerBarCurrent = document.getElementById("hunger-bar-current");
        this.hungerBarValue = document.getElementById("hunger-bar-value");
        this.thirstBarCurrent = document.getElementById("thirst-bar-current");
        this.thirstBarValue = document.getElementById("thirst-bar-value");
    }

    renderStatsDisplay() {
        this.healthBarCurrent.style.width = (this.hp / this.maxHp) * 100 + "%";
        this.healthBarValue.innerHTML = `${this.hp} / ${this.maxHp}`

        this.hungerBarCurrent.style.width = (this.hunger / this.maxHunger) * 100 + "%";
        this.hungerBarValue.innerHTML = `${this.hunger} / ${this.maxHunger}`

        this.thirstBarCurrent.style.width = (this.thirst / this.maxThirst) * 100 + "%";
        this.thirstBarValue.innerHTML = `${this.thirst} / ${this.maxThirst}`
    }

    update() {
        if (Date.now() - this.lastWorkingTime > 60 * 1000) {
            if (this.hunger >= 0) {
                this.hunger--;
                this.renderStatsDisplay();
                this.lastWorkingTime += 5000;
            } else {
                console.log("need food!!!!!!!!!!")
            }
        }
    }

}