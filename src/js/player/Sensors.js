

export default class Sensors {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        this.nearbyInteractableSensor = this.scene.physics.add.image(this.player.position.x - 16, this.player.position.y - 16);
        this.nearbyInteractableSensor.body.setCircle(15, 0, 0);
        
        this.nearbyCollectablesSensor = this.scene.physics.add.image(this.player.position.x - 16, this.player.position.y - 16);
        this.nearbyCollectablesSensor.body.setCircle(50, -33, -33);
        
        this.touchingNearbyObjects = [];
    }

    

    update() {
        this.nearbyCollectablesSensor.setPosition(this.player.position.x, this.player.position.y);
        this.nearbyInteractableSensor.setPosition(this.player.position.x, this.player.position.y);
    }
}