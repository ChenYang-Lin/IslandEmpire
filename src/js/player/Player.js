import AnimationController from "./AnimationController.js";
import CollisionController from "./CollisionController.js";
import Hitbox from "./Hitbox.js";
import Sensors from "./Sensors.js";
import Stats from "./Stats.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 32, 32, "player")
        this.scene = scene;

        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.repositionedY = -22;
        this.y += this.repositionedY;
        this.depth = this.y - this.repositionedY;
        this.setCircle(12)
        this.setOffset(84, 84 - this.repositionedY);

        
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


    get position() {
        return {
            x: this.x,
            y: this.y - this.repositionedY,
        }
    }

    get onGrid() {
        return {
            x: Math.floor((this.x + 16) / 32),
            y: Math.floor((this.y - this.repositionedY + 16) / 32),
        }
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
        this.depth = this.y - this.repositionedY;
        this.sensors.update();
        this.animationController.update();
        this.collisionController.update(time, delta);

    }




}