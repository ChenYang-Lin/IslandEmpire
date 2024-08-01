
const ENTITY_DATA = {
    // Resources
    tree: {
        category: "resource",
        type: "multiple",
        repositionedX: 0,
        repositionedY: -16,
        imageWidth: 1,
        imageHeight: 2,
        width: 1,
        height: 1,
        offsetX: 0,
        offsetY: 1,
        maxHP: 1,
        drops: [
            "wood",
            "wood",
        ],
    },
    bush: {
        category: "resource",
        type: "single",
        repositionedX: 0,
        repositionedY: 0,
        imageWidth: 1,
        imageHeight: 1,
        width: 1,
        height: 1,
        offsetX: 0,
        offsetY: 0,
        maxHP: 1,
        drops: [
            "fiber",
        ],
    },
    rock: {
        category: "resource",
        type: "single",
        repositionedX: 0,
        repositionedY: 0,
        imageWidth: 1,
        imageHeight: 1,
        width: 1,
        height: 1,
        offsetX: 0,
        offsetY: 0,
        maxHP: 1,
        drops: [
            "stone",
            "stone",
        ]
    },

    "house": {
        category: "structure",
        imageWidth: 5,
        imageHeight: 7,
        width: 7,
        height: 4,
        offsetX: 1,
        offsetY: 3,
    },
    "tent": {
        category: "structure",
        imageWidth: 2,
        imageHeight: 3,
        width: 2,
        height: 2,
        offsetX: 0,
        offsetY: 1,
    },

}

const ITEM_DATA = {
    // Item - weapon
    sword: { category: "weapon", type: "sword", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, },

    // Item - material - material
    wood: { category: "material", type: "material", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "wood", },
    fiber: { category: "material", type: "material", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "fiber", },
    stone: { category: "material", type: "material", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "stone", },

    // Item - material - ingredient
    potato: { category: "material", type: "ingredient", name: "potato", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "potato", },
    eggplant: { category: "material", type: "ingredient", name: "eggplant", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "eggplant", },
    cauliflower: { category: "material", type: "ingredient", name: "cauliflower", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "cauliflower", },        
    drumstick_raw: { category: "material", type: "ingredient", name: "drumstick raw", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "drumstick_raw", },    
    egg: { category: "material", type: "ingredient", name: "egg", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "egg", },     

    // Item - consumable - food
    pumpkin: { category: "consumable", type: "food", name: "pumpkin", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "pumpkin", },
    corn: { category: "consumable", type: "food", name: "corn", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "corn", },
    apple: { category: "consumable", type: "food", name: "apple", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "apple", },
    bagel: { category: "consumable", type: "food", name: "bagel", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "bagel", },        
    banana: { category: "consumable", type: "food", name: "banana", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "banana", },        
    bread: { category: "consumable", type: "food", name: "bread", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "bread", },        
    burger: { category: "consumable", type: "food", name: "burger", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "burger", },        
    burrito: { category: "consumable", type: "food", name: "burrito", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "burrito", },        
    canned_food: { category: "consumable", type: "food", name: "canned food", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "canned_food", },        
    croissant: { category: "consumable", type: "food", name: "croissant", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "croissant", },        
    doughnut: { category: "consumable", type: "food", name: "doughnut", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "doughnut", },        
    drumstick_cooked: { category: "consumable", type: "food", name: "drumstick cooked", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "drumstick_cooked", },       
    
    // Item - farming - tool
    hoe: { category: "farming", type: "tool", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, },
    axe: { category: "farming", type: "tool", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, },
    pickaxe: { category: "farming", type: "tool", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, }, 

    // Item - farming - seed
    "potato_seed": { category: "farming", type: "seed", repositionedX: 0, repositionedY: -16, width: 32, height: 32, offsetX: 0, offsetY: 32, crop_grow: "potato_grow", },
    "eggplant_seed": { category: "farming", type: "seed", repositionedX: 0, repositionedY: -16, width: 32, height: 32, offsetX: 0, offsetY: 32, crop_grow: "eggplant_grow", },    
    "cauliflower_seed": {category: "farming", type: "seed", repositionedX: 0, repositionedY: -16, width: 32, height: 32, offsetX: 0, offsetY: 32, crop_grow: "cauliflower_grow", },
    "pumpkin_seed": { category: "farming", type: "seed", repositionedX: 0, repositionedY: -16, width: 32, height: 32, offsetX: 0, offsetY: 32, crop_grow: "pumpkin_grow", },
    "corn_seed": { category: "farming", type: "seed", repositionedX: 0, repositionedY: -16, width: 32, height: 32, offsetX: 0, offsetY: 32, crop_grow: "corn_grow", },
}

const CROP_GROW_DATA = {
    "potato_grow": { repositionedX: 0, repositionedY: -16, width: 32, height: 32, offsetX: 0, offsetY: 32, totalPhase: 5, timeToGrow: 6 * 1000, collectable: "potato", },
    "eggplant_grow": { repositionedX: 0, repositionedY: -16, width: 32, height: 32, offsetX: 0, offsetY: 32, totalPhase: 5, timeToGrow: 6 * 1000, collectable: "eggplant", },
    "cauliflower_grow": { repositionedX: 0, repositionedY: -16, width: 32, height: 32, offsetX: 0, offsetY: 32, totalPhase: 5, timeToGrow: 6 * 1000, collectable: "cauliflower", },
    "pumpkin_grow": { repositionedX: 0, repositionedY: -16, width: 32, height: 32, offsetX: 0, offsetY: 32, totalPhase: 5, timeToGrow: 6 * 1000, collectable: "pumpkin", },
    "corn_grow": { repositionedX: 0, repositionedY: -16, width: 32, height: 32, offsetX: 0, offsetY: 32, totalPhase: 5, timeToGrow: 6 * 1000, collectable: "corn", },
}

const SHOP_DATA = [
    { name: "potato", price: 10, limit: -1, },
    { name: "corn_seed", price: 10, limit: -1, },
    { name: "potato_seed", price: 10, limit: -1, },
    { name: "eggplant_seed", price: 10, limit: -1, },
    { name: "cauliflower_seed", price: 10, limit: -1, },
    { name: "pumpkin_seed", price: 10, limit: -1, },
    { name: "stone", price: 10, limit: -1, },
    { name: "wood", price: 10, limit: -1, },
]

const MAP_DATA = {
    "0,0": {
        isLand: true,
        entities: [
            "tree",
        ],
    },
    "0,1": {
        isLand: true,
        entities: [
            
        ],
    },
    "0,2": {
        isLand: true,
        entities: [

        ],
    },
    "0,3": {
        isLand: true,
        entities: [

        ],
    },
    "1,0": {
        isLand: true,
        entities: [

        ],
    },
    "1,1": {
        isLand: true,
        entities: [

        ],
    },
    "1,2": {
        isHoedLand: true,
        isLand: true,
        entities: [

        ],
    },
    "1,3": {
        isHoedLand: true,
        isLand: true,
        entities: [

        ],
    },
    "2,0": {
        isLand: true,
        entities: [
            "rock",
        ],
    },
    "2,1": {
        isLand: true,
        entities: [

        ],
    },
    "2,2": {
        isLand: true,
        entities: [
            "tree",
        ],
    },
    "2,3": {
        isLand: true,
        entities: [

        ],
    },
    "3,0": {
        isLand: true,
        entities: [
            
        ],
    },
    "3,1": {
        isLand: true,
        entities: [

        ],
    },
    "3,2": {
        isLand: true,
        entities: [

        ],
    },
    "3,3": {
        isLand: true,
        entities: [
            "bush"
        ],
    },
    "-3,3": {
        isLand: true,
        entities: [
            "bush"
        ],
    },
}



export {
    ENTITY_DATA,
    ITEM_DATA,
    CROP_GROW_DATA,
    SHOP_DATA,
    MAP_DATA,
}