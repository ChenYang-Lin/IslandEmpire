

export default class State {
    constructor(scene) {
        this.scene = scene;

        this.lastWorkingTime = Date.now();

        this.maxHp = 100;
        this.hp = 50;
        this.maxHunger = 10;
        this.hunger = 10;
        this.maxThirst = 10;
        this.thirst = 10;

        this.energy = 100;
        this.speed = 96;
        this.attackDmg = 1;



    }



    update() {
        if (Date.now() - this.lastWorkingTime > 1 * 1000) {
            if (this.hunger >= 0) {
                this.hunger--;
                this.lastWorkingTime += 5000;
            } else {
                // console.log("need food!!!!!!!!!!")
            }
        }
    }

}