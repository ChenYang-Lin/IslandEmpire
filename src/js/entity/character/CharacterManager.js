import Civilian from "./Civilian.js";
import Soldier from "./Soldier.js";


export default class CharacterManager {
    constructor(scene) {
        this.scene = scene;

        this.characterGroup = this.scene.physics.add.group();
        this.characterList = {};

        if (this.scene.currentMap === "island") {
            let civilian = new Civilian(this.scene, "civilian", 0, -32, "civilian", "civilian_idle_left");
            let soldier = new Soldier(this.scene, "soldier", 0, -64, "soldier", "soldier_idle_left");
            this.characterGroup.add(civilian);
            this.characterGroup.add(soldier);
            this.characterList[civilian.name] = civilian;
            this.characterList[soldier.name] = soldier;
        }
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