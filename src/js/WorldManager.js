import { ITEM_DATA, MAP_DATA, ENTITY_DATA } from "./GameData.js";
import { Astar } from "./Pathfinding.js";
import WorldCell from "./WorldCell.js";
import Crop from "./entity/Crop.js";
import Resource from "./entity/Resource.js";
import Structure from "./entity/Structure.js";


export default class WorldManager {
    constructor(scene) {
        this.scene = scene;

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



    initWorld() {
        for (let gridY = -30; gridY < 30; gridY++) {
            for (let gridX = -30; gridX < 30; gridX++) {
                let worldCell = new WorldCell(gridX, gridY, this.map[`${gridX},${gridY}`], this);
                this.worldCells[`${gridX},${gridY}`] = worldCell;
            }
        }
        
    }

    updateLandOnWorldCell(cellX, cellY, isLand) {

        console.log(this.map[`${cellX},${cellX}`])
        if (this.map[`${cellX},${cellY}`]?.isLand) {
            this.map[`${cellX},${cellY}`].isLand = isLand;
        } else {
            this.map[`${cellX},${cellY}`] = { 
                isLand: isLand,
                entities: [],
            };
        }
        this.saveMapToLocalStorage();
        
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
        localStorage.setItem("map", JSON.stringify(this.map));
    }

    loadMapFromLocalStorage() {
        return JSON.parse(localStorage.getItem("map"));
    }

    update() {
        for (const [key, crop] of Object.entries(this.growingCrops)) {
            crop.update();
        }
    }
    
}