import { ENTITY_DATA } from "../GameData.js";
import Entity from "./Entity.js";


export default class Raft extends Entity {
    constructor(scene, x, y, name, texture, frame) {
        let entityData = ENTITY_DATA[name];
        super(scene, x, y, name, texture, frame, entityData);

        this.anims.play("raft_move_up", true);
        this.onDestination = false;

        this.scene.physics.add.collider(this, this.scene.worldManager.landCollidersGroup, (raft, land) => {
            console.log(land.x, land.y / 32)
            this.onDestination = true;
        })
    }

    update(time, delta) {
        if (!this.onDestination) {
            this.y -= 1;
        }
    }
}