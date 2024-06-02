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
        this.camera.scrollX -= 480;
        this.camera.scrollY -= 270;

        this.input.mousePointer.motionFactor = 0.5;
        this.input.pointer1.motionFactor = 0.5;
        this.input.on("pointermove", (pointer) => {
            if (!pointer.isDown) return;
        
            this.camera.scrollX -= (pointer.x - pointer.prevPosition.x) / this.camera.zoom;
            this.camera.scrollY -= (pointer.y - pointer.prevPosition.y) / this.camera.zoom;
        });

        this.input.on("pointerdown", (pointer) => {
            this.getMousePosition();
        })
    }

    update() {

    }

    getMousePosition() {
        let x = Math.floor((this.input.mousePointer.x + this.camera.worldView.x + 16) / 32);
        let y = Math.floor((this.input.mousePointer.y + this.camera.worldView.y + 16) / 32);
        console.log(x, y)
    }

}