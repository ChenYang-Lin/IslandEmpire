import { ENTITY_DATA } from "./GameData.js";
import Resource from "./Resource.js";


export default class GameManager {
    constructor(scene) {
        this.scene = scene;

        this.scene.landCollidersGroup = this.scene.physics.add.group({ immovable: true });
        this.scene.resourceCollidersGroup = this.scene.physics.add.group({ immovable: true });
        this.scene.dropsCollidersGroup = this.scene.physics.add.group({ immovable: true });

        this.executedGrids = [];

        this.map = {
            "0,0": {
                isLand: true,
                entities: [
                    "tree",
                ],
            },
            "0,1": {
                isLand: true,
                entities: [
                    
                ],
            },
            "0,2": {
                isLand: true,
                entities: [

                ],
            },
            "0,3": {
                isLand: true,
                entities: [

                ],
            },
            "1,0": {
                isLand: true,
                entities: [

                ],
            },
            "1,1": {
                isLand: true,
                entities: [

                ],
            },
            "1,2": {
                isLand: true,
                entities: [

                ],
            },
            "1,3": {
                isLand: true,
                entities: [

                ],
            },
            "2,0": {
                isLand: true,
                entities: [
                    "rock",
                ],
            },
            "2,1": {
                isLand: true,
                entities: [

                ],
            },
            "2,2": {
                isLand: true,
                entities: [

                ],
            },
            "2,3": {
                isLand: true,
                entities: [

                ],
            },
            "3,0": {
                isLand: true,
                entities: [
                    
                ],
            },
            "3,1": {
                isLand: true,
                entities: [

                ],
            },
            "3,2": {
                isLand: true,
                entities: [

                ],
            },
            "3,3": {
                isLand: true,
                entities: [

                ],
            },
        }
    }

    initWorld() {
        // for (let i = 0; i < 20; i++) {
        //     for (let j = 0; j < 20; j++) {

        //     }
        // }
        for (const [key, value] of Object.entries(this.map)) {
            // console.log(`${key}: ${value}`)


            let x = key.split(",")[0] * 32;
            let y = key.split(",")[1] * 32;

            this.createLand(x, y);
            this.createEntities(x, y, value.entities);
        }
    }

    createEntities(x, y, entities) {
        entities.forEach((entity) => {
            if (ENTITY_DATA[entity].type === "resource"){
                let resource = new Resource(this.scene, x, y, "resource", entity);
            }
        })
    }

    createLand(x, y) {
        let gridX = x / 32;
        let gridY = y / 32;

        if (!this.map[`${gridX},${gridY}`]?.isLand) {
            return;
        }

        let landSprite = "land";

        let land = this.scene.add.sprite(x, y, "land", landSprite);
        land.depth = y - 10000;

        this.createSurroundingLand(gridX-1, gridY-1);
        this.createSurroundingLand(gridX, gridY-1);
        this.createSurroundingLand(gridX+1, gridY-1);
        this.createSurroundingLand(gridX-1, gridY);
        this.createSurroundingLand(gridX+1, gridY);
        this.createSurroundingLand(gridX-1, gridY+1);
        this.createSurroundingLand(gridX, gridY+1);
        this.createSurroundingLand(gridX+1, gridY+1);

    }

    createSurroundingLand(gridX, gridY) {
        // Skip if current grid is land or if it has been executed by other land
        if ((this.map[`${gridX},${gridY}`] && this.map[`${gridX},${gridY}`].isLand) || this.executedGrids.includes(`${gridX},${gridY}`)) {
            return;
        }
        
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

        this.executedGrids.push(`${gridX},${gridY}`);


        let land = this.scene.add.sprite(x, y, "land", landSprite);
        land.depth = y - 10000;
        
        let collider = this.scene.physics.add.sprite(x, y)
        this.scene.landCollidersGroup.add(collider);
    }

    
}