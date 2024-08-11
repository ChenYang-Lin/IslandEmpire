import WorldManager from "./WorldManager.js";
import HUD from "./windows/HUD.js";
import InputController from "./player/InputController.js";
import Player from "./player/Player.js";
import Resource from "./entity/Resource.js";
import Crop from "./entity/Crop.js";
import Goblin from "./entity/Goblin.js";
import Entity from "./entity/Entity.js";
import CollisionController from "./CollisionController.js";


export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainScene" });
    }

    preload() {
        Player.preload(this);
        Resource.preload(this);
        Crop.preload(this);
        Entity.preload(this);

        this.load.plugin('rexvirtualjoystickplugin', "js/utils/rexvirtualjoystickplugin.min.js", true);
        this.load.plugin('rexoutlinepipelineplugin', 'js/utils/rexoutlinepipelineplugin.min.js', true); // outline plugin
        this.load.atlas("item", "assets/item.png", "assets/item_atlas.json");
        this.load.atlas("land", "assets/land.png", "assets/land_atlas.json");
        this.load.atlas("construction", "assets/construction.png", "assets/construction_atlas.json");

    }

    create() {
   
        // Initialization
        this.worldManager = new WorldManager(this);
        this.player = new Player(this);
        this.inputController = new InputController(this, this.player);
        this.hud = new HUD(this);
        this.collisionController = new CollisionController(this, this.player);
        this.worldManager.initWorld();

        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        // this.camera.setLerp(0.3, 0.3);
        // this.camera.roundPixels = true;

        // this.goblin = new Goblin(this, 64, 64, "goblin", "goblin");
        
    }

    update(time, delta) {
        this.player.update(time, delta);
        this.worldManager.update();
        this.inputController.update();
        this.hud.update();
        this.collisionController.update(time, delta);

        this.goblin?.update(time, delta);
    }


   
}