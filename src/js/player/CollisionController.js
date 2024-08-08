

export default class CollisionController {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.sensors = player.sensors;

        
        this.timer = 0;

        // Collisions and Overlaps
        this.scene.physics.add.collider(this.player, this.scene.worldManager.landCollidersGroup);
        this.scene.physics.add.collider(this.player, this.scene.worldManager.resourceCollidersGroup);
        this.scene.physics.add.collider(this.player, this.scene.worldManager.obstacleCollidersGroup);
        

        this.initPlayerOverlapCollectables();
        
    }

    initPlayerOverlapCollectables() {
        this.currentCollectables = [];
        this.collectableCollected = [];
        this.scene.physics.add.overlap(this.player.sensors.nearbyCollectablesSensor, this.scene.worldManager.collectablesGroup, (player, nearbyCollectable) => {
            if (!this.currentCollectables.includes(nearbyCollectable)) {
                this.currentCollectables.push(nearbyCollectable)
            }
            if (!this.sensors.touchingNearbyCollectables.includes(nearbyCollectable)) {
                this.sensors.touchingNearbyCollectables.push(nearbyCollectable);
            }
        });
    }

    addCollectableCollected(collectableCollected) {
        this.collectableCollected.push(collectableCollected);
    }

    update(time, delta) {
        this.timer += delta;
        if (this.timer > 500) {
            this.timer = 0;
            this.sensors.touchingNearbyCollectables = this.sensors.touchingNearbyCollectables.filter(item => this.currentCollectables.includes(item));
            this.sensors.touchingNearbyCollectables = this.sensors.touchingNearbyCollectables.filter(item => !this.collectableCollected.includes(item));
            this.currentCollectables = [];
            this.scene.hud.createCollectablesContainer(this.sensors.touchingNearbyCollectables);
        }
    }
    

}