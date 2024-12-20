import Fishing from "../Fishing.js";
import AnimationController from "./AnimationController.js";
import Entity from "./Entity.js";
import Hitbox from "./Hitbox.js";


export default class Character extends Entity {
    constructor(scene, x, y, name, texture, frame, entityData, isAlly) {
        super(scene, x, y, name, texture, frame, entityData);

        this.timer = 0;
        this.speed = 64;

        this.isAlly = isAlly;
        this.direction = "left"
        this.swordLength = 32;

        this.action = "rest";
        this.path;
        
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
                // console.log(emptyCell)
                this.currPath = this.findPathToCell(emptyCell);
                // console.log(this.currPath)
            }
        }
        // let velocity = new Phaser.Math.Vector2();
        // velocity.y = -1;
        // this.animationController.move(velocity, "up", this);
    }

    moveToGridCell(path) {
        if (path?.length > 0) {
            let velocity = new Phaser.Math.Vector2();
            this.nextGridCell = path[0];
    
            if (this.position.x < this.nextGridCell.tx*32-4) {
                velocity.x = 1;
                this.direction = "right";
            } else if (this.position.x > this.nextGridCell.tx*32+4) {
                velocity.x = -1;
                this.direction = "left";
            } else if (this.position.y > this.nextGridCell.ty*32+4) {
                velocity.y = -1;
                this.direction = "up";
            } else if (this.position.y < this.nextGridCell.ty*32-4) {
                velocity.y = 1;                
                this.direction = "down";
            } else {
                path.shift();
            }
            
            this.animationController.move(velocity, this.direction, this);
        } else {
            this.autoControl = false;
        }
    }


    onHit(attacker, damage) {       
        this.hp -= damage;
        this.renderHealthBar();

        super.onHit(attacker, damage);
    }  

    onDeath(attacker) {
        this.anims.play(`goblin_death`, false);  
        this.healthBarBG?.destroy();
        this.healthBar?.destroy();
        this.destroyed = true;

        super.onDeath(attacker);
    }

    destroySelf() {
        delete this.animationController;
        delete this.fishing;
        delete this.hitbox;
        this.scene.characterManager.characterGroup.remove(this);
        super.destroySelf();
    }


    update() {
        // console.log(this.x, this.y)

        if (this.destroyed) return;


        
        
        this.depth = this.position.y
    }

}