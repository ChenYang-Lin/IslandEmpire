

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
    // Items - materials
    wood: {
        category: "item",
        type: "material",
        repositionedX: 0,
        repositionedY: 0,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
        collectable: "wood",
    },
    fiber: {
        category: "item",
        type: "material",
        repositionedX: 0,
        repositionedY: 0,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
        collectable: "fiber",
    },
    stone: {
        category: "item",
        type: "material",
        repositionedX: 0,
        repositionedY: 0,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
        collectable: "stone",
    },
    // Item - weapon
    sword: {
        category: "weapon",
        type: "sword",
        repositionedX: 0,
        repositionedY: 0,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
    },
    // Item - tool
    hoe: {
        category: "tool",
        type: "hoe",
        repositionedX: 0,
        repositionedY: 0,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
    },
    axe: {
        category: "tool",
        type: "axe",
        repositionedX: 0,
        repositionedY: 0,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
    },
    pickaxe: {
        category: "tool",
        type: "pickaxe",
        repositionedX: 0,
        repositionedY: 0,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
    }, 
    "potato_seed": {
        category: "item",
        type: "seed",
        repositionedX: 0,
        repositionedY: -16,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 32,
        crop_grow: "potato_grow",
    },
    
    potato: {
        category: "item",
        type: "food",
        name: "Potato",
        repositionedX: 0,
        repositionedY: 0,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
        collectable: "potato",
    },
    "eggplant_seed": {
        category: "item",
        type: "seed",
        repositionedX: 0,
        repositionedY: -16,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 32,
        crop_grow: "eggplant_grow",
    },

    eggplant: {
        category: "item",
        type: "food",
        repositionedX: 0,
        repositionedY: 0,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
        collectable: "eggplant",
    },
    "cauliflower_seed": {
        category: "item",
        type: "seed",
        repositionedX: 0,
        repositionedY: -16,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 32,
        crop_grow: "cauliflower_grow",
    },

    cauliflower: {
        category: "item",
        type: "food",
        repositionedX: 0,
        repositionedY: 0,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
        collectable: "cauliflower",
    },
    "pumpkin_seed": {
        category: "item",
        type: "seed",
        repositionedX: 0,
        repositionedY: -16,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 32,
        crop_grow: "pumpkin_grow",
    },

    pumpkin: {
        category: "item",
        type: "food",
        repositionedX: 0,
        repositionedY: 0,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
        collectable: "pumpkin",
    },
    "corn_seed": {
        category: "item",
        type: "seed",
        repositionedX: 0,
        repositionedY: -16,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 32,
        crop_grow: "corn_grow",
    },

    corn: {
        category: "item",
        type: "food",
        repositionedX: 0,
        repositionedY: 0,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 0,
        collectable: "corn",
    },
}

const CROP_GROW_DATA = {
    "potato_grow": {
        repositionedX: 0,
        repositionedY: -16,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 32,
        totalPhase: 5,
        timeToGrow: 6 * 1000, // millisecond
        collectable: "potato",
    },
    "eggplant_grow": {
        repositionedX: 0,
        repositionedY: -16,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 32,
        totalPhase: 5,
        timeToGrow: 6 * 1000, // millisecond
        collectable: "eggplant",
    },
    "cauliflower_grow": {
        repositionedX: 0,
        repositionedY: -16,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 32,
        totalPhase: 5,
        timeToGrow: 6 * 1000, // millisecond
        collectable: "cauliflower",
    },
    "pumpkin_grow": {
        repositionedX: 0,
        repositionedY: -16,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 32,
        totalPhase: 5,
        timeToGrow: 6 * 1000, // millisecond
        collectable: "pumpkin",
    },
    "corn_grow": {
        repositionedX: 0,
        repositionedY: -16,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 32,
        totalPhase: 5,
        timeToGrow: 6 * 1000, // millisecond
        collectable: "corn",
    },
}

const SHOP_DATA = [
    {
        name: "potato",
        price: 10,
        limit: -1,
    },
    {
        name: "corn_seed",
        price: 10,
        limit: -1,
    },
    {
        name: "potato_seed",
        price: 10,
        limit: -1,
    },
    {
        name: "eggplant_seed",
        price: 10,
        limit: -1,
    },
    {
        name: "cauliflower_seed",
        price: 10,
        limit: -1,
    },
    {
        name: "pumpkin_seed",
        price: 10,
        limit: -1,
    },
    {
        name: "stone",
        price: 10,
        limit: -1,
    },
    {
        name: "wood",
        price: 10,
        limit: -1,
    },
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