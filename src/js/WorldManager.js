import { ITEM_DATA, MAP_DATA, ENTITY_DATA } from "./GameData.js";
import { Astar } from "./Pathfinding.js";
import WorldCell from "./WorldCell.js";
import Crop from "./entity/Crop.js";
import Resource from "./entity/Resource.js";
import Structure from "./entity/Structure.js";


export default class WorldManager {
    constructor(scene) {
        this.scene = scene;

        
        this.landSize = 0;
        this.soil = 10;
        this.map;
        this.currMap = "island";

        // Pathfinding
        this.astar = new Astar();

        // Collider Groups
        this.landSpriteGroup = {};
        this.landCollidersGroup = this.scene.physics.add.group({ immovable: true });
        this.obstacleCollidersGroup = this.scene.physics.add.group({ immovable: true });
        this.collectablesGroup = this.scene.physics.add.group({ immovable: true });
        this.resourceCollidersGroup = this.scene.physics.add.group({ immovable: true });
        this.transparentHitboxGroup = this.scene.physics.add.group({ immovable: true });
        this.interactionHitboxGroup = this.scene.physics.add.group({ immovable: true });
         
        this.worldCells = {};
        this.hoedLandSpriteGroup = {};
        this.growingCrops = {};

        if (localStorage.getItem("mapData")) {
            this.mapData = this.loadMapFromLocalStorage();
        } else {
            this.mapData = MAP_DATA;
            this.saveMapToLocalStorage();
        }
    }



    initWorld(currMap) {
        this.currMap = currMap;
        if (!currMap) {
            this.currMap = "island"
        } 
        this.map = this.mapData[this.currMap];
        switch(this.currMap) {
            case "island": 
                for (let gridY = -30; gridY < 30; gridY++) {
                    for (let gridX = -30; gridX < 30; gridX++) {
                        let worldCell = new WorldCell(gridX, gridY, this.map[`${gridX},${gridY}`], this);
                        this.worldCells[`${gridX},${gridY}`] = worldCell;
                        let crop = this.map[`${gridX},${gridY}`]?.crop;
                        if (crop) {
                            this.renderCrop(crop.cellX, crop.cellY, crop.cropGrowName, crop.sowingTime);
                        }
                    }
                }
            break;
            case "home": 
                for (let gridY = -5; gridY < 5; gridY++) {
                    for (let gridX = -5; gridX < 5; gridX++) {
                        let worldCell = new WorldCell(gridX, gridY, this.map[`${gridX},${gridY}`], this);
                        this.worldCells[`${gridX},${gridY}`] = worldCell;
                    }
                }
            break;
            case "infinite-forest":
                for (let x = -30; x < 30; x++) {
                    for (let y = -30; y < 30; y++) {

                        let possibleEntity = [[{ name: "tree"}], [{ name: "rock"}], [{ name: "bush"}]];
                        let chosenEntity = possibleEntity[Math.floor(Math.random() * possibleEntity.length)]
                        if (Math.random() < 0.7) {
                            chosenEntity = undefined;
                        }
                        if ((x < 5 && x > -5) && (y < 5 && y > -5)) {
                            chosenEntity = undefined
                        }
                        if (x === 0 && y === 0 ) {
                            chosenEntity = [ { name: "portal-island"} ]
                        }
                        let cellData = { isLand: true, entities: chosenEntity, };
                        let worldCell = new WorldCell(x, y, cellData, this);
                        this.worldCells[`${x},${y}`] = worldCell;
                    }
                }
            break;
        }
        
    }

    updateLandOnWorldCell(cellX, cellY, isLand) {

        console.log(this.map[`${cellX},${cellX}`])
        // if current cell is land, remove land and add soil to inventory
        if (this.map[`${cellX},${cellY}`]?.isLand) {
            console.log("remove land")
            this.map[`${cellX},${cellY}`].isLand = isLand;
            this.soil++;
            this.landSize--;
        
        // if current cell is not land, add land if there is soil in inventory
        } else {
            if (this.soil <= 0) 
                return;
            console.log("add land")
            this.map[`${cellX},${cellY}`] = { 
                isLand: isLand,
                entities: [],
            };
            this.soil--;
            this.landSize++;
        }
        this.saveMapToLocalStorage();

        // update quantity text of soil
        this.scene.updateSoilQuantityText();
        
        this.worldCells[`${cellX},${cellY}`].isLand = isLand;


        this.worldCells[`${cellX-1},${cellY-1}`].updateLand();
        this.worldCells[`${cellX-1},${cellY  }`].updateLand();
        this.worldCells[`${cellX-1},${cellY+1}`].updateLand();
        this.worldCells[`${cellX  },${cellY-1}`].updateLand();
        this.worldCells[`${cellX  },${cellY  }`].updateLand();
        this.worldCells[`${cellX  },${cellY+1}`].updateLand();
        this.worldCells[`${cellX+1},${cellY-1}`].updateLand();
        this.worldCells[`${cellX+1},${cellY  }`].updateLand();
        this.worldCells[`${cellX+1},${cellY+1}`].updateLand();
    }


    renderCrop(cellX, cellY, cropGrowName, sowingTime) {
        this.growingCrops[`${cellX},${cellY}`] = new Crop(this.scene, cellX * 32, cellY * 32, cropGrowName, sowingTime);
    }

    hoeLand(grid) {
        this.map[`${grid.x},${grid.y}`].isHoedLand = true;
        this.saveMapToLocalStorage();
        this.worldCells[`${grid.x},${grid.y}`].createHoedLand();
        

        // Update surrounding hoed lands
        this.updateSurroundingHoedLand(grid.x, grid.y + 1)
        this.updateSurroundingHoedLand(grid.x, grid.y - 1)
        this.updateSurroundingHoedLand(grid.x + 1, grid.y)
        this.updateSurroundingHoedLand(grid.x - 1, grid.y)
    }
    updateSurroundingHoedLand(gridX, gridY) {
        if (!this.map[`${gridX},${gridY}`]?.isHoedLand)
            return;
        this.hoedLandSpriteGroup[`${gridX},${gridY}`].destroy();
        this.worldCells[`${gridX},${gridY}`].createHoedLand();
    }

    sowingSeedOnLand(grid, seedName) {
        let cellX = grid.x;
        let cellY = grid.y;
        let cropGrowName = ITEM_DATA[seedName].crop_grow;
        let sowingTime = Date.now();
        this.map[`${grid.x},${grid.y}`].crop = {
            cellX,
            cellY,
            cropGrowName,
            sowingTime,
        };
        this.renderCrop(cellX, cellY, cropGrowName, sowingTime);
        this.saveMapToLocalStorage();
     }

    isCellCollidable(x, y) {
        let currCellData = this.map[`${x},${y}`];
        if (!currCellData?.isLand) {
            return true;
        }
        if (currCellData?.entities.length <= 0) {
            return false;
        }
        
        let collidable = false;
        currCellData.entities.forEach((entity) => {
            if (entity.collidable) {
                collidable = true;
            }
            if (entity.name && ENTITY_DATA[entity.name].collidable) {
                collidable = true;
            }
        })
        return collidable;
    }

    saveMapToLocalStorage() {
        localStorage.setItem("landSize", this.landSize.toString());
        localStorage.setItem("soil", this.soil.toString());
        localStorage.setItem("mapData", JSON.stringify(this.mapData));
    }

    loadMapFromLocalStorage() {
        this.landSize = parseInt(localStorage.getItem("landSize"), 10);
        this.soil = parseInt(localStorage.getItem("soil"), 10);
        return JSON.parse(localStorage.getItem("mapData"));
    }

    update() {
        for (const [key, crop] of Object.entries(this.growingCrops)) {
            crop.update();
        }
    }
    
}