import QuestTask from "./QuestTask.js";



export default class Quest {
    constructor(questManager, questName, quest, questStatus) {
        this.questManager = questManager;
        this.questName = questName;
        this.quest = quest;
        this.status = questStatus.status ?? "pending";
        this.taskProgress = questStatus.taskProgress ?? 0;

        this.taskList = [];

        this.initQuestTasks();
    }

    initQuestTasks() {
        this.quest.tasks.forEach((task) => {
            let newTask = new QuestTask(this, this.questManager, task);
            this.taskList.push(newTask);
        })

        this.startQuest();
    }

    startQuest() {
        if (this.status === "inProgress") {
            this.startNextTask();
        }
    }

    showTaskDirection() {
        this.taskList[this.taskProgress].showDirection();
    }

    getTaskName() {
        return this.taskList[this.taskProgress].task.name;
    }

    startNextTask() {
        console.log(this.taskProgress, this.taskList.length)
        if (this.taskProgress < this.taskList.length) {
            this.taskList[this.taskProgress].startTask();
        } else {
            this.questComplete();
        }
        this.questManager.updateQuestPrompt();
    }

    questComplete() {
        console.log("quest complete: ", this.questName);
        this.questManager.activeQuest = undefined;
    }
}