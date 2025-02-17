

export default class Fishing {
    constructor(scene, character) {
        this.scene = scene;
        this.character = character;

        // variables
        this.isFishing = false;
        this.fishingTimeRequired = 1 * 1000;

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

        console.log(this.character.id, this.character.direction)
        return fishable;
    }


    showFishingLine() {
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

        this.fishingLineGraphics.strokeLineShape(line);
        this.fishingLineGraphics.setDepth(this.character.y)
    }

    showFishingProgressHUD() {
        if (!this.character.body) 
            return;

        this.fishingBarBG?.destroy();
        this.fishingBar?.destroy();

        let graphics = this.scene.add.graphics();
        let fishingBarWidth = 32;

        let x = this.character.position.x - (fishingBarWidth/2);
        let y = this.character.position.y - 40;
        let width = fishingBarWidth;
        let height = 6;
        let radius = 2;

        // FishingBarBackground
        graphics.fillStyle(0x000000, 1);
        this.fishingBarBG = graphics.fillRoundedRect(x, y, width, height, radius); // x, y, width, height, radius
        this.fishingBarBG.depth = this.characterdepth + 1;
        

        // Fishingbar
        graphics.fillStyle(0xff0000, 1);
        let progress = (this.fishingTimeCounter % this.fishingTimeRequired) / this.fishingTimeRequired;
        this.fishingBar = graphics.fillRoundedRect(x+2, y+2, (progress)*(width-4), height-4, 1); // x, y, width, height, radius
        this.fishingBar.depth = this.depth + 2;
    }

    fishingReward() {        
        this.isWaitingForFish = false;
        this.fishingLineGraphics?.destroy();
        this.fishingBarBG?.destroy();
        this.fishingBar?.destroy();

        this.scene.hud.reward.getOneRandomReward(1, "fishing_wl_1", false, this.character.position.x, this.character.position.y);
        // this.scene.hud.reward.randomReward(this.rewardCount);

        this.character.anims.play(`${this.character.name}_end_fishing_${this.character.direction}`);
    }

    casting() {
        // if character inventory is not full
        this.character.anims.play(`${this.character.name}_start_fishing_${this.character.direction}`, true);
        console.log(this.character.direction)
    }

    waitingForFish() {
        this.fishingTimeCounter = 0;
        this.isWaitingForFish = true;
        this.showFishingLine();
        this.rewardTimeout = setTimeout(() => {
            this.fishingReward();
        }, this.fishingTimeRequired)
    }
    
    startFishing() {
        this.isFishing = true;
        this.casting();
    }

    endFishing() {
        this.isFishing = false;
        this.isWaitingForFish = false;
        clearTimeout(this.rewardTimeout);

        this.fishingLineGraphics.destroy();
        this.fishingBarBG?.destroy();
        this.fishingBar?.destroy();
        
    }

    update(time, delta) {
        if (this.isFishing && this.isWaitingForFish) {
            this.showFishingProgressHUD();
            
            this.fishingTimeCounter += delta;
        }
    }
}