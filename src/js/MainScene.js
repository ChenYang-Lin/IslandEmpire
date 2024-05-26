import WorldManager from "./WorldManager.js";
import HUD from "./HUD.js";
import Inventory from "./inventory/Inventory.js";
import InputController from "./player/InputController.js";
import Player from "./player/Player.js";
import Resource from "./entity/Resource.js";
import Crop from "./entity/Crop.js";


export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainScene" });
    }

    preload() {
        Player.preload(this);
        Resource.preload(this);
        Crop.preload(this);

        this.load.plugin('rexvirtualjoystickplugin', "js/utils/rexvirtualjoystickplugin.min.js", true);
        this.load.plugin('rexoutlinepipelineplugin', 'js/utils/rexoutlinepipelineplugin.min.js', true); // outline plugin
        this.load.atlas("item", "assets/item.png", "assets/item_atlas.json");
        this.load.atlas("land", "assets/land.png", "assets/land_atlas.json");

    }

    create() {
        this.sys.game.scale.setParentSize(window.innerWidth, window.innerHeight); // make sure game is not overflow in ios safari.
   
        // Initialization
        this.worldManager = new WorldManager(this);
        this.worldManager.initWorld();
        this.player = new Player(this);
        this.inventory = new Inventory(this);
        this.inputController = new InputController(this, this.player);
        this.hud = new HUD(this);

        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        // this.camera.setLerp(0.3, 0.3);
        this.camera.roundPixels = true;

        // this.scale.setParentSize(window.innerWidth, window.innerHeight);
        
    }

    update() {
        this.player.update();
        this.worldManager.update();
        this.inputController.update();
        this.hud.update();

        // this.getMousePosition();
    }

    getMousePosition() {
        let x = this.input.mousePointer.x;
        let y = this.input.mousePointer.y
        console.log(x, y)
    }

   
}