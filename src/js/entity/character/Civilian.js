import { ENTITY_DATA, ENTITY_SPRITE_TABLE, ENTITY_TABLE } from "../../GameData.js"
import Ally from "./Ally.js";


export default class Civilian extends Ally {
    constructor(scene, name, x, y, texture, frame) {
        super(scene, name, x, y, "civilian", "civilian_idle_left");
        
        this.speed = 32;

        this.storageBag = [];
        this.storageBagCapacity = 6;


        if (this.scene.currentMap === "island") {
            this.tempInterval = setInterval(() => {
                if (Math.random() < 0.05) {
                    console.log(this.name, "hoe")
                    this.animationController.hoe();
                }
                if (Math.random() < 0.05) {
                    console.log(this.name, "sow")
                    this.animationController.sow("potato_seed");
                }
            }, 2000);
        }
    }

    showGeneralInfoHUD() {
        super.showGeneralInfoHUD();

        
        let storageBagContainer = document.createElement("div");
        storageBagContainer.setAttribute("id", "entity-storage-bag-container");
        
        let storageBagList = document.createElement("div");
        storageBagList.setAttribute("id", "entity-storage-bag-list");

        for (let i = 0; i < this.storageBagCapacity; i++) {

            let element = document.createElement("div");
            element.classList.add("entity-storage-bag-element");
            
            if (this.storageBag[i]) {
                let img = document.createElement("img");
                img.classList.add("entity-storage-bag-element-img");
                let texutre = ENTITY_SPRITE_TABLE[this.storageBag[i]].texture;
                let frame = ENTITY_SPRITE_TABLE[this.storageBag[i]].frame;
                img.src = this.scene.sys.game.textures.getBase64(texutre, frame);
                
                element.appendChild(img);
            }
            storageBagList.appendChild(element);
        }

        storageBagContainer.appendChild(storageBagList);
        this.entityGeneralInfoList.appendChild(storageBagContainer); // htrml: "id", "entity-general-info-list"
    }

    attemptHarvestCrop() {
        if (this.storageBag.length >= this.storageBagCapacity) 
            return;

        let crop = this.scene.worldManager.growingCrops[`${this.onGrid.x},${this.onGrid.y}`]
        if (crop) {
            crop.onHarvest(this);
        }
    }
 
    destroySelf() {
        clearInterval(this.tempInterval);
        super.destroySelf();
    }
    


    update(time, delta) {
        super.update(time, delta);
        // return update if entity destroyed.
        if (!this.body) 
            return;
        
        if (this.scene.player.characterOnControl === this) 
            return;
        
        this.attemptHarvestCrop();
        
        this.moveRandomly(time, delta);
    }
}