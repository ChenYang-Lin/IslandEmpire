import { ENTITY_DATA } from "../GameData.js";
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
        this.selectedItemIndex = undefined;

        this.action = "selection";
        this.selectedStructure = "";
        this.isPointerDown = false;

        this.setX;
        this.setY;

        this.map;
        this.tempMap;


        this.constructionItemContainer = document.getElementById("construction-item-container");
        this.constructionItemList = document.getElementById("construction-item-list");  
                        
        this.exitUI = document.getElementById("exit-ui");
        this.exitUI.addEventListener("pointerdown", () => {
            
            this.scene.start("MainScene");
        })

    }

    preload() {
        Resource.preload(this);
        Crop.preload(this);

        this.load.atlas("construction", "assets/construction.png", "assets/construction_atlas.json");
        this.load.atlas("land", "assets/land.png", "assets/land_atlas.json");
        this.load.atlas("item", "assets/item.png", "assets/item_atlas.json");
    }

    create() {
        this.worldManager = new WorldManager(this);
        this.worldManager.initWorld();
        this.map = Object.assign({}, this.worldManager.map);
        this.tempMap = Object.assign({}, this.worldManager.map);
        

        this.selectionBtn = document.getElementById("selection-btn");
        this.selectionBtn.addEventListener("pointerdown", () => {
            this.action = "selection";
            this.destroyTempObjects();
            this.resetSelectedItem();
            this.selectionBtn.classList.add("construction-item-selected");
            this.hideConfirmationContainer();
        });

        let eraserBtn = document.getElementById("eraser-btn");
        eraserBtn.addEventListener("pointerdown", () => {
            this.action = "eraser";
            this.resetSelectedItem();
            this.showGridBackground();
            this.showConfirmationContainer();
            eraserBtn.classList.add("construction-item-selected");
        })

        let soilBtn = document.getElementById("soil-btn");
        soilBtn.src = this.sys.game.textures.getBase64("construction", "soil");
        soilBtn.addEventListener("pointerdown", () => {
            this.action = "soil";
            this.resetSelectedItem();
            this.showGridBackground();
            this.showConfirmationContainer();
            soilBtn.classList.add("construction-item-selected");
        })


        this.initItemContainer();
        // this.initPlacementRemovalBtns();
        this.initConfirmationBtns();

        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }})
        this.postFxPlugin = this.plugins.get('rexoutlinepipelineplugin');
        this.pointerOnGridIndicator = new Phaser.Geom.Rectangle(0, 0, 32, 32);

        this.camera = this.cameras.main;
        this.camera.scrollX -= 480;
        this.camera.scrollY -= 270;


        this.initInputs();
        

    }

    initInputs() {
        // Pointer Move
        this.input.mousePointer.motionFactor = 0.5;
        this.input.pointer1.motionFactor = 0.5;
        this.input.on("pointermove", (pointer) => {

            this.gridX = Math.floor((pointer.x + this.camera.worldView.x + 16) / 32);
            this.gridY = Math.floor((pointer.y + this.camera.worldView.y + 16) / 32);
            // console.log(this.gridX, this.gridY);
            
            switch (this.action) {
                case "selection":
                    if (this.isPointerDown) {
                        this.camera.scrollX -= (pointer.x - pointer.prevPosition.x) / this.camera.zoom;
                        this.camera.scrollY -= (pointer.y - pointer.prevPosition.y) / this.camera.zoom;
                    }
                    break;
                case "eraser":
                    if (this.isPointerDown){
                        this.updateLand(this.gridX, this.gridY, false);
                    }
                    break;
                case "soil":
                    if (this.isPointerDown) {
                        this.updateLand(this.gridX, this.gridY, true);
                    }
                    break;
                case "placement":
                    if (this.isPointerDown){
                        this.drawEntity(this.gridX, this.gridY);
                    }
                    break;
                default:
            }
        });


        // PointerDown
        this.input.on("pointerdown", (pointer) => {
            this.isPointerDown = true;
            this.gridX = Math.floor((pointer.x + this.camera.worldView.x + 16) / 32)
            this.gridY = Math.floor((pointer.y + this.camera.worldView.y + 16) / 32)
            // console.log(this.gridX, this.gridY);
            // this.click = true;
            switch (this.action) {
                case "selection":
                    break;
                case "eraser":
                    this.updateLand(this.gridX, this.gridY, false);
                    break;
                case "soil":
                    this.updateLand(this.gridX, this.gridY, this.isPlacement);
                    break;
                    case "placement":
                        this.drawEntity(this.gridX, this.gridY);
                        break;
                default:
            }

        })

        this.input.on("pointerup", (pointer) => {
            this.isPointerDown = false;
        })

    }

    
    initItemContainer() {
        this.constructionItemList.innerHTML = ``;

        Object.entries(ENTITY_DATA).forEach(([key, value], i) => {
            if (ENTITY_DATA[key].category !== "structure") {
                return;
            }
            let item = document.createElement("div");
            item.classList.add("construction-item-card");
            item.setAttribute("index", `${i}`);

            let itemImg = document.createElement("img");
            itemImg.classList.add("construction-item-img");
            itemImg.src = this.sys.game.textures.getBase64("construction", key);

            item.addEventListener("pointerdown", (e) => {
                this.resetSelectedItem();
                item.classList.add("construction-item-selected");
                this.selectedItemIndex = parseInt(e.target.getAttribute("index"), 10);
                this.selectedStructure = key;
                console.log(this.selectedItemIndex);
                this.action = "placement";

                let centerX = this.camera.worldView.x + this.camera.width / 2;
                let centerY = this.camera.worldView.y + this.camera.height / 2;

                let offsetX = centerX % 32;
                let offsetY = centerY % 32;

                centerX -= offsetX;
                centerY -= offsetY;

                this.drawEntity(centerX / 32, centerY / 32);

                this.showConfirmationContainer();
                
            })

            item.appendChild(itemImg);
            this.constructionItemList.appendChild(item);
        })

    }

    drawEntity(gridX, gridY) {
        let name = this.selectedStructure;
        this.destroyTempObjects();

        this.setX = gridX;
        this.setY = gridY;

        let entity = ENTITY_DATA[name];

        let adjustX = 0;
        if (entity.width % 2 === 0) {
            adjustX = 16;
        }
        let adjustY = 0;
        if (entity.height % 2 === 0) {
            adjustY = 16;
        }
        
        let x = (gridX - entity.imageWidth / 2 - entity.offsetX + entity.width / 2) * 32 + adjustX; 
        let y = (gridY + entity.imageHeight / 2 - entity.offsetY - entity.height / 2) * 32 + adjustY;
        this.structureSprite = this.add.sprite(x, y, "construction", name);

        this.isLandOccupied(gridX, gridY);
        let color = this.placeable ? 0x00ff00 : 0xff0000;

        let gx = gridX * 32 + adjustX; 
        let gy = gridY * 32 + adjustY;
        let width = entity.width * 32;
        let height = entity.height * 32;
        this.gridEntity = this.add.grid(gx, gy, width, height, 32, 32, color, 0.5, 0xbfbfbf, 0 );

    }

    addStructureToWorld() {
        if (this.isLandOccupied(this.setX, this.setY)) {
            return;
        }
        let structure = this.add.sprite(this.structureSprite.x, this.structureSprite.y, "construction", this.selectedStructure);
        this.worldManager.map[`${this.setX},${this.setY}`]["entities"] = [this.selectedStructure];
        this.worldManager.saveMapToLocalStorage();
    }

    

    isLandOccupied(gridX, gridY) {
        let occupied = false;

        let name = this.selectedStructure;
        let width = ENTITY_DATA[name].width;
        let height = ENTITY_DATA[name].height;

        let occupiedLands = []

        let left = (gridX - (Math.ceil(width / 2)) + 1);
        let top = (gridY - (Math.ceil(height / 2)) + 1);
        console.log(gridX, gridY, left, top)

        this.placeable = true;


        for (let x = left; x < left + width; x++) {
            for (let y = top; y < top + height; y++) {
                occupiedLands.push(`${x},${y}`)
                // Land does not exist
                // console.log(!this.worldManager.map[`${x},${y}`])
                if (!this.worldManager.map[`${x},${y}`]?.isLand) {
                    this.placeable = false;
                    occupied = true;
                    continue;
                }
                // Entity on land
                this.worldManager.map[`${x},${y}`]?.entities?.forEach((entity) => {
                    // console.log(entity)
                    this.placeable = false;
                    occupied = true;
                })
            }
        }
        
        return occupied;
        // console.log(occupiedLands);
    }


    resetSelectedItem() {
        console.log("called")
        let mainActionContainer = document.getElementById("construction-main-actions-container");
        let mainActionBtns = mainActionContainer.children;

        // Reset selected item from main actions container
        for (let i = 0; i < mainActionBtns.length; i++) {
            mainActionBtns[i].classList.remove("construction-item-selected");
        }

        // Reset selected item from item container
        for (let i = 0; i < this.constructionItemList.children.length; i ++) {
            this.constructionItemList.children[i]?.classList.remove("construction-item-selected");
        }

        this.destroyTempObjects();
    }


    showGridBackground() {
        // x, y, width, height, cellWidth, cellHeight, fillColor, fillAlpha, outlineFillColor, outlineFillAlpha
        this.gridBackground = this.add.grid(-16, -16, 2048, 2048, 32, 32, 0x00ff00, 0, 0xbfbfbf, 0.7 );
    }

    destroyTempObjects() {
        this.gridBackground?.destroy();
        this.gridEntity?.destroy(); 
        this.structureSprite?.destroy();
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


    updateLand(gridX, gridY, isPlacement) {
        let x = gridX * 32;
        let y = gridY * 32;
        let landSprite;

        if (isPlacement) {
            // add land
            if (this.worldManager.map[`${gridX},${gridY}`]?.isLand) 
                return;
            landSprite = "land_all";
            
        } else {
            // remove land
            if (!this.worldManager.map[`${gridX},${gridY}`]?.isLand) 
                return;
            landSprite = "land";
        }

        this.updateMapData(gridX, gridY, isPlacement)

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

    updateMapData(gridX, gridY, isPlacement) {
        console.log("updated")
        let isLand = isPlacement ? true : false 
        if (this.worldManager.map[`${gridX},${gridY}`] !== undefined) {
            this.worldManager.map[`${gridX},${gridY}`].isLand = isLand;
        } else {
            this.worldManager.map[`${gridX},${gridY}`] = { isLand: isLand};
        }
        this.worldManager.saveMapToLocalStorage();
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
            if (this.action === "placement") {
                this.addStructureToWorld();
            }
            if (this.action === "soil" || this.action === "eraser") {
                this.destroyTempObjects();
            }
            this.resetSelectedItem();
            this.selectionBtn.classList.add("construction-item-selected");
            this.action = "selection";
            this.hideConfirmationContainer();
        })

        this.CancelBtn.addEventListener("pointerdown", () => { 
            if (this.action === "placement") {
                this.destroyTempObjects();
            }
            this.resetSelectedItem();
            this.selectionBtn.classList.add("construction-item-selected");
            this.action = "selection";
            this.hideConfirmationContainer();
        })
    }


    showConfirmationContainer() {
        this.ConfirmationBtnsContainer.style.display = "flex";
        if (this.action === "eraser" || this.action === "soil") {
            this.CancelBtn.style.display = "none";
        } else if (this.action === "placement") {
            this.CancelBtn.style.display = "block";
        } 
    }

    hideConfirmationContainer() {
        this.ConfirmationBtnsContainer.style.display = "none";
    }

    update() {

    }


}