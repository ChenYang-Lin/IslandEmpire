

export default class Hitbox {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        this.swordHitbox;
        this.swordHitboxTouching = [];
    }

    
    createSwordHitBox() {
        let x = this.player.position.x;
        let y = this.player.position.y;

        switch(this.player.direction) {
            case "left":
                x -= 32;
                break;
            case "right":
                x += 32;
                break;
            case "up":
                y -= 32;
                break;
            case "down":
                y += 32;
                break;
        }

        this.swordHitbox = this.scene.physics.add.image(x, y);
        this.swordHitbox.setSize(32, 32);

        this.scene.physics.add.overlap(this.swordHitbox, this.scene.worldManager.resourceCollidersGroup, (swordHitbox, resource) => {
            if (this.swordHitboxTouching.includes(resource))
                return;
            this.swordHitboxTouching.push(resource);
            resource.onHit(this.player.stats.attackDmg);
        });
    }

    destroySwordHitbox() {  
        this.swordHitbox.destroy();
        this.swordHitboxTouching = [];
    }
}