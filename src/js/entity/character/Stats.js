import { STATS_TABLE } from "../../GameData.js";


export default class Stats {
    constructor(scene, entity) {
        this.scene = scene;
        this.entity = entity;

        this.lastWorkingTime = Date.now();

        if (this.entity.savedData && this.entity.savedData.savedStats) {
            Object.entries(this.entity.savedData.savedStats).forEach(([key, savedStats]) => {
                switch (key) {
                    case "atkDmg":
                        this.atkDmg = savedStats.atkDmg;
                        break;
                    case "speed":
                        this.speed = savedStats.speed;
                        break;
                    case "maxHP":
                        this.maxHP = savedStats.maxHP;
                        this.hp = savedStats.hp;
                        break;
                    case "maxHunger":
                        this.maxHunger = savedStats.maxHunger;
                        this.hunger = savedStats.hunger;
                        break;
                    case "maxThirst":
                        this.maxThirst = savedStats.maxThirst;
                        this.thirst = savedStats.thirst;
                        break;
                    default:
                }
            })
        } else {
            this.initStats();
        }

    }

    initStats() {
        let statsTable = STATS_TABLE[this.entity.name];
        if (!statsTable)
            return;

        let savedData = {};
        Object.entries(statsTable).forEach(([key, value]) => {
            switch (key) {
                case "atkDmg":
                    this.atkDmg = value;
                    savedData["atkDmg"] = this.atkDmg;
                    break;
                case "speed":
                    this.speed = value;
                    savedData["speed"] = this.speed;
                    break;
                case "maxHP":
                    this.maxHP = value;
                    savedData["maxHP"] = this.maxHP;
                    this.hp = value;
                    savedData["hp"] = this.hp;
                    break;
                case "maxHunger":
                    this.maxHunger = value;
                    savedData["maxHunger"] = this.maxHunger;
                    this.hunger = value;
                    savedData["hunger"] = this.hunger;
                    break;
                case "maxThirst":
                    this.maxThirst = value;
                    savedData["maxThirst"] = this.maxThirst;
                    this.thirst = value;
                    savedData["thirst"] = this.thirst;
                    break;
                default:
            }
        })
        if (this.scene.entityList[this.entity.id]) {
            this.scene.entityList[this.entity.id]["savedData"] = savedData;
            this.scene.saveEntityListToLocalStorage()
        }
    }



    update() {
        if (Date.now() - this.lastWorkingTime > 1 * 1000) {
            if (this.hunger) {
                if (this.hunger >= 0) {
                    this.hunger--;
                    this.lastWorkingTime += 5000;
                } else {
                    // console.log("need food!!!!!!!!!!")
                }
            }
        }
    }

}