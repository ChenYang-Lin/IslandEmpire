import WorldManager from "../WorldManager.js";
import HUD from "../windows/HUD.js";
import InputController from "../InputController.js";
import Player from "../player/Player.js";
import Resource from "../entity/Resource.js";
import Crop from "../entity/Crop.js";
import Entity from "../entity/Entity.js";
import CollisionController from "../CollisionController.js";
import EventEmitter from "../EventEmitter.js";
import Raft from "../entity/Raft.js";
import Inventory from "../Inventory.js";
import Civilian from "../entity/Civilian.js";
import CharacterManager from "../entity/CharacterManager.js";
import Animal from "../entity/Animal.js";


export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainScene" });

        this.currentMap;
        this.version = "0.31";
    }

    init(data) {
        this.currentMap = data.map;
        if (!this.currentMap) 
            this.currentMap = "island"
        // this.currentMap = "home";
    }

    preload() {
        Player.preload(this);
        Resource.preload(this);
        Crop.preload(this);
        Entity.preload(this);

        
        this.load.atlas("icon", "assets/icon.png", "assets/icon_atlas.json")
        this.load.animation("icon_anim", "assets/icon_anim.json");

        this.load.plugin('rexoutlinepipelineplugin', 'js/utils/rexoutlinepipelineplugin.min.js', true); // outline plugin
        this.load.atlas("item", "assets/item.png", "assets/item_atlas.json");
        this.load.atlas("currency", "assets/currency.png", "assets/currency_atlas.json");
        this.load.atlas("land", "assets/land.png", "assets/land_atlas.json");
        this.load.atlas("construction", "assets/construction.png", "assets/construction_atlas.json");
        this.load.atlas("entity", "assets/entity.png", "assets/entity_atlas.json");


    }

    create() {
        this.checkVersion();
   
        // Initialization
        this.eventEmitter = new EventEmitter();
        this.worldManager = new WorldManager(this);
        this.collisionController = new CollisionController(this);
        this.inventory = new Inventory(this);
        this.player = new Player(this);
        this.characterManager = new CharacterManager(this);
        this.inputController = new InputController(this, this.player);
        this.hud = new HUD(this);
        this.collisionController.init();
        this.worldManager.initWorld(this.currentMap);

        this.camera = this.cameras.main;
        this.camera.setZoom(2);
        // this.cameraDolly = new Phaser.Geom.Point(this.player.x, this.player.y);
        this.camera.startFollow(this.player);
        // this.camera.startFollow(this.cameraDolly);
        // this.camera.setLerp(0.3, 0.3);
        // this.camera.roundPixels = true;


        this.graphics = this.add.graphics()
        this.pointerOnGridIndicator = new Phaser.Geom.Rectangle(0, 0, 32, 32);

        // this.input.on("pointerdown", (pointer) => {

        //     this.gridX = Math.floor((pointer.x + this.camera.worldView.x + 16) / 32);
        //     this.gridY = Math.floor((pointer.y + this.camera.worldView.y + 16) / 32);

        //     this.updatePointerOnGridIndicator(this.gridX, this.gridY)
        //     this.worldManager.astar.findPath(this.worldManager.map, {tx: this.player.onGrid.x, ty: this.player.onGrid.y}, {tx: this.gridX, ty: this.gridY}, this)
        // })
        
        // this.raft = new Raft(this, 0, 500, "raft", "raft", "raft_move_down_0");
        this.piglet = new Animal(this, 0, 0, "piglet", "animal", "piglet_idle_left");

    }


    updatePointerOnGridIndicator(gridX, gridY) {
        this.graphics.clear();
        this.graphics.lineStyle(2, 0x0000ff);
        this.pointerOnGridIndicator.setPosition(gridX * 32 - 16, gridY * 32 - 16);
        this.graphics.strokeRectShape(this.pointerOnGridIndicator);
    }

    checkVersion() {
        let storageVersion = JSON.parse(localStorage.getItem("version"));
        if (this.version !== storageVersion) {
        // if (this.version === storageVersion) {
            if (confirm("New Version Detected: click OK to update")) {
                localStorage.clear();
                localStorage.setItem("version", JSON.stringify(this.version));
            }
        }
    }

    endScene() {
        this.player.destroySelf();
        this.inputController.destroySelf();
        this.inventory.destroySelf();
        this.civilian?.destroySelf();
    }

    update(time, delta) {
        this.player.update(time, delta);
        this.characterManager.update(time, delta);
        this.worldManager.update();
        this.inputController.update();
        this.hud.update();
        this.collisionController.update(time, delta);

        // // update
        // this.cameraDolly.x = Math.floor(this.player.x);
        // this.cameraDolly.y = Math.floor(this.player.y);


        this.raft?.update(time, delta);
        this.piglet?.update(time, delta);
    }
   
}