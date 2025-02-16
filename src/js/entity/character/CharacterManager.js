import Civilian from "./Civilian.js";
import Soldier from "./Soldier.js";
import Survivor from "./Survivor.js";


export default class CharacterManager {
    constructor(scene) {
        this.scene = scene;

        this.characterGroup = this.scene.physics.add.group();

        this.initCharacterPage();
        
        this.party = [];
        this.partySize = 3;

        this.party = ["survivor", "soldier", "civilian"]
    }

    init() {
        if (this.scene.currentMap === "island") {
            Object.entries(this.scene.entityList).forEach(([key, characterData]) => {
                this.spawnCharacter(characterData);
            });
        } else {
            Object.entries(this.scene.entityList).forEach(([key, characterData]) => {
                if (characterData.id === "survivor")
                    this.spawnCharacter(characterData);
            });
        }
    }

    initCharacterPage() {
        this.characterPage = document.getElementById("character-page-container");
        this.characterPageExitBtn = document.getElementById("character-exit-btn")

        // Character Tab Buttons
        this.infoTabBtn = document.getElementById("character-tab-info")
        this.weaponTabBtn = document.getElementById("character-tab-weapon")
        this.equipmentTabBtn = document.getElementById("character-tab-equipment")
        this.skillTabBtn = document.getElementById("character-tab-skill")

        // Character Section Content
        this.infoDiv = document.getElementById("character-page-info-wrapper")
        this.weaponDiv = document.getElementById("character-page-weapon")
        this.equipmentDiv = document.getElementById("character-page-equipment")
        this.skillDiv = document.getElementById("character-page-skill")

        // Other
        this.levelUpBtn = document.getElementById("character-info-level-btn");

        this.characterPageExitBtn.addEventListener("pointerdown", () => {
            this.closeWindow();
        })

        this.infoTabBtn.addEventListener("pointerdown", () => {
            this.renderCharacterDetails(this.selectedCharacter);
            
        })

        this.weaponTabBtn.addEventListener("pointerdown", () => {
            this.renderCharacterWeapon(this.selectedCharacter);
            this.removeAllTabsHighlight();
            this.weaponTabBtn.classList.add("character-tab-selected");
        });

        this.equipmentTabBtn.addEventListener("pointerdown", () => {
            this.renderCharacterEquipment(this.selectedCharacter);
            this.removeAllTabsHighlight();
            this.equipmentTabBtn.classList.add("character-tab-selected");
        });

        this.skillTabBtn.addEventListener("pointerdown", () => {
            this.renderCharacterSkill(this.selectedCharacter);
            this.removeAllTabsHighlight();
            this.skillTabBtn.classList.add("character-tab-selected");
        });

        // Level up btn
        this.levelUpBtn.addEventListener("pointerdown", () => {
            // if ready ascend
        });
    }

    spawnCharacter(characterData) {
        let character;
        switch (characterData.name) {
            case "survivor":
                character = new Survivor(this.scene, "survivor", characterData.id, 0, 0, "survivor", "survivor_idle_left", characterData.savedData);
                break;
            case "soldier":
                character = new Soldier(this.scene, "soldier", characterData.id, 0, -64, "soldier", "soldier_idle_left", characterData.savedData);
                break;
            case "civilian":
                character = new Civilian(this.scene, "civilian", characterData.id, 0, -64, "civilian", "civilian_idle_left", characterData.savedData);
                break;
            default:

        }
        character.initStats();
        this.characterGroup.add(character);
    }

    obtainedNewCharacter(name) {
        let id = name + "_1"
        if (this.scene.entityList[id]) {
            let counter = 2;
            id = "" + name + "_" + counter;
            while(this.scene.entityList[id]) {
                counter++;
                id = "" + name + "_" + counter;
            }
            console.log(id)
            this.scene.entityList[id] = { id: id, name: name, }
        } else {
            this.scene.entityList[id] = { id: id, name: name, }
        }
        this.scene.saveEntityListToLocalStorage();
        this.spawnCharacter(this.scene.entityList[id])

    }

    getCharacterObject(id) {
        let characterObject;
        this.characterGroup.getChildren().forEach((character) => {
            if (character.id === id) {
                characterObject = character;
            }
        })
        return characterObject;
    }

    getSortedCharacterGroup(characterGroup) {
        return characterGroup;
    }

    // Render Character Page ---------------------------------------------------------------------------------------------------------------------------------------------
    renderCharacterPage() {
        this.sortedCharacterGroup = this.getSortedCharacterGroup(this.characterGroup);

        this.selectedCharacter = this.sortedCharacterGroup.getChildren()[0];
        this.renderCharacterDetails(this.selectedCharacter);
        this.renderCharacterSelectionContainer(this.sortedCharacterGroup);
    }

    renderCharacterSelectionContainer(characterGroup) {
        this.characterSelectionContainer = document.getElementById("character-page-selection-container");
        this.characterSelectionContainer.innerHTML = ``;
        
        characterGroup.getChildren().forEach((character) => {

            let imgWrapper = document.createElement("div");
            imgWrapper.classList.add("character-selection-img-wrapper");

            let characterSelectionImg = document.createElement("img");
            characterSelectionImg.classList.add("character-selection-img");
            characterSelectionImg.src = this.scene.sys.game.textures.getBase64(character.name, `${character.name}_idle_down`);
            characterSelectionImg.addEventListener("pointerdown", () => {
                this.selectedCharacter = this.getCharacterObject(character.id);
                this.renderCharacterDetails(this.selectedCharacter);
            })

            imgWrapper.appendChild(characterSelectionImg)
            this.characterSelectionContainer.appendChild(imgWrapper);
        })
    }


    renderCharacterDetails(character) {
        this.removeAllTabsHighlight();
        this.infoTabBtn.classList.add("character-tab-selected");

        this.hideAllSections();
        this.infoDiv.style.display = "block";
        
        let characterinfoStats = document.getElementById("character-info-stats");

        // Header ------------------------------------------------------
        let typeIcon = document.getElementById("character-type-icon");
        let name = document.getElementById("character-name");
        let professionIcon = document.getElementById("character-profession-icon");
        let professionText = document.getElementById("character-profession-text");

        name.innerHTML = character.id;

        // Experience ------------------------------------------------------
        let ascentContainer = document.getElementById("character-ascend-container")
        let characterLevel =  document.getElementById("character-level")
        let levelBar = document.getElementById("character-level-bar");
        
        // console.log(character.stats.getLevel(), character.stats.getCurrLevelExpProgress(), character.stats.getNextLevelExpRequirement())
        character.stats.testEveryLevelExpExpRequirement();

        ascentContainer.innerHTML = ``;
        let ascend = character.stats.ascend;
        for (let i = 0; i < 6; i++) {
            let ascendImg = document.createElement("img");
            ascendImg.classList.add("ascend-icon");
            ascendImg.src = "./assets/icons/hud/character/ascend-icon.png"
            if (ascend > 0)
                ascendImg.src = "./assets/icons/hud/character/ascend-activated-icon.png"
            ascend--;

            ascentContainer.appendChild(ascendImg);
        }

        characterLevel.innerHTML = `Lv. ${character.stats.getLevel()}`;
        let progress = character.stats.getCurrLevelExpProgress() / character.stats.getNextLevelExpRequirement() * 100
        levelBar.style.width = `${progress}%`

        // Stats ------------------------------------------------------
        characterinfoStats.innerHTML = ``;
        this.characterStatBg = true;
        if (character.stats.maxHP) {
            let statElement = this.renderStatElement("./assets/icons/hud/character/ascend-icon.png", "Health", character.stats.maxHP);
            characterinfoStats.appendChild(statElement);
        }
        if (character.stats.speed) {
            let statElement = this.renderStatElement("./assets/icons/hud/character/ascend-icon.png", "Speed", character.stats.speed);
            characterinfoStats.appendChild(statElement);
        }
        if (character.stats.atkDmg) {
            let statElement = this.renderStatElement("./assets/icons/hud/character/ascend-icon.png", "Attack Damage", character.stats.atkDmg);
            characterinfoStats.appendChild(statElement);
        }
        // if (character.stats.criticalChance) {
        //     let statElement = this.renderStatElement("./assets/icons/hud/character/ascend-icon.png", "Attack Damage", character.stats.atkDmg);
        //     characterinfoStats.appendChild(statElement);
        // }

        // Level up Btn ------------------------------------------------------
        let levelUpBtnText = document.getElementById("character-info-level-btn-text");

        // if level exceed limit change text Ascend
        if (character.stats.getCurrLevelExpProgress() >= character.stats.getNextLevelExpRequirement()) {
            levelUpBtnText.innerHTML = `Ascend`
        }

        // Portrait ----------------------------------------------------------------------
        let portrait = document.getElementById("character-info-portrait");
        portrait.src = this.scene.sys.game.textures.getBase64(character.name, `${character.name}_idle_down`);
    }

    renderStatElement(icon, type, value) {
        let statElement = document.createElement("div");
        statElement.classList.add("character-stat-element");
        if (this.characterStatBg) {
            statElement.classList.add("character-stat-element-bg");
        }
        this.characterStatBg = !this.characterStatBg

        let iconDiv = document.createElement("img");
        iconDiv.classList.add("character-stat-icon");
        iconDiv.src = icon;

        let typeDiv = document.createElement("div");
        typeDiv.classList.add("character-stat-type");
        typeDiv.innerHTML = type;

        let valueDiv = document.createElement("div");
        valueDiv.classList.add("character-stat-value");
        valueDiv.innerHTML = value;

        statElement.appendChild(iconDiv);
        statElement.appendChild(typeDiv);
        statElement.appendChild(valueDiv);
        return statElement;
    }

    renderCharacterWeapon(character) {
        this.hideAllSections();
        this.weaponDiv.style.display = "block";

        this.weaponDiv.innerHTML = "weaponDiv"
    }

    renderCharacterEquipment(character) {
        this.hideAllSections();
        this.equipmentDiv.style.display = "block";

        this.equipmentDiv.innerHTML = "equipmentDiv"
    }

    renderCharacterSkill(character) {
        this.hideAllSections();
        this.skillDiv.style.display = "block";

        this.skillDiv.innerHTML = "skillDiv"
    }

    hideAllSections() {
        this.infoDiv.style.display = "none";
        this.weaponDiv.style.display = "none";
        this.equipmentDiv.style.display = "none";
        this.skillDiv.style.display = "none";
    }

    removeAllTabsHighlight() {
        this.infoTabBtn.classList.remove("character-tab-selected");
        this.weaponTabBtn.classList.remove("character-tab-selected");
        this.equipmentTabBtn.classList.remove("character-tab-selected");
        this.skillTabBtn.classList.remove("character-tab-selected");
    }

    openWindow() {
        this.characterPage.style.display = "block";
        this.scene.cssWindowOpened = true;
        this.renderCharacterPage();
    }

    closeWindow() {
        this.characterPage.style.display = "none";
        this.scene.cssWindowOpened = false;
    }

    destroySelf() {
        this.characterGroup.getChildren().forEach((character) => {
            character.destroySelf();
        })
    }

    update(time, delta) {
        this.characterGroup.getChildren().forEach((character) => {
            character.update(time, delta);
        })

    }
    
}