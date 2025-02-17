import Character from "./Character.js";
import { ENTITY_DATA, ITEM_ON_USE_DATA } from "../../GameData.js";

export default class Ally extends Character {
    constructor(scene, name, id, x, y, texture, frame) {
        let isAlly = true;
        super(scene, name, id, x, y, texture, frame, isAlly);


        this.scene.collisionController.allyGroup.add(this);
        this.showHealthBar = true;
        
    }

    useItem(itemName) {
        
        console.log("useItem: ", itemName)
        console.log(ENTITY_DATA[itemName])
        console.log(ITEM_ON_USE_DATA[itemName] )

        let deltaHunger = ITEM_ON_USE_DATA[itemName]?.hunger ?? 0
        let deltaThirst = ITEM_ON_USE_DATA[itemName]?.thirst ?? 0
        let deltaHp = ITEM_ON_USE_DATA[itemName]?.hp ?? 0

        this.stats.hunger += deltaHunger;
        if (this.stats.hunger >= this.stats.maxHunger) {
            this.stats.hunger = this.stats.maxHunger;
        }

        this.stats.thirst += deltaThirst;
        if (this.stats.thirst >= this.stats.maxThirst) {
            this.stats.thirst = this.stats.maxThirst;
        }
        
        this.stats.hp += deltaHp;
        if (this.stats.hp >= this.stats.maxHp) {
            this.stats.hp = this.stats.maxHp;
        }

        this.scene.player.renderStatsDisplay();
    }

    showGeneralInfoHUD() {
        super.showGeneralInfoHUD();
    }

    destroySelf() {
        this.scene.collisionController.allyGroup.remove(this);
        super.destroySelf();
    }
    
    update(time, delta) {
        super.update(time, delta);
        
        if (!this.body) 
            return;
        

    }
}