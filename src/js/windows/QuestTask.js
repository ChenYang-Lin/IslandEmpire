

export default class QuestTask {
    constructor(quest, questManager, task) {
        this.quest = quest;
        this.questManager = questManager;
        this.task = task;
    }

    startTask() {
        if (this.task.type === "input") {
            this.sub = this.questManager.scene.eventEmitter.subscribe(`pointerdown-${this.task.target}`, () => {
                
                this.sub.unsubscribe();
                this.taskComplete();
            });
        }

            
        
    }

    showDirection() {
        console.log("showing direction")
        this.questManager.restrictInput(this.task.target);
    }

    taskComplete() {
        console.log("task complete: ", this.task.name);
        this.quest.taskProgress++;
        this.quest.startNextTask();
    }
}