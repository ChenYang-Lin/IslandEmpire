import { ENTITY_DATA } from "../GameData.js";
import Entity from "./Entity.js";
import Goblin from "./Goblin.js";


export default class Raft extends Entity {
    constructor(scene, name, x, y, texture, frame) {
        let entityData = ENTITY_DATA[name];
        super(scene, name, x, y, texture, frame, entityData);

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

        
        this.goblin = new Goblin(this.scene, "goblin", this.x, this.y, "goblin", "goblin");
    }

    destroySelf() {
        super.destroySelf();
    }

    update(time, delta) {
        if (!this.onDestination) {
            this.y -= 1;
            this.goblin.setPosition(this.position.x, this.position.y);
        } else {
            setTimeout(() => {
                this.setTransparent(0.5);
                setTimeout(() => {
                    this.onDeath();
                }, 1000)
            }, 1000)
        }
        this.goblin?.update(time, delta);
        this.depth = this.position.y -1000

    }
}