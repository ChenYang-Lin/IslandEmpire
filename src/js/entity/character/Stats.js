import { STATS_TABLE } from "../../GameData.js";


export default class Stats {
    constructor(scene, entity) {
        this.scene = scene;
        this.entity = entity;

        this.levelConstant = 0.04;

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
                    // Exp
                    case "exp":
                        this.exp = savedStats.exp;
                        break;
                    case "ascend":
                        this.ascend = savedStats.ascend;
                        break;
                    default:
                }
            })
        } else {
            this.initStats();
        }

        // this.ascend = 4;
        // this.exp = 2920060;
                   

    }

    initStats() {
        let statsTable = STATS_TABLE[this.entity.name];
        if (!statsTable)
            return;

        let savedData = {};
        savedData["exp"] = 0;
        this.exp = 0;
        savedData["ascend"] = 0;
        this.ascend = 0;
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
        if (this.scene.entityList && this.scene.entityList[this.entity.id]) {
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

        // HP bar
        if (this.hp !== undefined && this.hp !== null) {
            let hpDiv = document.createElement("div");
            hpDiv.setAttribute("id", "entity-general-info-hp");

            let hpBoxDiv = document.createElement("div");
            hpBoxDiv.setAttribute("id", "entity-general-info-hp-box");
            let hpPercentageDiv = document.createElement("div");
            hpPercentageDiv.setAttribute("id", "entity-general-info-hp-percentage");
            
            let hpBarDiv = document.createElement("div");
            hpBarDiv.setAttribute("id", "entity-general-info-hp-bar");

            if (this.hp <= 0) {
                this.hpPercentage = 0;
            } else {
                this.hpPercentage = this.hp / this.maxHP;
            }
            hpPercentageDiv.style.width = `calc(${this.hpPercentage * 100}% - 4px)`;

            hpBarDiv.appendChild(hpBoxDiv);
            hpBarDiv.appendChild(hpPercentageDiv);
            hpDiv.appendChild(hpBarDiv);
            this.entity.entityGeneralInfoList.appendChild(hpDiv);
        }


        // Hunger Thirst
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

    getLevel() { 
        // level = constant * sqrt(exp);
        // exp = (level / constant)^2

        let level = Math.floor(this.levelConstant * Math.sqrt(this.exp));

        if (this.exp === this.getExp(level + 1)) {
            level++;
        }

        if (this.ascend === 0 && level >= 19) {
            level = 19
        } else if (this.ascend === 1 && level >= 39) {
            level = 39
        } else if (this.ascend === 2 && level >= 49) {
            level = 49
        } else if (this.ascend === 3 && level >= 59) {
            level = 59
        } else if (this.ascend === 4 && level >= 69) {
            level = 69
        } else if (this.ascend === 5 && level >= 79) {
            level = 79
        } else if (this.ascend === 6 && level >= 89) {
            level = 89
        } 

        return level + 1;
    }

    getExp(level) {
        return Math.floor(Math.pow(level / this.levelConstant, 2));
    }

    getCurrLevelExpProgress() { 
        let currLevel = this.getLevel() - 1; // level start at 1;
        let allCurrLevelExpRequirement = this.getExp(currLevel);
        return this.exp - allCurrLevelExpRequirement;
    }

    getNextLevelExpRequirement() { 
        let currLevel = this.getLevel() - 1; // level start at 1;
        let allCurrLevelExpRequirement = this.getExp(currLevel);
        let allNextLevelExpRequirement = this.getExp(currLevel+1);
   
        return allNextLevelExpRequirement - allCurrLevelExpRequirement;
    }

    testEveryLevelExpExpRequirement() {
        let prev = 0;
        for (let i = 1; i < 60; i++) {
            let all = this.getExp(i - 1)
            let curr = all - prev;
            prev = all;
            console.log("level " +i + ": " + curr, all)
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