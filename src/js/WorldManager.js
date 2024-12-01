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

        // Pathfinding
        this.astar = new Astar();

        // Collider Groups
        this.landSpriteGroup = {};
        this.landCollidersGroup = this.scene.physics.add.group({ immovable: true });
        this.obstacleCollidersGroup = this.scene.physics.add.group({ immovable: true });
        this.collectablesGroup = this.scene.physics.add.group({ immovable: true });
        this.resourceCollidersGroup = this.scene.physics.add.group({ immovable: true });
        this.transparentHitboxGroup = this.scene.physics.add.group({ immovable: true });
         
        this.worldCells = {};
        this.hoedLandSpriteGroup = {};
        this.growingCrops = {};

        if (localStorage.getItem("map")) {
            this.map = this.loadMapFromLocalStorage();
        } else {
            this.map = MAP_DATA;
            this.saveMapToLocalStorage();
        }
    }



    initWorld(map) {
        if (!map) {
            map = "island"
        }
        switch(map) {
            case "island": 
                for (let gridY = -30; gridY < 30; gridY++) {
                    for (let gridX = -30; gridX < 30; gridX++) {
                        let worldCell = new WorldCell(gridX, gridY, this.map[`${gridX},${gridY}`], this);
                        this.worldCells[`${gridX},${gridY}`] = worldCell;
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
        let x = grid.x * 32;
        let y = grid.y * 32;
        let cropGrowName = ITEM_DATA[seedName].crop_grow;
        let sowingTime = Date.now();
        this.map[`${grid.x},${grid.y}`].crop = {
            x,
            y,
            cropGrowName,
            sowingTime,
        };
        this.growingCrops[`${grid.x},${grid.y}`] = new Crop(this.scene, x, y, cropGrowName, sowingTime);
    }

    saveMapToLocalStorage() {
        localStorage.setItem("landSize", this.landSize.toString());
        localStorage.setItem("soil", this.soil.toString());
        localStorage.setItem("map", JSON.stringify(this.map));
    }

    loadMapFromLocalStorage() {
        this.landSize = parseInt(localStorage.getItem("landSize"), 10);
        this.soil = parseInt(localStorage.getItem("soil"), 10);
        return JSON.parse(localStorage.getItem("map"));
    }

    update() {
        for (const [key, crop] of Object.entries(this.growingCrops)) {
            crop.update();
        }
    }
    
}