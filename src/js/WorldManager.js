import { ITEM_DATA, MAP_DATA, ENTITY_DATA } from "./GameData.js";
import { Astar } from "./Pathfinding.js";
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
        this.resourceCollidersGroup = this.scene.physics.add.group({ immovable: true });
        this.obstacleCollidersGroup = this.scene.physics.add.group({ immovable: true });
        this.collectablesGroup = this.scene.physics.add.group({ immovable: true });
         
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

                if (this.map[`${gridX},${gridY}`] && this.map[`${gridX},${gridY}`].isLand) {
                    this.createLand(gridX, gridY);
                    this.createEntities(gridX, gridY, this.map[`${gridX},${gridY}`].entities);
                    if (this.map[`${gridX},${gridY}`].isHoedLand)
                        this.createHoedLand(gridX, gridY);
                } else {
                    this.createSurroundingLand(gridX, gridY);
                }
            }
        }
        
    }

    saveMapToLocalStorage() {
        localStorage.setItem("map", JSON.stringify(this.map));
    }

    loadMapFromLocalStorage() {
        return JSON.parse(localStorage.getItem("map"));
    }

    createEntities(gridX, gridY, entities) {
        if (!entities)
            return;
        let x = gridX * 32;
        let y = gridY * 32;
        entities.forEach((entity) => {
            if (ENTITY_DATA[entity.name].category === "resource"){
                let resource = new Resource(this.scene, x, y, "resource", entity.name);
            }
            if (ENTITY_DATA[entity.name].category === "structure"){
                // let entityData = ENTITY_DATA[entity];
                // let adjustX = 0;
                // if (entityData.width % 2 === 0) {
                //     adjustX = 16;
                // }
                // let adjustY = 0;
                // if (entityData.height % 2 === 0) {
                //     adjustY = 16;
                // }
                // let x = (gridX - entityData.imageWidth / 2 - entityData.offsetX + entityData.width / 2) * 32 + adjustX; 
                // let y = (gridY + entityData.imageHeight / 2 - entityData.offsetY - entityData.height / 2) * 32 + adjustY;
                // this.house = this.scene.add.sprite(x, y, "construction", entity);
                let structure = new Structure(this.scene, x, y, "construction", entity.name)
        
            }
        })
    }

    createLand(gridX, gridY, landSprite) {
        landSprite = landSprite ?? "land_all";
        let x = gridX * 32;
        let y = gridY * 32;

        // Forest
        if (gridX < -1) {
            // randomize resource in forest
            let entities = [];
            let chance = Math.random();
            if (chance < 0.1) {
                entities = [ { name: "tree" } ];
            } else if (chance < 0.3) {
                entities = [ { name: "rock" } ];
            } else if (chance < 0.5) {
                entities = [ { name: "bush" } ];
            } else {
                entities = [];
            }
            
            landSprite = "land_all";
            this.createEntities(gridX, gridY, entities);
        }

        if (gridX === -1) {
            if (gridY > 1 || gridY < -4) {
                landSprite = "land_l";
            } else {
                landSprite = "land_all"
            }
            if (gridY === 1) {
                landSprite = "land_t_l"
            }
            if (gridY === -4) {
                landSprite = "land_b_l"
            }
        }

        let land = this.scene.add.sprite(x, y, "land", landSprite);
        this.landSpriteGroup[`${gridX},${gridY}`]?.destroy();
        this.landSpriteGroup[`${gridX},${gridY}`] = land;
        land.depth = y - 10000;

        if (landSprite !== "land" && landSprite !== "land_all") {
            let collider = this.scene.physics.add.sprite(x, y)
            this.landCollidersGroup.add(collider);
        }
    }

    createSurroundingLand(gridX, gridY) {
        
        let x = gridX * 32;
        let y = gridY * 32;

        let landSprite = "land";

        let top = `${gridX},${gridY-1}`;
        let tr = `${gridX+1},${gridY-1}`;
        let right = `${gridX+1},${gridY}`;
        let rb = `${gridX+1},${gridY+1}`;
        let bottom = `${gridX},${gridY+1}`;
        let bl = `${gridX-1},${gridY+1}`;
        let left = `${gridX-1},${gridY}`;
        let lt = `${gridX-1},${gridY-1}`;


        // top
        if (this.map[top]?.isLand) {
            landSprite += "_t"
        } 
        // top right
        if (!this.map[top]?.isLand && !this.map[right]?.isLand && this.map[tr]?.isLand) {
            landSprite += "_tr"
        } 
        // right
        if (this.map[right]?.isLand) {
            landSprite += "_r"
        } 
        // right bottom
        if (!this.map[right]?.isLand && !this.map[bottom]?.isLand && this.map[rb]?.isLand) {
            landSprite += "_rb"
        } 
        // bottom
        if (this.map[bottom]?.isLand) {
            landSprite += "_b"
        } 
        // bottom left
        if (!this.map[bottom]?.isLand && !this.map[left]?.isLand && this.map[bl]?.isLand) {
            landSprite += "_bl"
        } 
        // left
        if (this.map[left]?.isLand) {
            landSprite += "_l"
        } 
        // left top
        if (!this.map[left]?.isLand && !this.map[top]?.isLand && this.map[lt]?.isLand) {
            landSprite += "_lt"
        } 

        // Check if current grid is a land
        if (this.map[`${gridX},${gridY}`]?.isLand) {
            return;
        }

        this.createLand(gridX, gridY, landSprite);
    }

    
    createHoedLand(gridX, gridY) {
        let x = gridX * 32;
        let y = gridY * 32;

        let hoedLandSpriteName = "hoed";

        let top = `${gridX},${gridY-1}`;
        let right = `${gridX+1},${gridY}`;
        let bottom = `${gridX},${gridY+1}`;
        let left = `${gridX-1},${gridY}`;

        // top
        if (this.map[top]?.isHoedLand) {
            hoedLandSpriteName += "_top"
        } 
        // right
        if (this.map[right]?.isHoedLand) {
            hoedLandSpriteName += "_right"
        } 
        // bottom
        if (this.map[bottom]?.isHoedLand) {
            hoedLandSpriteName += "_bottom"
        } 
        // left
        if (this.map[left]?.isHoedLand) {
            hoedLandSpriteName += "_left"
        } 

        let hoedLandSprite = this.scene.add.sprite(x, y, "land", hoedLandSpriteName);
        hoedLandSprite.setDepth(hoedLandSprite.y - 1000);
        
        this.hoedLandSpriteGroup[`${gridX},${gridY}`] = hoedLandSprite;
    }


    hoeLand(grid) {
        this.map[`${grid.x},${grid.y}`].isHoedLand = true;
        this.saveMapToLocalStorage();
        this.createHoedLand(grid.x, grid.y);

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
        this.createHoedLand(gridX, gridY);
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


    update() {
        for (const [key, crop] of Object.entries(this.growingCrops)) {
            crop.update();
        }
    }
    
}