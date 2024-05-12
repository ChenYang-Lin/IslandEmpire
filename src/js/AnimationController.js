


export default class AnimationController {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        this.player.inAction = false;

        this.initAnimationListeners();

        this.player.swordTouching = [];

    }

    initAnimationListeners() {
        console.log(this.player)
        this.player.on("animationcomplete", (anim, frame) => {
            this.player.emit("animationcomplete_" + anim.key.split("_")[0], anim, frame);
        })

        this.player.on("animationcomplete_attack", () => {
            this.player.inAction = false;
            this.player.swordHitbox.destroy();
            this.player.swordTouching = [];
        })
    }

    
    attack() {
        if (this.player.inAction) 
            return;
        this.player.inAction = true;
        this.player.anims.play(`attack_${this.player.direction}`)

        this.createAttackHitBox();
    }

    createAttackHitBox() {
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

        this.player.swordHitbox = this.scene.physics.add.image(x, y);
        this.player.swordHitbox.setSize(32, 32);

        this.scene.physics.add.overlap(this.player.swordHitbox, this.scene.resourceCollidersGroup, (player, resource) => {
            if (this.player.swordTouching.includes(resource))
                return;
            this.player.swordTouching.push(resource);
            resource.onHit(1);
        });
    }

    move(velocity, direction) {
        if (this.player.inAction) {
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