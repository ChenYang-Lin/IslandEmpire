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
        this.isPointerDown = false;


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
        

        let selectionBtn = document.getElementById("selection-btn");
        selectionBtn.addEventListener("pointerdown", () => {
            this.action = "selection";
            this.hideGridBackground();
            this.resetSelectedItem();
            selectionBtn.classList.add("construction-item-selected");
        });

        let eraserBtn = document.getElementById("eraser-btn");
        eraserBtn.addEventListener("pointerdown", () => {
            this.action = "eraser";
            this.resetSelectedItem();
            this.showGridBackground();
            eraserBtn.classList.add("construction-item-selected");
        })

        let soilBtn = document.getElementById("soil-btn");
        soilBtn.src = this.sys.game.textures.getBase64("construction", "soil");
        soilBtn.addEventListener("pointerdown", () => {
            this.action = "soil";
            this.resetSelectedItem();
            this.showGridBackground();
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
                    this.drawEntity(this.gridX, this.gridY);
                    break;
                default:
            }

            // // only update indicater when there no grid currently selected
            // if (this.selectedGrid === undefined)
            //     this.updatePointerOnGridIndicator(this.gridX, this.gridY);
            // // make it still count as clicked if pointer didn't move too much. 
            // if (Math.abs(pointer.x - pointer.prevPosition.x) >= 1 || Math.abs(pointer.y - pointer.prevPosition.y) >= 1 ) {
            //     this.click = false;
            // }
            // if (!pointer.isDown) return;
        

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
                        this.getOccupiedLand(this.gridX, this.gridY);
                        this.addStructureToWorld();
                        break;
                default:
            }

        })
        this.input.on("pointerup", (pointer) => {
            this.isPointerDown = false;
        //     console.log(this.selectedGrid)
        //     if (!this.click) 
        //         return;
        //     this.gridX = Math.floor((pointer.x + this.camera.worldView.x + 16) / 32)
        //     this.gridY = Math.floor((pointer.y + this.camera.worldView.y + 16) / 32)
        //     this.updatePointerOnGridIndicator(this.gridX, this.gridY);

            
        //     this.isPlacement = this.selectedItemIndex !== undefined ? true : false;
        //     if (this.selectedGrid !== undefined) {
        //         this.updateLand(this.selectedGrid.x, this.selectedGrid.y, !this.isPlacement);
        //     }
        //     if (this.isCommandExecutable() === true){
        //         this.updateLand(this.gridX, this.gridY, this.isPlacement);
        //         this.showConfirmationContainer();
        //     }

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
                this.action = "placement";

                let centerX = this.camera.worldView.x + this.camera.width / 2;
                let centerY = this.camera.worldView.y + this.camera.height / 2;

                let offsetX = centerX % 32;
                let offsetY = centerY % 32;

                centerX -= offsetX;
                centerY -= offsetY;

                this.drawEntity(centerX / 32, centerY / 32);
                
            })

            item.appendChild(itemImg);
            this.constructionItemList.appendChild(item);
        })

    }

    drawEntity(gridX, gridY) {
        let name = "house";
        this.house?.destroy();
        this.gridEntity?.destroy();

        let spriteOffsetX = ENTITY_DATA[name].spriteOffsetX;
        let spriteOffsetY = ENTITY_DATA[name].spriteOffsetY;

        this.getOccupiedLand(gridX, gridY);
        let color = this.placeable ? 0x00ff00 : 0xff0000;
        // let spriteX = 
        this.house = this.add.sprite(gridX * 32 + spriteOffsetX, gridY * 32 + spriteOffsetY, "construction", name);

        let x = this.house.x + ENTITY_DATA[name].colliderOffsetX + ENTITY_DATA[name].offsetX;
        let y = this.house.y + ENTITY_DATA[name].colliderOffsetY + ENTITY_DATA[name].offsetY;
        let width = ENTITY_DATA[name].width * 32;
        let height = ENTITY_DATA[name].height * 32;
        this.gridEntity = this.add.grid(x, y, width, height, 32, 32, color, 0.5, 0xbfbfbf, 0 );

    }

    addStructureToWorld() {
        this.worldManager.map[`${this.gridX},${this.gridY}`]["entities"] = ["house"];
        this.worldManager.saveMapToLocalStorage();
    }

    

    getOccupiedLand(gridX, gridY) {
        let name = "house";
        let width = ENTITY_DATA[name].width;
        let height = ENTITY_DATA[name].height;

        let occupiedLands = []

        let left = gridX - (Math.ceil(width / 2) - 1);
        let top = gridY;

        this.placeable = true;


        for (let x = left; x < left + width; x++) {
            for (let y = top; y < top + height; y++) {
                occupiedLands.push(`${x},${y}`)
                // Land does not exist
                console.log(!this.worldManager.map[`${x},${y}`])
                if (!this.worldManager.map[`${x},${y}`]?.isLand) {
                    this.placeable = false;
                    continue;
                }
                // Entity on land
                this.worldManager.map[`${x},${y}`]?.entities?.forEach((entity) => {
                    console.log(entity)
                    this.placeable = false;
                })
            }
        }
        
        console.log(occupiedLands);
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
        if (this.selectedItemIndex !== undefined) {
            this.constructionItemList.childNodes[this.selectedItemIndex]?.classList.remove("construction-item-selected");
        }

        this.hideGridBackground();
    }

    showGridBackground() {
        // x, y, width, height, cellWidth, cellHeight, fillColor, fillAlpha, outlineFillColor, outlineFillAlpha
        this.gridBackground = this.add.grid(-16, -16, 2048, 2048, 32, 32, 0x00ff00, 0, 0xbfbfbf, 0.7 );
    }

    hideGridBackground() {
        this.gridBackground?.destroy();
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
            this.worldManager.saveMapToLocalStorage();
            this.hideConfirmationContainer();
        })

        this.CancelBtn.addEventListener("pointerdown", () => {
            console.log(this.selectedGrid)
            this.updateLand(this.selectedGrid.x, this.selectedGrid.y, !this.isPlacement);
            this.hideConfirmationContainer();
        })
    }


    showConfirmationContainer() {
        this.selectedGrid = { x: this.gridX, y: this.gridY };
        this.ConfirmationBtnsContainer.style.display = "flex";
    }

    hideConfirmationContainer() {
        console.log(this.constructionItemList)
        // this.resetSelectedItem();
        this.selectedItemIndex = undefined;
        this.selectedGrid = undefined;
        this.ConfirmationBtnsContainer.style.display = "none";
    }

    update() {

    }


}