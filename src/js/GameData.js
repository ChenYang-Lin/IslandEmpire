

const RESOURCE_DATA = {
    // Resources
    tree: {
        category: "resource",
        type: "multiple",
        repositionedX: 0,
        repositionedY: -16,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 32,
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
        width: 32,
        height: 32,
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
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
        maxHP: 1,
        drops: [
            "stone",
            "stone",
        ]
    },

}

const ITEM_DATA = {
    // Item - material
    wood: { category: "material", type: "material", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "wood", },
    fiber: { category: "material", type: "material", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "fiber", },
    stone: { category: "material", type: "material", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "stone", },

    // Item - weapon
    sword: { category: "weapon", type: "sword", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, },

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

    // Item - consumable - food
    potato: { category: "consumable", type: "food", name: "Potato", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "potato", },
    eggplant: { category: "consumable", type: "food", name: "Eggplant", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "eggplant", },
    cauliflower: { category: "consumable", type: "food", name: "Cauliflower", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "cauliflower", },
    pumpkin: { category: "consumable", type: "food", name: "Pumpkin", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "pumpkin", },
    corn: { category: "consumable", type: "food", name: "Corn", repositionedX: 0, repositionedY: 0, width: 32, height: 32, offsetX: 0, offsetY: 0, collectable: "corn", },
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

const CONSTRUCTION_DATA = {
    "soil": {
        width: 1,
        height: 1,
    },
    // "house": {
    //     width: 3,
    //     height: 3,
    // }
}

export {
    RESOURCE_DATA,
    ITEM_DATA,
    CROP_GROW_DATA,
    SHOP_DATA,
    MAP_DATA,
    CONSTRUCTION_DATA
}