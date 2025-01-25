import Fishing from "../../Fishing.js";
import AnimationController from "./AnimationController.js";
import Entity from "../Entity.js";
import Hitbox from "./Hitbox.js";


export default class Character extends Entity {
    constructor(scene, name, x, y, texture, frame, isAlly) {
        super(scene, name, x, y, texture, frame);

        this.timer = 0;
        this.speed = 64;

        this.isAlly = isAlly;
        this.direction = "left"
        this.swordLength = 32;

        this.action = "rest";
        
        
        this.animationController = new AnimationController(this.scene, this);
        this.fishing = new Fishing(this.scene, this);
        this.hitbox = new Hitbox(this.scene, this);

    }

    
    findPathToCell(goalCell) {
        return this.scene.worldManager.astar.findPath(
            this.scene.worldManager.map, 
            {tx: this.onGrid.x, ty: this.onGrid.y}, 
            {tx: goalCell.x, ty: goalCell.y}, 
            this.scene,
        )
    }


    findAnEmptyCell(range) {
        let emptyCells = [];
        // console.log("current", this.onGrid)
        for (let x = this.onGrid.x - range; x <= this.onGrid.x + range; x++) {
            for (let y = this.onGrid.y - range; y <= this.onGrid.y + range; y++) {
                if (x === this.onGrid.x && y === this.onGrid.y) {
                    continue;
                }
                let currCellData = this.scene.worldManager.map[`${x},${y}`];
                // Current cell is not collidable
                if (!this.scene.worldManager.isCellCollidable(x, y)) {
                    emptyCells.push({ x, y })
                }
            }
        }
        // console.log(emptyCells)
        return emptyCells[Math.floor(Math.random() * emptyCells.length)]
    }



    moveRandomly(time, delta) {
        if (this.currPath && this.currPath.length > 0) {
            this.moveToGridCell(this.currPath);
            this.timer = 0;
        } else {
            this.timer += delta;
            if (this.timer >= 1000){
                let emptyCell = this.findAnEmptyCell(2);
                this.currPath = this.findPathToCell(emptyCell);
            }
        }
    }

    moveToTarget(target) {
        if (this.name == "soldier") {
        }
        if (this.pathToTarget?.length > 0) {
            this.moveToGridCell(this.pathToTarget);
        } 
        this.pathToTarget = this.findPathToCell({ x: target.onGrid.x, y: target.onGrid.y });
    
    }

    moveToGridCell(path) {

        if (path?.length > 0) {
            let velocity = new Phaser.Math.Vector2();
            this.nextGridCell = path[0];
            // console.log(this.name, path[0], this.position.x, this.nextGridCell.tx*32-4)
    

            if (this.position.y > this.nextGridCell.ty*32+1) {
                velocity.y = -1;
                this.direction = "up";
            } else if (this.position.y < this.nextGridCell.ty*32-1) {
                velocity.y = 1;                
                this.direction = "down";
            } else {
                velocity.y = 0;
                this.setPosition(this.position.x, this.nextGridCell.ty*32);
            }

            if (this.position.x < this.nextGridCell.tx*32-1) {
                velocity.x = 1;
                this.direction = "right";
            } else if (this.position.x > this.nextGridCell.tx*32+1) {
                velocity.x = -1;
                this.direction = "left";
            } else {
                velocity.x = 0;
                this.setPosition(this.nextGridCell.tx*32, this.position.y);
            }


            if (this.position.x < this.nextGridCell.tx*32+0.5 
                && this.position.x > this.nextGridCell.tx*32-0.5
                && this.position.y < this.nextGridCell.ty*32+0.5 
                && this.position.y > this.nextGridCell.ty*32-0.5
            ) {
                path.shift();
            }
            
            velocity.normalize();
            this.animationController.move(velocity, this.direction, this);
        } else {
            this.autoControl = false;
        }
    }

    
    renderHealthBar() {
        if (!this.body) 
            return;

        if (!this.showHealthBar) 
            return;
        this.graphics = this.scene.add.graphics();

        this.healthBarBG?.destroy();
        this.healthBar?.destroy();

        let x = this.position.x - (this.hpBarWidth/2);
        let y = this.position.y - this.hpBarOffsetY;
        let width = this.hpBarWidth;
        let height = 6;
        let radius = 2;


        // HealthBarBackground
        this.graphics.fillStyle(0x000000, 1);
        this.healthBarBG = this.graphics.fillRoundedRect(x, y, width, height, radius); // x, y, width, height, radius
        this.healthBarBG.depth = this.depth + 1;
        

        // Healthbar
        this.graphics.fillStyle(0xff0000, 1);
        if (this.isAlly) {
            this.graphics.fillStyle(0x0066ff, 1);
            if (this === this.scene.player.characterOnControl) {
                this.graphics.fillStyle(0x00ff00, 1);
            }
        } else {
            this.graphics.fillStyle(0xff0000, 1);
        }
        this.healthBar = this.graphics.fillRoundedRect(x+2, y+2, (this.stats.hp/this.stats.maxHp)*(width-4), height-4, 1); // x, y, width, height, radius
        this.healthBar.depth = this.depth + 2;
    }
    

    onHit(attacker, damage) {       
        if (!this.body) 
            return;

        if (this.dead) 
            return;0
        super.onHit(attacker, damage);
        this.renderHealthBar()
    }  

    onDeath(attacker) {
        // this.anims.play(`goblin_death`, false);  
        this.dead = true;
        // this.healthBarBG?.destroy();
        // this.healthBar?.destroy();
        // this.destroyed = true;

        // super.onDeath(attacker);
    }

    destroySelf() {
        delete this.animationController;
        delete this.fishing;
        delete this.hitbox;
        this.scene?.characterManager?.characterGroup?.remove(this);
        super.destroySelf();
    }


    update(time, delta) {
        // return update if entity destroyed.
        if (!this.body) 
            return;

        this.stats.update();
        this.renderHealthBar();
        this.depth = this.position.y;
    }

}