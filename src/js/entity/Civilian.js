import { ENTITY_DATA } from "../GameData.js"
import Ally from "./Ally.js";


export default class Civilian extends Ally {
    constructor(scene, x, y, name, texture, frame) {
        const entityData = ENTITY_DATA[name];
        super(scene, x, y, "civilian", "civilian", "civilian_idle_left", entityData);
        
        this.timer = 0;
        this.speed = 32;

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

    destroySelf() {
        super.destroySelf();
    }





    update(time, delta) {
        super.update();
        console.log("update")
        
        
        // console.log(this.currPath)
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
}