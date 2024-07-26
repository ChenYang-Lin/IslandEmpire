

export default class State {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        // Player status
        this.maxHp = 100;
        this.hp = 50;
        this.maxHunger = 100;
        this.hunger = 50;
        this.maxThirst = 100;
        this.thirst = 50;

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

    useItem(itemName) {
        console.log("useItem: ", itemName)
        this.hp += 20;
        if (this.hp >= 100) {
            this.hp = 100;
        }

        this.renderStatsDisplay();
    }

}