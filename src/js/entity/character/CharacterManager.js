import Civilian from "./Civilian.js";
import Soldier from "./Soldier.js";
import Survivor from "./Survivor.js";


export default class CharacterManager {
    constructor(scene) {
        this.scene = scene;

        this.characterGroup = this.scene.physics.add.group();
        this.characterList = {};
        this.party = [];
        this.partySize = 3;

        if (localStorage.getItem("characterList")) {
            this.characterList = JSON.parse(localStorage.getItem("characterList"));
        } else {
            this.characterList["survivor"] = { name: "survivor", type: "survivor", }; 
            localStorage.setItem("characterList", JSON.stringify(this.characterList));


            this.obtainedNewCharacter("soldier");
            this.obtainedNewCharacter("civilian"); 
        }

        this.party = ["survivor", "soldier", "civilian"]
    }

    init() {
        if (this.scene.currentMap === "island") {
            Object.entries(this.characterList).forEach(([key, characterData]) => {
                this.spawnCharacter(characterData);
            });
        }
    }

    spawnCharacter(characterData) {
        let character;
        switch (characterData.name) {
            case "survivor":
                character = new Survivor(this.scene, "survivor", characterData.id, 0, 0, "survivor", "survivor_idle_left");
                break;
            case "soldier":
                character = new Soldier(this.scene, "soldier", characterData.id, 0, -64, "soldier", "soldier_idle_left");
                break;
            case "civilian":
                character = new Civilian(this.scene, "civilian", characterData.id, 0, -64, "civilian", "civilian_idle_left");
                break;
            default:

        }
        this.characterGroup.add(character);
    }

    obtainedNewCharacter(name) {
        let id = name + "_1"
        if (this.characterList[id]) {
            let counter = 2;
            id = "" + name + "_" + counter;
            while(this.characterList[id]) {
                counter++;
                id = "" + name + "_" + counter;
            }
            console.log(id)
            this.characterList[id] = { id: id, name: name, }
        } else {
            this.characterList[id] = { id: id, name: name, }
        }
        localStorage.setItem("characterList", JSON.stringify(this.characterList));
        this.spawnCharacter(this.characterList[id])

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