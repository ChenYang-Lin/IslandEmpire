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
            let characterID = "survivor"; 
            this.characterList[characterID] = { name: characterID, type: "survivor", }; 

            this.characterList["soldier"] = { name: "soldier", type: "soldier", }; 
            this.characterList["civilian"] = { name: "civilian", type: "civilian", }; 


            localStorage.setItem("characterList", JSON.stringify(this.characterList));
        }

        this.party = ["survivor", "soldier", "civilian"]
    }

    init() {
        if (this.scene.currentMap === "island") {
            Object.entries(this.characterList).forEach(([id, characterData]) => {
                let character;
                switch (characterData.type) {
                    case "survivor":
                        character = new Survivor(this.scene, "survivor", 0, 0, "survivor", "survivor_idle_left");
                        break;
                    case "soldier":
                        character = new Soldier(this.scene, "soldier", 0, -64, "soldier", "soldier_idle_left");
                        break;
                    case "civilian":
                        character = new Civilian(this.scene, "civilian", 0, -64, "civilian", "civilian_idle_left");
                        break;
                    default:

                }
                console.log(character)
                this.characterGroup.add(character);
            });
        }
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

    obtainedNewCharacter(id) {

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