import Resource from "../entity/Resource.js";


export default class QuestTask {
    constructor(quest, questManager, task) {
        this.quest = quest;
        this.questManager = questManager;
        this.task = task;
    }

    startTask() {
        this.task?.spawn?.forEach((spawnEntity)  => {
            let objectExist = false;
            console.log(this.questManager.scene.worldManager.map[spawnEntity.location].entities);
            this.questManager.scene.worldManager.map[spawnEntity.location].entities.forEach((entity) => {
                console.log(entity.name, spawnEntity.name)
                if (entity.name === spawnEntity.name) {
                    objectExist = true;
                }
            })
            if (!objectExist) {
                console.log("SPAWN ENTITY")
                let x = parseInt(spawnEntity.location.split(",")[0], 10) * 32;
                let y = parseInt(spawnEntity.location.split(",")[1], 10) * 32;
                new Resource(this.questManager.scene, spawnEntity.name, spawnEntity.name, x, y, "resource");
            }
        })

        

        switch (this.task.completion.type) {
            case "pointerdown": 
                console.log(`clicking: pointerdown-${this.task.completion.target}`)
                this.sub = this.questManager.scene.eventEmitter.subscribe(`pointerdown-${this.task.completion.target}`, () => {
                    this.sub.unsubscribe();
                    this.taskComplete();
                });
                break;
            case "arrival":
                this.sub = this.questManager.scene.eventEmitter.subscribe(`player-move`, () => {
                    let player = this.questManager.scene.player;
                    let playerOnGrid = `${player.characterOnControl.onGrid.x},${player.characterOnControl.onGrid.y}`;
        
                    if (this.task.completion.target === playerOnGrid) {
                        this.sub.unsubscribe();
                        this.taskComplete();
                    }
                });
                break;
            case "kill":
                this.sub = this.questManager.scene.eventEmitter.subscribe(`player-destroy-${this.task.target}`, () => {
                    this.sub.unsubscribe();
                    this.taskComplete();
                });
            case "pickup":
                this.sub = this.questManager.scene.eventEmitter.subscribe(`pickup-${this.task.target}`, () => {
                    this.sub.unsubscribe();
                    this.taskComplete();
                });
                break;
            default:
        } 

        if (this.task.direction) {
            let target ={
                x: parseInt(this.task.direction.split(",")[0], 10),
                y: parseInt(this.task.direction.split(",")[1], 10),
            };
            this.questManager.showDirection(target);
        }


        
    }

    provideAssistance() {



        switch (this.task.hint.type) {
            case "restriction":
                this.questManager.restrictInput(this.task.hint.target);
                break;
            case "arrival":
                console.log(parseInt(this.task.hint.target.split(",")[0]))
                let path = this.questManager.scene.worldManager.astar.findPath(
                    this.questManager.scene.worldManager.map, 
                    {tx: this.questManager.scene.player.onGrid.x, ty: this.questManager.scene.player.onGrid.y}, 
                    {tx: parseInt(this.task.hint.target.split(",")[0]), ty: parseInt(this.task.hint.target.split(",")[1])}, 
                    this.questManager.scene,
                )
                this.questManager.scene.player.autoMoveToGridCell(path);
            case "kill":
                
            default:
        }
    }

    taskComplete() {
        console.log("task complete: ", this.task.name);
        this.questManager.hideDirection();
        this.quest.taskProgress++;
        this.quest.startNextTask();
    }
}