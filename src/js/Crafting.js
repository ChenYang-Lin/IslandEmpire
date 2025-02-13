import { CRAFTABLE_INGREDIENTS_TABLE } from "./GameData.js";


export default class Crafting {
    constructor(scene) {
        this.scene = scene;

        this.craftingScreen = document.getElementById("crafting-container")
        
        this.exitBtn = document.getElementById("crafting-exit-btn")
        this.exitBtn.addEventListener("pointerdown", () => {
            this.closeWindow();
        })

        this.craftBtn = document.getElementById("craftable-craft-btn");
        this.craftBtn.addEventListener("pointerdown", () => {
            this.startCrafting(this.selectedCraftableID);
        })
    }

    checkSufficientMaterial(craftableID) {
        let sufficientMaterial = true;
        let craftableIngredients = CRAFTABLE_INGREDIENTS_TABLE[craftableID];

        Object.entries(craftableIngredients).forEach(([name, quantity]) => {
            if (this.scene.inventory?.inventory[name] > quantity){
                // enough material
            } else {
                // NOT enough material
                sufficientMaterial = false;
            }
        })

        return sufficientMaterial;
    }

    startCrafting(craftableID) {
        if (!craftableID) 
            return;

        let sufficientMaterial = this.checkSufficientMaterial(craftableID)
        if (!sufficientMaterial) {
            console.log("not sufficient material");
            return;
        }

        let craftableIngredients = CRAFTABLE_INGREDIENTS_TABLE[craftableID];
        Object.entries(craftableIngredients).forEach(([name, quantity]) => {
            if (this.scene.inventory?.inventory[name] > quantity){
                // enough material
                this.scene.inventory.inventory[name] -= quantity;
            } else {
                // NOT enough material
                console.log("ERROR: not enough material")
            }
        })
        // this.scene.inventory.addItem(craftableID, 1);
        this.scene.hud.reward.showRewardScreen([{ name: craftableID, quantity: 1}])
        this.renderCraftingDetail(craftableID);
    }

    renderCraftingWindow() {
        console.log("renderCraftingWindow")
        this.renderCraftingList();
    }

    renderCraftingList() {
        console.log("renderCraftingList")
        let craftingList = document.getElementById("crafting-list");
        craftingList.innerHTML = ``;

        let craftableIngredients = CRAFTABLE_INGREDIENTS_TABLE;
        console.log(craftableIngredients);

        Object.entries(craftableIngredients).entries().forEach(([index, [name, data]]) => {
            console.log(name)
            if (index === 0) {
                this.renderCraftingDetail(name)
            }
            let element = document.createElement("div");
            element.classList.add("craftable-element");
            element.addEventListener("pointerdown", () => {
                this.renderCraftingDetail(name);
            })

            let elementImg = document.createElement("img");
            elementImg.classList.add("panel-item-img");
            elementImg.classList.add("pointer-event-none");
            elementImg.src = this.scene.sys.game.textures.getBase64("construction", name);

            element.appendChild(elementImg);
            craftingList.appendChild(element);
        })
    }

    renderCraftingDetail(craftableID) {
        console.log("renderCraftingDetail")
        // console.log(craftableID)
        this.selectedCraftableID = craftableID;

        let name = document.getElementById("craftable-name");
        let img = document.getElementById("craftable-img");
        let ingredients = document.getElementById("craftable-ingredients");
        let btn = document.getElementById("craftable-craft-btn");

        // Name
        name.innerHTML = craftableID;
        
        // Img
        img.innerHTML = ``;
        let craftableImg = document.createElement("img");
        craftableImg.classList.add("craftable-img")
        craftableImg.src = this.scene.sys.game.textures.getBase64("construction", craftableID);
        img.appendChild(craftableImg);

        // Ingredients
        ingredients.innerHTML = ``
        let craftableIngredients = CRAFTABLE_INGREDIENTS_TABLE[craftableID];
        Object.entries(craftableIngredients).forEach(([name, quantity]) => {


            let element = document.createElement("div");
            element.classList.add("craftable-ingredients-element");

            let ingredientImg = document.createElement("img");
            ingredientImg.classList.add("craftable-ingredients-img")
            ingredientImg.src = this.scene.sys.game.textures.getBase64("item", name);

            let sufficiency = document.createElement("div");
            sufficiency.classList.add("craftable-ingredients-sufficiency");
            
            let hold = this.scene.inventory.inventory[name] ?? 0;

            let holdDiv = document.createElement("span");
            if (hold < quantity) {
                holdDiv.style.color = "red"
            } else {
                holdDiv.style.color = "green"
            }
            holdDiv.innerHTML = `${hold}`;

            let quantityDiv = document.createElement("span");
            quantityDiv.innerHTML = `/${quantity}`;

            
            sufficiency.appendChild(holdDiv);
            sufficiency.appendChild(quantityDiv);
            element.appendChild(ingredientImg);
            element.appendChild(sufficiency);
            ingredients.appendChild(element);
        })

        // Craft Btn
        let sufficientMaterial = this.checkSufficientMaterial(craftableID);
        if (!sufficientMaterial) {
            btn.style.pointerEvents = "none";
            btn.style.cursor = "auto";
            btn.style.color = "rgba(255, 255, 255, 0.5)";
            btn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            btn.style.borderColor = "rgba(255, 255, 255, 0.5)";
        } else {
            btn.style.pointerEvents = "auto";
            btn.style.cursor = "pointer";
            btn.style.color = "rgb(0, 0, 0)";
            btn.style.backgroundColor = "rgb(255, 255, 255)";
            btn.style.borderColor = "rgba(255, 255, 255, 1)";
        }

    }

    openWindow() {
        console.log("open crafting window");
        this.craftingScreen.style.display = "block";
        this.scene.cssWindowOpened = true;
        this.renderCraftingWindow();
    }

    closeWindow() {
        this.craftingScreen.style.display = "none";
        this.scene.cssWindowOpened = false;
    }

    toggleWindow() {
        let style = window.getComputedStyle(this.craftingScreen);
        if (style.display === "none") {
            this.openWindow();
        } else {
            this.closeWindow();
        }
    }

}