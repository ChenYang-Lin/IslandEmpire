


export default class AnimationController {
    constructor(scene, character) {
        this.scene = scene;
        this.character = character;

        // variables
        this.inAction = false;
        this.isFishing = false;
        
        this.initAnimationListeners();
    }

    initAnimationListeners() {
        this.character.on("animationcomplete", (anim, frame) => {
            console.log("animationcomplete_" + anim.key.split("_")[0] + "_" + anim.key.split("_")[1], this.character.name)
            this.character.emit("animationcomplete_" + anim.key.split("_")[0] + "_" + anim.key.split("_")[1], anim, frame);
        })

        this.character.on(`animationcomplete_${this.character.name}_attack`, () => {
            this.inAction = false;
            this.character.hitbox.destroySwordHitbox();
        })
    }
    
    swordAttack() {
        console.log(this.inAction)
        if (this.inAction) 
            return;
        this.inAction = true;
        this.character.anims.play(`${this.character.name}_attack_${this.character.direction}`)
        // this.character.anims.play(`${this.character.name}_start_fishing_${this.character.direction}`)

        this.character.hitbox.createSwordHitBox();
    }

    hoe() {
        if (this.inAction)
            return
        // return if the land has been hoed 
        if (this.scene.worldManager.map[`${this.character.onGrid.x},${this.character.onGrid.y}`].isHoedLand)
            return;
        this.inAction = true;
        this.character.anims.play(`idle_${this.character.direction}`, true);
        setTimeout(() => {
            this.inAction = false;
        }, 500);
        this.scene.worldManager.hoeLand(this.character.onGrid);
    }

    startFishing() {
        if (this.inAction) {
            if (this.isFishing) {
                this.inAction = false;
                this.isFishing = false;
            }
            return;
        }
        let fishable = false;
        // return if no water surrounding
        if (!this.scene.worldManager.map[`${this.character.onGrid.x},${this.character.onGrid.y - 1}`]?.isLand) {
            this.character.direction = "up";
            fishable = true;
        } else if (!this.scene.worldManager.map[`${this.character.onGrid.x},${this.character.onGrid.y + 1}`]?.isLand) {
            this.character.direction = "down";
            fishable = true;
        } else if (!this.scene.worldManager.map[`${this.character.onGrid.x - 1},${this.character.onGrid.y}`]?.isLand) {
            this.character.direction = "left";
            fishable = true;
        } else if (!this.scene.worldManager.map[`${this.character.onGrid.x + 1},${this.character.onGrid.y}`]?.isLand) {
            this.character.direction = "right";
            fishable = true;
        } 
        
        if (fishable) {
            this.inAction = true;
            this.isFishing = true;
            this.character.anims.play(`${this.character.name}_start_fishing_${this.character.direction}`, true);
            // this.scene.worldManager.hoeLand(this.character.onGrid);
        }
    }

    sow(seedName) {
        if (this.inAction) 
            return;
        // return if the land has not been hoed yet
        if (!this.scene.worldManager.map[`${this.character.onGrid.x},${this.character.onGrid.y}`].isHoedLand)
            return;
        // return if the land already has growing crop 
        if (this.scene.worldManager.map[`${this.character.onGrid.x},${this.character.onGrid.y}`].crop) 
            return;
        this.inAction = true;
        this.character.anims.play(`idle_${this.character.direction}`, true);
        setTimeout(() => {
            this.inAction = false;
        }, 500);
        this.scene.worldManager.sowingSeedOnLand(this.character.onGrid, seedName);
    }


    move(velocity, direction) {
        if (this.inAction) {
            this.character.setVelocity(0, 0);
            return;
        }

        this.character.direction = direction ? direction : this.character.direction;

        velocity.scale(this.character.speed);
        this.character.setVelocity(velocity.x, velocity.y);

        // Walk or idle animaiton depends on velocity
        if (Math.abs(this.character.body.velocity.x) > 0 || Math.abs(this.character.body.velocity.y) > 0) {
            this.character.anims.play(`${this.character.name}_walk_${this.character.direction}`, true);
        } else {
            this.character.anims.play(`${this.character.name}_idle_${this.character.direction}`, true);
        }   


        this.scene.eventEmitter.emit(`${this.character.name}-move`);

    }

}