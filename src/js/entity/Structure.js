import { ENTITY_DATA } from "../GameData.js";
import Entity from "./Entity.js";



export default class Structure extends Entity {
    constructor(scene, name, x, y, texture) {
        // scene, x, y, name, texture, frame
        super(scene, name, x, y, texture, name, );

        this.name = name;
        
        // Transparent hitbox
        this.initTransparentHitBox(this);


        
        this.scene.worldManager.obstacleCollidersGroup.add(this);
    }

    onDeath(attacker) {

        this.destroyTransparentHitBox();
        super.destroySelf();
    }

    setTransparent(opacity) {
        this.alpha = opacity;
    }
    
}