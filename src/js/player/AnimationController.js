


export default class AnimationController {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        // variables
        this.inAction = false;
        
        this.initAnimationListeners();
    }

    initAnimationListeners() {
        this.player.on("animationcomplete", (anim, frame) => {
            this.player.emit("animationcomplete_" + anim.key.split("_")[0], anim, frame);
        })

        this.player.on("animationcomplete_attack", () => {
            this.inAction = false;
            this.player.hitbox.destroySwordHitbox();
        })
    }
    
    swordAttack() {
        if (this.inAction) 
            return;
        this.inAction = true;
        this.player.anims.play(`attack_${this.player.direction}`)

        this.player.hitbox.createSwordHitBox();
    }

    hoe() {
        if (this.inAction)
            return
        // return if the land has been hoed 
        if (this.scene.worldManager.map[`${this.player.onGrid.x},${this.player.onGrid.y}`].isHoedLand)
            return;
        this.inAction = true;
        this.player.anims.play(`idle_${this.player.direction}`, true);
        setTimeout(() => {
            this.inAction = false;
        }, 500);
        this.scene.worldManager.hoeLand(this.player.onGrid);
    }

    sow(seedName) {
        if (this.inAction) 
            return;
        // return if the land has not been hoed yet
        if (!this.scene.worldManager.map[`${this.player.onGrid.x},${this.player.onGrid.y}`].isHoedLand)
            return;
        // return if the land already has growing crop 
        if (this.scene.worldManager.map[`${this.player.onGrid.x},${this.player.onGrid.y}`].crop) 
            return;
        this.inAction = true;
        this.player.anims.play(`idle_${this.player.direction}`, true);
        setTimeout(() => {
            this.inAction = false;
        }, 500);
        this.scene.worldManager.sowingSeedOnLand(this.player.onGrid, seedName);
    }


    move(velocity, direction) {
        if (this.inAction) {
            this.player.setVelocity(0, 0);
            return;
        }

        this.player.direction = direction ? direction : this.player.direction;

        velocity.scale(this.player.stats.speed);
        this.player.setVelocity(velocity.x, velocity.y);

        // Walk or idle animaiton depends on velocity
        if (Math.abs(this.player.body.velocity.x) > 0 || Math.abs(this.player.body.velocity.y) > 0) {
            this.player.anims.play(`walk_${this.player.direction}`, true);
        } else {
            this.player.anims.play(`idle_${this.player.direction}`, true);
        }   

    }

    update() {
        
    }
}