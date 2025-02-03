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

    renderStats() {
        // console.log(this.atkDmg)
        // console.log(this.speed)
        // console.log(this.maxHP)
        // console.log(this.hunger)
        // console.log(this.maxThirst)

        let circularProgressContainer = document.createElement("div");
        circularProgressContainer.setAttribute("id", "circular-progress-container");

        // Hunger
        if (this.hunger !== undefined && this.hunger !== null) {
            let hungerProgress = document.createElement("div");
            hungerProgress.setAttribute("id", "hunger-circular-progress");
            hungerProgress.classList.add("circular-progress")

            let hungerProgressValue = document.createElement("div");
            hungerProgressValue.setAttribute("id", "hunger-circular-value");
            hungerProgressValue.classList.add("progress-value");

            let hungerIcon = document.createElement("img");
            hungerIcon.src= "./assets/icons/stats/hunger.png";
            hungerIcon.style.width = "16px";
            hungerIcon.style.height = "16px";

            let degree = this.getDegreeOfCircularProgress(this.hunger, this.maxHunger);


            hungerProgress.style.backgroundImage  = `conic-gradient(#3d3d3d ${degree}deg, orange 0deg)`



            hungerProgressValue.appendChild(hungerIcon);
            hungerProgress.appendChild(hungerProgressValue);
            circularProgressContainer.appendChild(hungerProgress);
        }
        // Thirst
        if (this.thirst !== undefined && this.thirst !== null) {
            let thirstProgress = document.createElement("div");
            thirstProgress.setAttribute("id", "thirst-circular-progress");
            thirstProgress.classList.add("circular-progress")

            let thirstProgressValue = document.createElement("div");
            thirstProgressValue.setAttribute("id", "thirst-circular-value");
            thirstProgressValue.classList.add("progress-value");

            let thirstIcon = document.createElement("img");
            thirstIcon.src= "./assets/icons/stats/thirst.png";
            thirstIcon.style.width = "16px";
            thirstIcon.style.height = "16px";

            let degree = this.getDegreeOfCircularProgress(this.thirst, this.maxThirst);

            thirstProgress.style.backgroundImage  = `conic-gradient(#3d3d3d ${degree}deg, blue 0deg)`


            thirstProgressValue.appendChild(thirstIcon);
            thirstProgress.appendChild(thirstProgressValue);
            circularProgressContainer.appendChild(thirstProgress);
        }

        this.entity.entityGeneralInfoList.appendChild(circularProgressContainer);
    }

    getDegreeOfCircularProgress(curr, max) {
        let percentage = curr / max;
        let degree = percentage * 360;
        degree = 360 - degree;
        return degree;
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