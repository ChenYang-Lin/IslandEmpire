import { CRAFTABLE_INGREDIENTS_TABLE } from "./GameData.js";


export default class Crafting {
    constructor(scene) {
        this.scene = scene;

        this.craftingScreen = document.getElementById("crafting-container")
        
    }

    checkSufficientMaterial(craftableID) {
        let sufficientMaterial = true;
        let craftableIngredients = CRAFTABLE_INGREDIENTS_TABLE[craftableID];

        Object.entries(craftableIngredients).forEach(([name, quantity]) => {
            if (this.scene.inventory?.inventory[name] > quantity){
                // enough material
            } else {
                // NOT enough material
                console.log("not enough material")
                sufficientMaterial = false;
            }
        })

        return sufficientMaterial;
    }

    startCrafting(craftableID) {
        let sufficientMaterial = this.checkSufficientMaterial(craftableID)
        console.log(sufficientMaterial)
        if (!sufficientMaterial) {
            console.log("not sufficient material")
        }
        let craftableIngredients = CRAFTABLE_INGREDIENTS_TABLE[craftableID];
        Object.entries(craftableIngredients).forEach(([name, quantity]) => {
            console.log(name, quantity)
        })
    }

    renderCraftingWindow() {
        this.renderCraftingList();
    }

    renderCraftingList() {
        let craftingList = document.getElementById("crafting-list");
        craftingList.innerHTML = ``;

        let craftableIngredients = CRAFTABLE_INGREDIENTS_TABLE;

        Object.entries(craftableIngredients).entries().forEach(([index, [name, data]]) => {
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
        console.log(craftableID)

        let name = document.getElementById("craftable-name");
        let img = document.getElementById("craftable-img");
        let ingredients = document.getElementById("craftable-ingredients");
        let btn = document.getElementById("craftable-btn");

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
            sufficiency.innerHTML = `${hold}/${quantity}`;

            
            element.appendChild(ingredientImg);
            element.appendChild(sufficiency);
            ingredients.appendChild(element);
        })


    }

    openWindow() {
        this.renderCraftingWindow();
        this.craftingScreen.style.display = "block";
        this.scene.cssWindowOpened = true;
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