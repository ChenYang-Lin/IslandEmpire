import WorldManager from "../WorldManager.js";
import Crop from "../entity/Crop.js";
import Resource from "../entity/Resource.js";


export default class ConstructionScene extends Phaser.Scene {
    constructor() {
        super({ key: "ConstructionScene"})

        this.hud = document.getElementById("hud");
        this.click = false;
        this.isPlacement = true;
    }

    preload() {
        Resource.preload(this);
        Crop.preload(this);

        this.load.atlas("land", "assets/land.png", "assets/land_atlas.json");
    }

    create() {
        this.worldManager = new WorldManager(this);
        this.worldManager.initWorld();
        
        this.createPlacementRemovalBtns();

        this.camera = this.cameras.main;
        this.camera.scrollX -= 480;
        this.camera.scrollY -= 270;

        this.input.mousePointer.motionFactor = 0.5;
        this.input.pointer1.motionFactor = 0.5;
        this.input.on("pointermove", (pointer) => {
            if (Math.abs(pointer.x - pointer.prevPosition.x) >= 1 || Math.abs(pointer.y - pointer.prevPosition.y) >= 1 ) {
                this.click = false;
            }
            if (!pointer.isDown) return;
        
            this.camera.scrollX -= (pointer.x - pointer.prevPosition.x) / this.camera.zoom;
            this.camera.scrollY -= (pointer.y - pointer.prevPosition.y) / this.camera.zoom;
        });

        this.input.on("pointerdown", (pointer) => {
            this.click = true;
        })
        this.input.on("pointerup", (pointer) => {
            if (!this.click) 
                return;
            let gridX = Math.floor((pointer.x + this.camera.worldView.x + 16) / 32)
            let gridY = Math.floor((pointer.y + this.camera.worldView.y + 16) / 32)
            // this.add.rectangle(gridX * 32, gridY * 32, 32, 32, "#fff", 0.5);
            this.updateLand(gridX, gridY, this.isPlacement);
        })
        
        this.exitUI = document.getElementById("exit-ui");
        this.exitUI.addEventListener("pointerdown", () => {
            this.placementBtn.remove();
            this.removalBtn.remove();
            this.scene.start("MainScene");
        })
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

    createPlacementRemovalBtns() {
        this.placementBtn = document.createElement("button");
        this.placementBtn.id = "placement-btn";
        this.placementBtn.classList.add("construct-action-btns");
        this.placementBtn.classList.add("active");
        this.placementBtn.innerHTML = `Placement`;
        this.placementBtn.addEventListener("pointerdown", () => {
            this.isPlacement = true;
            this.placementBtn.classList.add("active");
            this.removalBtn.classList.remove("active");
        })

        this.removalBtn = document.createElement("button");
        this.removalBtn.id = "removal-btn";
        this.removalBtn.classList.add("construct-action-btns");
        this.removalBtn.innerHTML = `Removal`;
        this.removalBtn.addEventListener("pointerdown", () => {
            this.isPlacement = false;
            this.removalBtn.classList.add("active");
            this.placementBtn.classList.remove("active");
        })


        this.hud.appendChild(this.placementBtn);
        this.hud.appendChild(this.removalBtn);
    }

    update() {

    }


}