import Civilian from "./Civilian.js";


export default class CharacterManager {
    constructor(scene) {
        this.scene = scene;

        this.characterGroup = this.scene.physics.add.group();

        if (this.scene.currentMap === "island") {
            let civilian = new Civilian(this.scene, 0, -32, "civilian", "civilian", "civilian_idle_left");
            // let civilian2 = new Civilian(this.scene, 0, -64, "civilian", "civilian", "civilian_idle_left");
            this.characterGroup.add(civilian);
            // this.characterGroup.add(civilian2);
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