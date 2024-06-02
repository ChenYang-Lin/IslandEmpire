import WorldManager from "../WorldManager.js";
import Crop from "../entity/Crop.js";
import Resource from "../entity/Resource.js";


export default class ConstructionScene extends Phaser.Scene {
    constructor() {
        super({ key: "Cons"})
    }

    preload() {
        Resource.preload(this);
        Crop.preload(this);

        this.load.atlas("land", "assets/land.png", "assets/land_atlas.json");
    }

    create() {
        this.worldManager = new WorldManager(this);
        this.worldManager.initWorld();

        this.camera = this.cameras.main;

        this.input.mousePointer.motionFactor = 0.5;
        this.input.pointer1.motionFactor = 0.5;
        this.input.on("pointermove", (pointer) => {
            if (!pointer.isDown) return;
        
            const { x, y } = pointer.velocity;
        
            this.camera.scrollX -= x / this.camera.zoom;
            this.camera.scrollY -= y / this.camera.zoom;
          });
    }

    update() {

    }
}