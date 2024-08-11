

export default class Hitbox {
    constructor(scene, character) {
        this.scene = scene;
        this.character = character;

        this.swordHitbox;
        this.swordHitboxTouching = [];
    }

    
    createSwordHitBox() {
        let x = this.character.position.x;
        let y = this.character.position.y;

        switch(this.character.direction) {
            case "left":
                x -= 16;
                break;
            case "right":
                x += 16;
                break;
            case "up":
                y -= 16;
                break;
            case "down":
                y += 16;
                break;
        }

        this.swordHitbox = this.scene.physics.add.image(x, y);
        this.swordHitbox.setSize(this.character.swordLength, this.character.swordLength);

        this.scene.physics.add.overlap(this.swordHitbox, this.scene.worldManager.resourceCollidersGroup, (swordHitbox, resource) => {
            if (this.swordHitboxTouching.includes(resource))
                return;
            this.swordHitboxTouching.push(resource);
            resource.onHit(this.character.stats.attackDmg);
        });
    }

    destroySwordHitbox() {  
        this.swordHitbox.destroy();
        this.swordHitboxTouching = [];
    }
}