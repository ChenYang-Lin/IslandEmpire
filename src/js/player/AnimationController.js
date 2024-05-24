


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

    useHoe() {
        if (this.inAction)
            return
        // this.inAction = true;
    }


    move(velocity, direction) {
        if (this.inAction) {
            this.player.setVelocity(0, 0);
            return;
        }

        this.player.direction = direction ? direction : this.player.direction;

        velocity.scale(this.player.speed);
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