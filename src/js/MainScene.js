import GameManager from "./GameManager.js";
import InputController from "./player/InputController.js";
import Player from "./player/Player.js";
import Resource from "./Resource.js";


export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainScene" });

        this.landCollidersGroup;
        this.resourceCollidersGroup;
    }

    preload() {
        Player.preload(this);
        Resource.preload(this);

        this.load.atlas("item", "assets/item.png", "assets/item_atlas.json");
        this.load.atlas("land", "assets/land.png", "assets/land_atlas.json");

    }

    create() {
        this.gameManager = new GameManager(this);
        this.gameManager.initWorld();
        this.player = new Player(this);
        this.inputController = new InputController(this, this.player);

        this.cameras.main.startFollow(this.player);
        // this.cameras.main.setLerp(0.3, 0.3);
        this.cameras.roundPixels = true;

        this.physics.add.collider(this.player, this.landCollidersGroup);
        this.physics.add.collider(this.player, this.resourceCollidersGroup);
        
        this.physics.add.overlap(this.player.sensor, this.resourceCollidersGroup, (player, resource) => {
            if (this.player.touching.includes(resource))
                return;
            this.player.touching.push(resource);
            console.log(this.player.touching)
        });


        
    }

    update() {
        this.player.update();
        this.inputController.update();

        // this.getMousePosition();
    }

    getMousePosition() {
        let x = this.input.mousePointer.x;
        let y = this.input.mousePointer.y
        console.log(x, y)
    }

   
}