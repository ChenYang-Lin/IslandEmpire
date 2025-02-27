
import { ENTITY_DATA, ITEM_ON_USE_DATA } from "../GameData.js";
import Survivor from "../entity/character/Survivor.js";

export default class Player {
    constructor(scene) {
        this.scene = scene;

        this.autoControl = false;
        this.inBattle = false;
        // this.scene.collisionController.player = this;

        
        // let path = this.scene.worldManager.astar.findPath(this.scene.worldManager.map, {tx: this.onGrid.x, ty: this.onGrid.y}, {tx: -2, ty: 0}, this.scene)
        // console.log(path)

        this.healthBarCurrent = document.getElementById("health-bar-current");
        this.healthBarValue = document.getElementById("health-bar-value");
        this.hungerBarCurrent = document.getElementById("hunger-bar-current");
        this.hungerBarValue = document.getElementById("hunger-bar-value");
        this.thirstBarCurrent = document.getElementById("thirst-bar-current");
        this.thirstBarValue = document.getElementById("thirst-bar-value");
    }

    init() {
        let survivor = this.scene.characterManager.getCharacterObject("survivor");
        this.characterOnControl = survivor;

        this.nearbyInteractableSensor = this.scene.physics.add.image(this.characterOnControl.position.x - 16, this.characterOnControl.position.y - 16);
        this.nearbyInteractableSensor.body.setCircle(15, 0, 0);
        this.touchingNearbyObjects = [];

         this.characterOnControl.showMessage();
        this.exitBattle();
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




    destroySelf() {
        this.survivor = null;
    }

    enterBattle() {
        this.inBattle = true;
        this.scene.collisionController.allyGroup.getChildren().forEach((character) => {
            character.showHealthBar = true;
        })
        this.scene.collisionController.enemyGroup.getChildren().forEach((character) => {
            character.showHealthBar = true;
        })
    }

    exitBattle() {
        this.inBattle = true;
        this.scene.collisionController.allyGroup.getChildren().forEach((character) => {
            character.showHealthBar = false;
        })
        this.scene.collisionController.enemyGroup.getChildren().forEach((character) => {
            character.showHealthBar = false;
        })
    }

    update(time, delta) {

        // if (this.autoControl) {
        //     this.moveToGridCell(this.path);
        // }
        this.nearbyInteractableSensor.setPosition(this.characterOnControl.position.x, this.characterOnControl.position.y);

        this.renderStatsDisplay();
    }




}