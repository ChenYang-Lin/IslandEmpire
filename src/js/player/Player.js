import Ally from "../entity/Ally.js";
import Character from "../entity/Character.js";
import { ENTITY_DATA, ITEM_ON_USE_DATA } from "../GameData.js";
import Sensors from "./Sensors.js";
import Stats from "./Stats.js";

export default class Player extends Ally {
    constructor(scene) {

        // if (Player._instance) {
        //     return Player._instance;
        // }

        const entityData = ENTITY_DATA["player"];
        // scene, x, y, name, texture, frame
        super(scene, 0, 0, "player", "player", "player_idle_right", entityData);
        this.scene = scene;

        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);


        this.autoControl = false;

        this.sensors = new Sensors(this.scene, this);
        this.stats = new Stats(this.scene, this);

        this.scene.collisionController.player = this;
        
        let path = this.scene.worldManager.astar.findPath(this.scene.worldManager.map, {tx: this.onGrid.x, ty: this.onGrid.y}, {tx: -2, ty: 0}, this.scene)
        // console.log(path)

        // Player._instance = this;
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

        this.stats.renderStatsDisplay();
    }

    destroySelf() {
        delete this.sensors;
        delete this.stats;
        super.destroySelf();
    }

    update(time, delta) {

        // console.log(this.destroyed);
        // if (this.destroyed) {
        //     return;
        // }

        super.update();
        if (this.autoControl) {
            this.moveToGridCell(this.path);
        }
        this.sensors.update();

        this.stats.update();

        // console.log("player updating")
    }




}