

export default class CollisionController {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.sensors = player.sensors;

        

        // Collisions and Overlaps
        this.scene.physics.add.collider(this.player, this.scene.worldManager.landCollidersGroup);
        this.scene.physics.add.collider(this.player, this.scene.worldManager.resourceCollidersGroup);
        

        // Player overlap Collectables (drops, crops)
        // this.physics.add.overlap(this.player, this.nearbyCollectablesGroup, (player, collectable) => {
        //     this.inventory.addItem(collectable.name, 1);
        //     collectable.destroy();
        // });



        // Player overlap Collectables (drops, crops)
        this.currentCollectables = [];
        this.scene.physics.add.overlap(this.player.sensors.nearbyCollectablesSensor, this.scene.worldManager.collectablesGroup, (player, nearbyCollectable) => {
            if (!this.currentCollectables.includes(nearbyCollectable)) {
                this.currentCollectables.push(nearbyCollectable)
            }
            if (!this.sensors.touchingNearbyCollectables.includes(nearbyCollectable)) {
                this.sensors.touchingNearbyCollectables.push(nearbyCollectable);
            }
        });
        setInterval(() => {
            this.sensors.touchingNearbyCollectables = this.sensors.touchingNearbyCollectables.filter(item => this.currentCollectables.includes(item));
            this.currentCollectables = [];
            console.log(this.sensors.touchingNearbyCollectables)
        }, 1000);
        
    }

}