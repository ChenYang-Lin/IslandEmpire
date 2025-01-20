import { QUEST_DATA } from "../GameData.js";
import Quest from "./Quest.js";


export default class QuestManager {
    constructor(scene, hud) {
        this.scene = scene;
        this.hud = hud;

        this.questList = []
        this.activeQuest;
        this.questStatus = {
            "beginner-quest-one": {
                status: "inProgress",
                taskProgress: 0,
            },
        }

        
        this.questPrompt = document.getElementById("quest-prompt");
        this.questPromptTaskName = document.getElementById("quest-prompt-task-name");
        this.questPromptTaskDistance = document.getElementById("quest-prompt-task-distance");
        this.questPromptTaskHeading = document.getElementById("quest-prompt-task-heading");
        this.questPromptTaskHeading.addEventListener("pointerdown", () => {
            this.activeQuest.provideQuestAssistance();
        })



        setTimeout(() => {
            // this.restrictInput("shop-ui");
            // this.restrictInput("joystick");
        },100)

        this.initQuests();

        this.updateQuestPrompt();
    }

    initQuests() {
        this.questData = QUEST_DATA;

        Object.entries(this.questData).forEach(([questName, quest]) => {
            if (!this.questStatus[questName]) {
                this.questStatus[questName] = { status: "pending", taskProgress: 0 };
            } 
            let newQuest = new Quest(this, questName, quest, this.questStatus[questName]);
            if (!this.activeQuest) {
                this.activeQuest = newQuest;
            }
            this.questList.push(newQuest);
        })
    }

    updateQuestPrompt() {
        // console.log(this.activeQuest)
        if (this.activeQuest) {
            this.questPrompt.style.display = "block";
            this.questPromptTaskName.innerHTML = this.activeQuest?.getTaskName();
        } else {
            this.questPrompt.style.display = "none";
        }
    }

    showDirection(target) {
        this.hideDirection();

        this.updateDistance(target);

        this.directionSymbol = this.scene.add.sprite(target.x * 32, target.y * 32, "icon", "quest_icon_0");
        this.directionSymbol.depth = this.directionSymbol.y + 1000;
        this.directionSymbol.anims.play("quest_icon", true);


        this.playerMoveSub = this.scene.eventEmitter.subscribe(`player-move`, () => {
            this.updateDistance(target);
        });
    }

    updateDistance(target) {
        let player = this.scene.player.characterOnControl.onGrid;
        let distance = Math.sqrt( Math.pow((target.x - player.x), 2) + Math.pow((target.y - player.y), 2));

        if (distance <= 0) {
            this.directionSymbol?.setAlpha(0);
        } else {
            this.directionSymbol?.setAlpha(1);
        }
        this.questPromptTaskDistance.innerHTML = `${Math.ceil(distance)}m`;
    }

    hideDirection() {
        console.log("hide")
        this.directionSymbol?.destroy();
        this.directionSquare?.destroy();
        this.playerMoveSub?.unsubscribe();
        this.questPromptTaskDistance.innerHTML = `0m`;
    }

    restrictor(e) {
        console.log("clicking: ", e.target.id);
        if (e.target.id !== e.currentTarget.unrestrictedInput) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            document.removeEventListener('pointerdown', this.quest.restrictor, true);
            document.removeEventListener('touchmove', this.quest.restrictor, true);
            this.quest.box?.remove();
            this.quest.unrestrictedElement = null;
        }
    }

    restrictInput(unrestrictedInput) {
        this.unrestrictedElement = document.getElementById(unrestrictedInput);

        this.createBoxShadow();

        document.addEventListener("pointerdown", this.restrictor, true);
        document.addEventListener("touchmove", this.restrictor, true);
        document.unrestrictedInput = unrestrictedInput;
        document.quest = this;
    }

    createBoxShadow() {
        this.box?.remove();
        if (!this.unrestrictedElement)
            return

        var rect = this.unrestrictedElement.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);

        this.box = document.createElement("div");
        this.box.style.position = "absolute";
        this.box.style.left = `${rect.left}px`;
        this.box.style.top = `${rect.top}px`;
        this.box.style.width = `${rect.right - rect.left}px`;
        this.box.style.height = `${rect.bottom - rect.top}px`;
        // this.box.style.boxShadow = "0 0 0 10000px rgba(0, 0, 0, 0.8)";
        this.box.style.transition = "1s";

        setTimeout(() => {
            this.box.style.boxShadow = "0 0 0 10000px rgba(0, 0, 0, 0.8)";
        },50)

        document.getElementById("hud-wrapper").appendChild(this.box);
    }

}