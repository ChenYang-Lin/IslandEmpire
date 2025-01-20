
import { ENTITY_DATA, ITEM_ON_USE_DATA } from "../GameData.js";
import Survivor from "../entity/character/Survivor.js";

export default class Player {
    constructor(scene) {
        this.scene = scene;

        this.survivor = new Survivor(this.scene, "player", 0, 0, "player", "player_idle_left");
        this.characterOnControl = this.survivor;

        this.autoControl = false;
        // this.scene.collisionController.player = this;

        this.nearbyInteractableSensor = this.scene.physics.add.image(this.characterOnControl.position.x - 16, this.characterOnControl.position.y - 16);
        this.nearbyInteractableSensor.body.setCircle(15, 0, 0);
        this.touchingNearbyObjects = [];
        
        // let path = this.scene.worldManager.astar.findPath(this.scene.worldManager.map, {tx: this.onGrid.x, ty: this.onGrid.y}, {tx: -2, ty: 0}, this.scene)
        // console.log(path)


        this.healthBarCurrent = document.getElementById("health-bar-current");
        this.healthBarValue = document.getElementById("health-bar-value");
        this.hungerBarCurrent = document.getElementById("hunger-bar-current");
        this.hungerBarValue = document.getElementById("hunger-bar-value");
        this.thirstBarCurrent = document.getElementById("thirst-bar-current");
        this.thirstBarValue = document.getElementById("thirst-bar-value");
    }

    renderStatsDisplay() {
        this.healthBarCurrent.style.width = (this.characterOnControl.stats.hp / this.characterOnControl.stats.maxHp) * 100 + "%";
        this.healthBarValue.innerHTML = `${this.characterOnControl.stats.hp} / ${this.characterOnControl.stats.maxHp}`

        this.hungerBarCurrent.style.width = (this.characterOnControl.stats.hunger / this.characterOnControl.stats.maxHunger) * 100 + "%";
        this.hungerBarValue.innerHTML = `${this.characterOnControl.stats.hunger} / ${this.characterOnControl.stats.maxHunger}`

        this.thirstBarCurrent.style.width = (this.characterOnControl.stats.thirst / this.characterOnControl.stats.maxThirst) * 100 + "%";
        this.thirstBarValue.innerHTML = `${this.characterOnControl.stats.thirst} / ${this.characterOnControl.stats.maxThirst}`
    }

    autoMoveToGridCell(path) {
        this.autoControl = true;
        this.path = path;
    }


    useItem(itemName) {
        
        console.log("useItem: ", itemName)
        console.log(ENTITY_DATA[itemName])
        console.log(ITEM_ON_USE_DATA[itemName] )

        let deltaHunger = ITEM_ON_USE_DATA[itemName]?.hunger ?? 0
        let deltaThirst = ITEM_ON_USE_DATA[itemName]?.thirst ?? 0
        let deltaHp = ITEM_ON_USE_DATA[itemName]?.hp ?? 0

        this.stats.hunger += deltaHunger;
        if (this.stats.hunger >= this.stats.maxHunger) {
            this.stats.hp = this.stats.maxHunger;
        }

        this.stats.thirst += deltaThirst;
        if (this.stats.thirst >= this.stats.maxThirst) {
            this.stats.thirst = this.stats.maxThirst;
        }
        
        this.stats.hp += deltaHp;
        if (this.stats.hp >= this.stats.maxHp) {
            this.stats.hp = this.stats.maxHp;
        }

        this.renderStatsDisplay();
    }

    destroySelf() {
        this.survivor = null;
    }

    update(time, delta) {

        // if (this.autoControl) {
        //     this.moveToGridCell(this.path);
        // }
        this.nearbyInteractableSensor.setPosition(this.characterOnControl.position.x, this.characterOnControl.position.y);

        this.renderStatsDisplay();
    }




}