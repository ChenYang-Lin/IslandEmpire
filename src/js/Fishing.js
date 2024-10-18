

export default class Fishing {
    constructor(scene, character) {
        this.scene = scene;
        this.character = character;

        // variables
        this.inAction = false;
        this.isFishing = false;
    }

    checkFishable() {
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

        console.log(fishable)
        return fishable;
    }

    startFishing() {
        let fishingLineSourceX = 0;
        let fishingLineSourceY = 0;
        let fishingLineDestX = (this.character.onGrid.x) * 32;
        let fishingLineDestY = (this.character.onGrid.y) * 32;

        switch (this.character.direction) {
            case "up":
                fishingLineSourceX = this.character.position.x + 45;
                fishingLineSourceY = this.character.position.y - 48;
                fishingLineDestY = (this.character.onGrid.y - 1) * 32;
                break;
            case "right":
                fishingLineSourceX = this.character.position.x + 63;
                fishingLineSourceY = this.character.position.y - 31;
                fishingLineDestX = (this.character.onGrid.x + 1) * 32;
                break;
            case "down":
                fishingLineSourceX = this.character.position.x + 30;
                fishingLineSourceY = this.character.position.y - 18;
                fishingLineDestY = (this.character.onGrid.y + 1) * 32;
                break;
            case "left":
                fishingLineSourceX = this.character.position.x - 63;
                fishingLineSourceY = this.character.position.y - 31;
                fishingLineDestX = (this.character.onGrid.x - 1) * 32;
                break;
            

        }
        const line = new Phaser.Geom.Line(fishingLineSourceX, fishingLineSourceY, fishingLineDestX, fishingLineDestY );
        this.fishingLineGraphics = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xffffff } });

        setTimeout(() => {
            this.fishingLineGraphics.strokeLineShape(line);
            this.fishingLineGraphics.setDepth(this.character.y)
        }, 400)


        console.log("start fishing")
        this.rewardCount = 0;
        this.character.anims.play(`${this.character.name}_start_fishing_${this.character.direction}`, true);
        this.fishingTimeout = setInterval(() => {
            console.log("fish reward");
            this.rewardCount++;
        }, 1000);
    
    }

    endFishing() {
        clearInterval(this.fishingTimeout);
        this.fishingLineGraphics.destroy();
        this.scene.hud.reward.randomReward(this.rewardCount);
    }

    showFishingHud() {
        
    }
}