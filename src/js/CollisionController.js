

export default class CollisionController {
    constructor(scene) {
        this.scene = scene;

        this.timer = 0;

        this.player;
        this.sensors;
        this.allyGroup = this.scene.physics.add.group();
        this.enemyGroup = this.scene.physics.add.group();
        this.hitboxGroup = this.scene.physics.add.group();
        

        this.currentCollectables = [];
        this.collectableCollected = [];
        
    }

    init() {
        this.sensors = this.scene.player.sensors;
        // Collisions and Overlaps
        this.scene.physics.add.collider(
            [
                this.allyGroup, 
            ],
            [
                this.scene.worldManager.landCollidersGroup,
                this.scene.worldManager.resourceCollidersGroup,
                this.scene.worldManager.obstacleCollidersGroup,
            ]
        );

        // this.scene.physics.add.collider([this.heroGroup, this.enemyGroup], [])

        // this.initPlayerOverlapCollectables();

        // Check overlap for transparent when player move behind the large object that will block the player sprite image
        this.scene.physics.add.overlap(this.scene.player, this.scene.worldManager.transparentHitboxGroup, (player, colliderBody) => {
            colliderBody.parent.setTransparent(0.3);
            setTimeout(() => {
                colliderBody.parent.setTransparent(1);
            }, 50)
        });
        // check player interact with interactables like door, teleport gate, etc.
        this.scene.physics.add.overlap(this.scene.player.sensors.nearbyInteractableSensor, this.scene.worldManager.interactionHitboxGroup, (player, nearbyInteractable) => {
            if (!this.currentCollectables.includes(nearbyInteractable)) {
                this.currentCollectables.push(nearbyInteractable)
            }
            if (!this.sensors.touchingNearbyObjects.includes(nearbyInteractable)) {
                this.sensors.touchingNearbyObjects.push(nearbyInteractable);
            }
        });
    }

    initPlayerOverlapCollectables() {
        this.scene.physics.add.overlap(this.scene.player.sensors.nearbyCollectablesSensor, this.scene.worldManager.collectablesGroup, (player, nearbyCollectable) => {
            if (!this.currentCollectables.includes(nearbyCollectable)) {
                this.currentCollectables.push(nearbyCollectable)
            }
            if (!this.sensors.touchingNearbyObjects.includes(nearbyCollectable)) {
                this.sensors.touchingNearbyObjects.push(nearbyCollectable);
            }
        });
    }

    addCollectableCollected(collectableCollected) {
        console.log(collectableCollected)
        if (collectableCollected)
            this.collectableCollected.push(collectableCollected);
    }

    update(time, delta) {
        this.timer += delta;
        if (this.timer > 500) {
            this.timer = 0;
            this.sensors.touchingNearbyObjects = this.sensors.touchingNearbyObjects.filter(item => this.currentCollectables?.includes(item));
            this.sensors.touchingNearbyObjects = this.sensors.touchingNearbyObjects.filter(item => !this.collectableCollected?.includes(item));
            this.currentCollectables = [];
            // console.log(this.sensors.touchingNearbyObjects)
            this.scene.hud.createCollectablesContainer(this.sensors.touchingNearbyObjects);
        }
    }
    

}