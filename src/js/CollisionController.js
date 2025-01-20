

export default class CollisionController {
    constructor(scene) {
        this.scene = scene;

        this.timer = 0;

        // this.player;
        this.allyGroup = this.scene.physics.add.group();
        this.enemyGroup = this.scene.physics.add.group();
        this.hitboxGroup = this.scene.physics.add.group();
        

        this.currentCollectables = [];
        this.collectableCollected = [];
        
    }

    init() {
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


        // Check overlap for transparent when player move behind the large object that will block the player sprite image
        this.scene.physics.add.overlap(this.scene.player, this.scene.worldManager.transparentHitboxGroup, (player, colliderBody) => {
            colliderBody.parent.setTransparent(0.3);
            setTimeout(() => {
                colliderBody.parent.setTransparent(1);
            }, 50)
        });
        // check player interact with interactables like door, teleport gate, etc.
        this.scene.physics.add.overlap(this.scene.player.nearbyInteractableSensor, this.scene.worldManager.interactionHitboxGroup, (player, nearbyInteractable) => {
            if (!this.currentCollectables.includes(nearbyInteractable)) {
                this.currentCollectables.push(nearbyInteractable)
            }
            if (!this.scene.player.touchingNearbyObjects.includes(nearbyInteractable)) {
                this.scene.player.touchingNearbyObjects.push(nearbyInteractable);
            }
        });
    }


    addCollectableCollected(collectableCollected) {
        // console.log(collectableCollected)
        if (collectableCollected)
            this.collectableCollected.push(collectableCollected);
    }

    update(time, delta) {
        this.timer += delta;
        if (this.timer > 500) {
            this.timer = 0;
            this.scene.player.touchingNearbyObjects = this.scene.player.touchingNearbyObjects.filter(item => this.currentCollectables?.includes(item));
            this.scene.player.touchingNearbyObjects = this.scene.player.touchingNearbyObjects.filter(item => !this.collectableCollected?.includes(item));
            this.currentCollectables = [];
            // console.log(this.scene.player.touchingNearbyObjects)
            this.scene.hud.createCollectablesContainer(this.scene.player.touchingNearbyObjects);
        }
    }
    

}