import { ENTITY_DATA } from "../GameData.js";
import Entity from "./Entity.js";
import Goblin from "./Goblin.js";


export default class Raft extends Entity {
    constructor(scene, x, y, name, texture, frame) {
        let entityData = ENTITY_DATA[name];
        super(scene, x, y, name, texture, frame, entityData);

        this.anims.play("raft_move_up", true);
        this.onDestination = false;
        this.destinationGridCellX = 0;
        this.destinationGridCellY = 0;

        this.colliderWithLand = this.scene.physics.add.collider(this, this.scene.worldManager.landCollidersGroup, (raft, land) => {
            // console.log(land.x/32, land.y / 32)
            this.onDestination = true;
            this.destinationGridCellX = land.x/32;
            this.destinationGridCellY = land.y/32 - 1;

            this.goblin.action = "moveToLand";
            this.goblin.moveToLandX = this.destinationGridCellX;
            this.goblin.moveToLandY = this.destinationGridCellY;

            this.scene.physics.world.removeCollider(this.colliderWithLand)
        })

        
        this.goblin = new Goblin(this.scene, this.x, this.y, "goblin", "goblin", "goblin");
    }

    update(time, delta) {
        if (!this.onDestination) {
            this.y -= 1;
            this.goblin.setPosition(this.position.x, this.position.y);
        } 
        this.goblin?.update(time, delta);
        this.depth = this.position.y -1000

    }
}