

export default class Sensors {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        
        this.nearbyCollectablesSensor = this.scene.physics.add.image(this.player.position.x - 16, this.player.position.y - 16);
        this.nearbyCollectablesSensor.body.setCircle(50, -33, -33);
        
        this.touchingNearbyCollectables = [];
    }

    

    update() {
        this.nearbyCollectablesSensor.setPosition(this.player.position.x, this.player.position.y);
    }
}