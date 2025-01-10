import Entity from "./Entity.js";


export default class WaterCollector extends Entity {
    constructor(scene, x, y, texture, name) {
        
        // scene, x, y, name, texture, frame
        super(scene, name, x, y, texture, name, );

        this.name = name;

        console.log(this.name)
        
        // Transparent hitbox
        this.initTransparentHitBox(this);


        
        this.scene.worldManager.obstacleCollidersGroup.add(this);
    }

    handleSelected() {
        super.handleSelected();
        
        this.scene.hud.reward.randomReward(1);
    }
    
    onDeath(attacker) {
        this.destroyTransparentHitBox();
        super.destroySelf();
    }


}