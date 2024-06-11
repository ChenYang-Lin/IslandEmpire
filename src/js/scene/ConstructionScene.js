import WorldManager from "../WorldManager.js";
import Crop from "../entity/Crop.js";
import Resource from "../entity/Resource.js";


export default class ConstructionScene extends Phaser.Scene {
    constructor() {
        super({ key: "ConstructionScene"})


        this.hud = document.getElementById("hud");
        this.click = false;
        this.isPlacement = true;
        this.selectedGrid = undefined;
    }

    preload() {
        Resource.preload(this);
        Crop.preload(this);

        this.load.atlas("land", "assets/land.png", "assets/land_atlas.json");
    }

    create() {
        this.worldManager = new WorldManager(this);
        this.worldManager.initWorld();
        
        this.initPlacementRemovalBtns();
        this.initConfirmationBtns();
        this.initItemContainer();

        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }})
        this.postFxPlugin = this.plugins.get('rexoutlinepipelineplugin');
        this.pointerOnGridIndicator = new Phaser.Geom.Rectangle(0, 0, 32, 32);

        this.camera = this.cameras.main;
        this.camera.scrollX -= 480;
        this.camera.scrollY -= 270;

        this.input.mousePointer.motionFactor = 0.5;
        this.input.pointer1.motionFactor = 0.5;
        this.input.on("pointermove", (pointer) => {
            this.gridX = Math.floor((pointer.x + this.camera.worldView.x + 16) / 32);
            this.gridY = Math.floor((pointer.y + this.camera.worldView.y + 16) / 32);
            // only update indicater when there no grid currently selected
            if (this.selectedGrid === undefined)
                this.updatePointerOnGridIndicator(this.gridX, this.gridY);
            // make it still count as clicked if pointer didn't move too much. 
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
            console.log(this.selectedGrid)
            if (!this.click || this.selectedGrid !== undefined) 
                return;
            this.gridX = Math.floor((pointer.x + this.camera.worldView.x + 16) / 32)
            this.gridY = Math.floor((pointer.y + this.camera.worldView.y + 16) / 32)
            this.updatePointerOnGridIndicator(this.gridX, this.gridY);
            if (this.isCommandExecutable() === true)
                this.showConfirmationContainer();
        })
        
        this.exitUI = document.getElementById("exit-ui");
        this.exitUI.addEventListener("pointerdown", () => {
            
            this.scene.start("MainScene");
        })


    }

    isCommandExecutable() {
        if (this.isPlacement) {
            if (this.worldManager.map[`${this.gridX},${this.gridY}`]?.isLand) 
                return false;
        } else {
            if (!this.worldManager.map[`${this.gridX},${this.gridY}`]?.isLand) 
                return false;
        }
        return true;
    }


    updatePointerOnGridIndicator(gridX, gridY) {
        this.graphics.clear();
        let isCurrGridLand = this.worldManager.map[`${gridX},${gridY}`]?.isLand
        if ((isCurrGridLand && this.isPlacement) || (!isCurrGridLand && !this.isPlacement)) {
            this.graphics.lineStyle(2, 0xff0000);
        } else {
            this.graphics.lineStyle(2, 0x00ff00);
        }
        this.pointerOnGridIndicator.setPosition(gridX * 32 - 16, gridY * 32 - 16);
        this.graphics.strokeRectShape(this.pointerOnGridIndicator);
    }


    updateLand() {
        let gridX = this.selectedGrid.x;
        let gridY = this.selectedGrid.y;
        let x = gridX * 32;
        let y = gridY * 32;

        let landSprite;

        if (this.isPlacement) {
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

    initPlacementRemovalBtns() {
        this.placementBtn = document.getElementById("placement-btn");
        this.placementBtn.addEventListener("pointerdown", () => {
            this.isPlacement = true;
            this.placementBtn.classList.add("active");
            this.removalBtn.classList.remove("active");
        })

        this.removalBtn = document.getElementById("removal-btn");
        this.removalBtn.addEventListener("pointerdown", () => {
            this.isPlacement = false;
            this.removalBtn.classList.add("active");
            this.placementBtn.classList.remove("active");
        })
    }

    initConfirmationBtns() {
        this.ConfirmationBtnsContainer = document.getElementById("construction-confirmation-btns-container");
        this.ConfirmBtn = document.getElementById("construction-confirm-btn")
        this.CancelBtn = document.getElementById("construction-cancel-btn")
        
        this.hideConfirmationContainer();

        this.ConfirmBtn.addEventListener("pointerdown", () => {
            this.updateLand();
            this.hideConfirmationContainer();
        })

        this.CancelBtn.addEventListener("pointerdown", () => {
            this.hideConfirmationContainer();
        })
    }

    initItemContainer() {
        this.constructionItemContainer = document.getElementById("construction-item-container");
        this.constructionItemList = document.getElementById("construction-item-list");  

        for (let i = 0; i < 10; i++) {
            let item = document.createElement("div");
            item.classList.add("construction-item-card");

            this.constructionItemList.appendChild(item);
        }
    }

    showConfirmationContainer() {
        this.selectedGrid = { x: this.gridX, y: this.gridY };
        this.ConfirmationBtnsContainer.style.display = "flex";
    }

    hideConfirmationContainer() {
        this.selectedGrid = undefined;
        this.ConfirmationBtnsContainer.style.display = "none";
    }

    update() {

    }


}