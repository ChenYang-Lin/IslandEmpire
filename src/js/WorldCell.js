import Resource from "./entity/Resource.js";
import Structure from "./entity/Structure.js";
import { ENTITY_DATA } from "./GameData.js";


export default class WorldCell {
    constructor(cellX, cellY, cellData, worldManager) {
        this.cellX = cellX;
        this.cellY = cellY;
        this.cellData = cellData;
        this.worldManager = worldManager;
        this.map = this.worldManager.map;

        this.isLand = cellData?.isLand ?? false;
        this.entities = cellData?.entities ?? null;
        this.isHoed = cellData?.isHoedLand;


        this.initCell();
    }

    initCell() {
        this.x = this.cellX * 32;
        this.y = this.cellY * 32;

        this.updateLand();
        this.createEntities();
    }

    updateLand() {
        // Check if current grid cell is a land
        if (this.isLand) {
            this.createLand("land_all");
            if (this.isHoed) {
                this.createHoedLand();
            }
            return;
        }


        let landSprite = "land";

        let top = `${this.cellX},${this.cellY-1}`;
        let tr = `${this.cellX+1},${this.cellY-1}`;
        let right = `${this.cellX+1},${this.cellY}`;
        let rb = `${this.cellX+1},${this.cellY+1}`;
        let bottom = `${this.cellX},${this.cellY+1}`;
        let bl = `${this.cellX-1},${this.cellY+1}`;
        let left = `${this.cellX-1},${this.cellY}`;
        let lt = `${this.cellX-1},${this.cellY-1}`;

        

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

        this.createLand(landSprite);
    }

    createLand(landSprite) {
        landSprite = landSprite ?? "land_all";

        let land = this.worldManager.scene.add.sprite(this.x, this.y, "land", landSprite);
        this.worldManager.landSpriteGroup[`${this.cellX},${this.cellY}`]?.destroy();
        this.worldManager.landSpriteGroup[`${this.cellX},${this.cellY}`] = land;
        land.depth = this.y - 10000;

        if (landSprite !== "land" && landSprite !== "land_all") {
            let collider = this.worldManager.scene.physics.add.sprite(this.x, this.y)
            this.worldManager.landCollidersGroup.add(collider);
        }
    }


    createHoedLand() {
        let hoedLandSpriteName = "hoed";

        let top = `${this.cellX},${this.cellY-1}`;
        let right = `${this.cellX+1},${this.cellY}`;
        let bottom = `${this.cellX},${this.cellY+1}`;
        let left = `${this.cellX-1},${this.cellY}`;

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

        let hoedLandSprite = this.worldManager.scene.add.sprite(this.x, this.y, "land", hoedLandSpriteName);
        hoedLandSprite.setDepth(hoedLandSprite.y - 1000);
        
        this.worldManager.hoedLandSpriteGroup[`${this.cellX},${this.cellY}`] = hoedLandSprite;
    }

    createEntities() {
        if (!this.entities) 
            return;
        
        this.entities.forEach((entity) => {
            if (ENTITY_DATA[entity.name].category === "resource") {
                let resource = new Resource(this.worldManager.scene, this.x, this.y, "resource", entity.name);
            }
            if (ENTITY_DATA[entity.name].category === "structure"){
                let structure = new Structure(this.worldManager.scene, this.x, this.y, "construction", entity.name)
            }
        })
    }

    updateCell() {
        
    }
}