import { QUEST_DATA } from "../GameData.js";


export default class QuestManager {
    constructor(scene, hud) {
        this.scene = scene;
        this.hud = hud;


        setTimeout(() => {
            // this.restrictInput("shop-ui");
            this.restrictInput("joystick");
        },100)

        this.initQuests();
    }

    initQuests() {
        this.questData = QUEST_DATA;

        Object.entries(this.questData).forEach(([key, value]) => {
            
        })
    }

    restrictor(e) {
        console.log(e.target.id);
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
        this.box.style.border = "1px solid red"
        this.box.style.boxShadow = "0 0 0 10000px rgba(0, 0, 0, 0.8)";

        document.getElementById("hud-wrapper").appendChild(this.box);
    }

}