

export default class Hitbox {
    constructor(scene, character) {
        this.scene = scene;
        this.character = character;

        this.swordHitbox;
        this.swordHitboxTouching = [];

        this.targetedCharacterGroup = this.character.isAlly ? this.scene.collisionController.enemyGroup : this.scene.collisionController.allyGroup
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

        this.scene.physics.add.overlap(
            this.swordHitbox, 
            [
                this.scene.worldManager.resourceCollidersGroup,
                this.targetedCharacterGroup,
            ], (swordHitbox, entity) => {
                if (this.swordHitboxTouching.includes(entity))
                    return;
                this.swordHitboxTouching.push(entity);
                entity.onHit(this.character.name, 10);
        });

    }

    destroySwordHitbox() {  
        this.swordHitbox.destroy();
        this.swordHitboxTouching = [];
    }
}