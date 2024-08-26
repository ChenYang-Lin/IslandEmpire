

export default class CollisionController {
    constructor(scene) {
        this.scene = scene;

        this.timer = 0;

        this.player;
        this.sensors;
        this.allyGroup = this.scene.physics.add.group();
        this.enemyGroup = this.scene.physics.add.group();
        this.hitboxGroup = this.scene.physics.add.group();
        

        
    }

    init() {
        this.sensors = this.player.sensors;
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

        this.initPlayerOverlapCollectables();

        this.scene.physics.add.overlap(this.scene.player, this.scene.worldManager.transparentHitboxGroup, (player, colliderBody) => {
            colliderBody.parent.secondPart.alpha = 0.3;
            setTimeout(() => {
                colliderBody.parent.secondPart.alpha = 1;
            }, 50)
        });
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