

export default class State {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        // Player status
        this.maxHp = 100;
        this.hp = 100;
        this.mp = 100;
        this.speed = 96;
        this.attackDmg = 1;

        this.energy = 100;
        this.hunger = 100;
        this.thirst = 100;
    }

    initDisplay() {

        console.log(this.scene, this.player);
    }
}