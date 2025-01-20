


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
            // console.log("animationcomplete_" + anim.key.split("_")[0] + "_" + anim.key.split("_")[1], this.character.name)
            this.character.emit("animationcomplete_" + anim.key.split("_")[0] + "_" + anim.key.split("_")[1], anim, frame);
        })

        this.character.on(`animationcomplete_${this.character.name}_attack`, () => {
            
            this.character.hitbox.destroySwordHitbox();
            this.character.anims.play(`${this.character.name}_idle_${this.character.direction}`, true);
            setTimeout(() => {
                this.inAction = false;
            }, 300);
        })
    }
    
    swordAttack() {
        let velocity = new Phaser.Math.Vector2();
        this.character.setVelocity(velocity.x, velocity.y);
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
        // console.log(this.scene.worldManager)
        if (this.scene.worldManager.map[`${this.character.onGrid.x},${this.character.onGrid.y}`].isHoedLand)
            return;
        this.inAction = true;
        this.character.anims.play(`${this.character.name}_idle_${this.character.direction}`, true);
        setTimeout(() => {
            this.inAction = false;
        }, 500);
        this.scene.worldManager.hoeLand(this.character.onGrid);
    }

    fishing() {
        if (this.character.destroyed === true) 
            return;
        if (this.inAction) {
            if (this.isFishing) {
                this.inAction = false;
                this.isFishing = false;
                this.character.fishing.endFishing();
            }
            return;
        }
        let fishable = this.character.fishing.checkFishable();

        if (fishable) {
            this.inAction = true;
            this.isFishing = true;
            console.log("character: ", this.character)
            this.character.fishing.startFishing();
        }
    }

    sow(seedName) {
        if (this.character.destroyed === true) 
            return false;
        if (this.inAction) 
            return false;
        // return if the land has not been hoed yet
        if (!this.scene.worldManager.map[`${this.character.onGrid.x},${this.character.onGrid.y}`].isHoedLand)
            return false;
        // return if the land already has growing crop 
        if (this.scene.worldManager.map[`${this.character.onGrid.x},${this.character.onGrid.y}`].crop) 
            return false;
        this.inAction = true;
        this.character.anims.play(`idle_${this.character.direction}`, true);
        setTimeout(() => {
            this.inAction = false;
        }, 500);
        this.scene.worldManager.sowingSeedOnLand(this.character.onGrid, seedName);
        return true;
    }


    move(velocity, direction) {
        if (this.character.destroyed === true) 
            return;
        if (this.inAction) {
            this.character.setVelocity(0, 0);
            return;
        }

        this.character.direction = direction ? direction : this.character.direction;

        velocity = velocity.scale(this.character.speed);
        this.character.setVelocity(velocity.x, velocity.y);

        // console.log(this.character.name, this.character.body.velocity.x, this.character.body.velocity.y)

        // Walk or idle animaiton depends on velocity
        if (Math.abs(this.character.body.velocity.x) > 0.5 || Math.abs(this.character.body.velocity.y) > 0.5) {
            this.character.anims.play(`${this.character.name}_walk_${this.character.direction}`, true);
        } else {
            this.character.anims.play(`${this.character.name}_idle_${this.character.direction}`, true);
        }   


        this.scene.eventEmitter.emit(`${this.character.name}-move`);

    }

}