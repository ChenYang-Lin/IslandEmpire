import AnimationController from "./AnimationController.js";

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

        this.sensor = this.scene.physics.add.image(this.position.x, this.position.y);
        this.sensor.body.setCircle(50, -33, -33);
        
        this.touching = [];
    

        // Player stats
        this.speed = 150;
        this.attackDmg = 1;

        this.animationController = new AnimationController(this.scene, this);

        

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

    get grid() {
        return {
            x: this.x + 16,
            y: this.y - this.repositionedY + 16,
        }
    }

    update() {
        this.depth = this.y - this.repositionedY;
        this.sensor.setPosition(this.position.x, this.position.y);

        this.animationController.update();

    }




}