import Ally from "../entity/Ally.js";
import Character from "../entity/Character.js";
import { ENTITY_DATA } from "../GameData.js";
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
        if (!this.scene.hud.inventory.removeItem(itemName, 1)) {
            console.log(itemName + " out")
            return;
        }
        console.log("useItem: ", itemName)
        this.stats.hp += 20;
        if (this.stats.hp >= 100) {
            this.stats.hp = 100;
        }

        this.stats.renderStatsDisplay();
    }

    update(time, delta) {

        console.log(this.destroyed);
        if (this.destroyed) {
            return;
        }

        super.update();
        if (this.autoControl) {
            this.moveToGridCell(this.path);
        }
        this.sensors.update();
    }




}