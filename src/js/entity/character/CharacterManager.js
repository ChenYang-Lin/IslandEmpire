import Civilian from "./Civilian.js";
import Soldier from "./Soldier.js";
import Survivor from "./Survivor.js";


export default class CharacterManager {
    constructor(scene) {
        this.scene = scene;

        this.characterGroup = this.scene.physics.add.group();
        // this.scene.entityList = {};
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


    getCharacterObject(name) {
        let characterObject;
        this.characterGroup.getChildren().forEach((character) => {
            if (character.name === name) {
                characterObject = character;
            }
        })
        return characterObject;
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