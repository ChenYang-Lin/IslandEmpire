import CollisionController from "../CollisionController.js";
import Player from "../player/Player.js";
import WorldManager from "../WorldManager.js";


export default class HomeScene extends Phaser.Scene {
    constructor() {
        super({ key: "HomeScene" });
        
       
    }

    prelaod() {

    }

    create() {
        // this.eventEmitter = new EventEmitter();
        this.worldManager = new WorldManager(this);
        this.collisionController = new CollisionController(this);
        this.player = new Player(this);
        this.worldManager.initWorld();

        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.player);
    }

    update() {

    }
}