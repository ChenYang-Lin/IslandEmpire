import Character from "../entity/Character.js";
import { ENTITY_DATA } from "../GameData.js";
import AnimationController from "./AnimationController.js";
import CollisionController from "./CollisionController.js";
import Hitbox from "./Hitbox.js";
import Sensors from "./Sensors.js";
import Stats from "./Stats.js";

export default class Player extends Character {
    constructor(scene) {
        const entityData = ENTITY_DATA["player"];
        // scene, x, y, name, texture, frame
        super(scene, 32, 32, "player", "player", "idle_right", entityData);
        this.scene = scene;

        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);


        
        this.direction = "left";

        this.animationController = new AnimationController(this.scene, this);
        this.hitbox = new Hitbox(this.scene, this);
        this.sensors = new Sensors(this.scene, this);
        this.collisionController = new CollisionController(this.scene, this);
        this.stats = new Stats(this.scene, this);

    }

    static preload(scene) {
        scene.load.atlas("player", "assets/player.png", "assets/player_atlas.json");
        scene.load.animation("player_anim", "assets/player_anim.json");
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
        this.depth = this.position.y;
        this.sensors.update();
        this.animationController.update();
        this.collisionController.update(time, delta);
    }




}