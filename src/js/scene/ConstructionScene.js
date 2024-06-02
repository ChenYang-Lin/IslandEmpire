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
            let { gridX, gridY } = this.getMousePosition();
            this.updateLand(gridX, gridY, false);
        })
    }

    update() {

    }

    getMousePosition() {
        let gridX = Math.floor((this.input.mousePointer.x + this.camera.worldView.x + 16) / 32);
        let gridY = Math.floor((this.input.mousePointer.y + this.camera.worldView.y + 16) / 32);
        return { gridX, gridY }
    }

    updateLand(gridX, gridY, addLand) {
        let x = gridX * 32;
        let y = gridY * 32;

        let landSprite;


        if (addLand) {
            // add land
            if (this.worldManager.map[`${gridX},${gridY}`]?.isLand) 
                return;
            landSprite = "land_all";
            this.worldManager.map[`${gridX},${gridY}`] = { isLand: true }
        } else {
            // remove land
            if (!this.worldManager.map[`${gridX},${gridY}`]?.isLand) 
                return;
            landSprite = "land";
            this.worldManager.map[`${gridX},${gridY}`] = { isLand: false }
        }

        this.worldManager.saveMapToLocalStorage();


        let land = this.add.sprite(x, y, "land", landSprite);
        this.worldManager.landSpriteGroup[`${gridX},${gridY}`]?.destroy();
        this.worldManager.landSpriteGroup[`${gridX},${gridY}`] = land;
        land.depth = y - 10000;

        this.worldManager.createSurroundingLand(gridX-1, gridY-1);
        this.worldManager.createSurroundingLand(gridX-1, gridY);
        this.worldManager.createSurroundingLand(gridX-1, gridY+1);
        this.worldManager.createSurroundingLand(gridX, gridY-1);
        this.worldManager.createSurroundingLand(gridX, gridY);
        this.worldManager.createSurroundingLand(gridX, gridY+1);
        this.worldManager.createSurroundingLand(gridX+1, gridY-1);
        this.worldManager.createSurroundingLand(gridX+1, gridY);
        this.worldManager.createSurroundingLand(gridX+1, gridY+1);
    }  


}