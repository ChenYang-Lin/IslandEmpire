import { ENTITY_DATA, MAP_DATA } from "./GameData.js";
import Crop from "./entity/Crop.js";
import Resource from "./entity/Resource.js";


export default class WorldManager {
    constructor(scene) {
        this.scene = scene;

        // Collider Groups
        this.landCollidersGroup = this.scene.physics.add.group({ immovable: true });
        this.landSpriteGroup = {};
        this.resourceCollidersGroup = this.scene.physics.add.group({ immovable: true });
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
        for (let gridY = -20; gridY < 20; gridY++) {
            for (let gridX = -20; gridX < 20; gridX++) {
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
            if (ENTITY_DATA[entity].category === "resource"){
                let resource = new Resource(this.scene, x, y, "resource", entity);
            }
        })
    }

    createLand(gridX, gridY) {
        let x = gridX * 32;
        let y = gridY * 32;

        if (!this.map[`${gridX},${gridY}`]?.isLand) {
            return;
        }

        let landSprite = "land_all";

        let land = this.scene.add.sprite(x, y, "land", landSprite);
        this.landSpriteGroup[`${gridX},${gridY}`] = land;
        land.depth = y - 10000;
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

        let land = this.scene.add.sprite(x, y, "land", landSprite);
        this.landSpriteGroup[`${gridX},${gridY}`]?.destroy();
        this.landSpriteGroup[`${gridX},${gridY}`] = land;
        land.depth = y - 10000;
        if (landSprite !== "land" && landSprite !== "land_all") {
            let collider = this.scene.physics.add.sprite(x, y)
            this.landCollidersGroup.add(collider);
        }
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
        hoedLandSprite.depth = y - 10000;
        this.hoedLandSpriteGroup[`${gridX},${gridY}`] = hoedLandSprite;
    }


    hoeLand(grid) {
        this.map[`${grid.x},${grid.y}`].isHoedLand = true;
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
        let cropGrowName = ENTITY_DATA[seedName].crop_grow;
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