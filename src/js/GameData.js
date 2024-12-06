
const ENTITY_DATA = {
    // Resources
    tree: {
        category: "resource",
        type: "multiple",
        imageWidth: 1,
        imageHeight: 2,
        colliderWidth: 1,
        colliderHeight: 1,
        offsetX: 0,
        offsetY: 1,
        transparentHitBox: [
            {
                transparentWidth: 1,
                transparentHeight: 5,
                transparentOffsetX: 1,
                transparentOffsetY: 0,
            },
            {
                transparentWidth: 3,
                transparentHeight: 2,
                transparentOffsetX: 0,
                transparentOffsetY: 2,
            },
        ],
        maxHP: 1,
        drops: [
            "wood",
            "wood",
        ],
    },
    bush: {
        category: "resource",
        type: "single",
        imageWidth: 1,
        imageHeight: 1,
        colliderWidth: 1,
        colliderHeight: 1,
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
        imageWidth: 1,
        imageHeight: 1,
        colliderWidth: 1,
        colliderHeight: 1,
        offsetX: 0,
        offsetY: 0,
        maxHP: 1,
        drops: [
            "stone",
            "stone",
        ]
    },

    player: {
        imageWidth: 6,
        imageHeight: 6,
        colliderWidth: 0.5, 
        colliderHeight: 0.5,
        offsetX: 2.75,
        offsetY: 3.5,
        hpBarOffsetY: 48,
    },

    goblin: {
        imageWidth: 6,
        imageHeight: 6,
        colliderWidth: 0.5, 
        colliderHeight: 0.5,
        offsetX: 2.75,
        offsetY: 3.5,
        hpBarOffsetY: 48,
    },

    raft: {
        imageWidth: 5,
        imageHeight: 5,
        colliderWidth: 1,
        colliderHeight: 1,
        offsetX: 2,
        offsetY: 2,
    },  

    "house": {
        category: "structure",
        imageWidth: 5,
        imageHeight: 7,
        colliderWidth: 5,
        colliderHeight: 3,
        offsetX: 0,
        offsetY: 3,
    },
    "tent": {
        category: "structure",
        imageWidth: 2,
        imageHeight: 3,
        colliderWidth: 2,
        colliderHeight: 2,
        offsetX: 0,
        offsetY: 1,
    },
    "water_collector": {
        category: "structure",
        imageWidth: 1,
        imageHeight: 1,
        colliderWidth: 1,
        colliderHeight: 1,
        offsetX: 0,
        offsetY: 0,
    },
    "home_0": {
        category: "structure",
        imageWidth: 2,
        imageHeight: 3,
        colliderWidth: 2,
        colliderHeight: 2,
        offsetX: 0,
        offsetY: 1,
        transparentHitBox: [
            {
                transparentWidth: 0.5,
                transparentHeight: 0.5,
                transparentOffsetX: 1.25,
                transparentOffsetY: 2,
            },
        ],
        interaction: [
            {
                type: "entrance",
                name: "entrance",
                destination: "home",
                interactionWidth: 0.5,
                interactionHeight: 0.5,
                interactionOffsetX: .25,
                interactionOffsetY: 1.5,
            }
        ]
    },
    "home_1": {
        category: "structure",
        imageWidth: 2,
        imageHeight: 3,
        colliderWidth: 2,
        colliderHeight: 2,
        offsetX: 0,
        offsetY: 1,
    },
    
}

const ITEM_DATA = {
    // default: 
    // Item - weapon
    sword: { quality: 4, category: "weapon", type: "sword", imageWidth: 0, imageHeight: 0, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, },

    // Item - construction
    house: { quality: 1, category: "construction", type: "structure", },

    // Item - material - material
    wood: { quality: 1, category: "material", type: "material", interaction: [ { type: "collectable", name: "wood", quantity: 1 }, ]  },
    fiber: { quality: 1, category: "material", type: "material", collectable: "fiber", },
    stone: { quality: 1, category: "material", type: "material", collectable: "stone", },

    // Item - material - ingredient
    potato: { quality: 1, category: "material", type: "ingredient", name: "potato", collectable: "potato", },
    eggplant: { quality: 1, category: "material", type: "ingredient", name: "eggplant", collectable: "eggplant", },
    cauliflower: { quality: 1, category: "material", type: "ingredient", name: "cauliflower", collectable: "cauliflower", },        
    drumstick_raw: { quality: 1, category: "material", type: "ingredient", name: "drumstick raw", collectable: "drumstick_raw", },    
    egg: { quality: 1, category: "material", type: "ingredient", name: "egg", collectable: "egg", },     

    // Item - consumable - food
    pumpkin:    { quality: 1, category: "consumable", type: "food", name: "pumpkin", collectable: "pumpkin", },
    corn:       { quality: 1, category: "consumable", type: "food", name: "corn", collectable: "corn", },
    apple:      { quality: 1, category: "consumable", type: "food", name: "apple", collectable: "apple", },
    bagel:      { quality: 1, category: "consumable", type: "food", name: "bagel", collectable: "bagel", },        
    banana:     { quality: 1, category: "consumable", type: "food", name: "banana", collectable: "banana", },        
    bread:      { quality: 1, category: "consumable", type: "food", name: "bread", collectable: "bread", },        
    burger:     { quality: 1, category: "consumable", type: "food", name: "burger", collectable: "burger", },        
    burrito:    { quality: 1, category: "consumable", type: "food", name: "burrito", collectable: "burrito", },        
    canned_food: { quality: 1, category: "consumable", type: "food", name: "canned food", collectable: "canned_food", },        
    croissant:  { quality: 1, category: "consumable", type: "food", name: "croissant", collectable: "croissant", },        
    doughnut:   { quality: 1, category: "consumable", type: "food", name: "doughnut", collectable: "doughnut", },        
    drumstick_cooked: { quality: 1, category: "consumable", type: "food", name: "drumstick cooked", collectable: "drumstick_cooked", },       
    
    // Item - farming - tool
    hoe: { quality: 3, category: "farming", type: "tool", },
    axe: { quality: 3, category: "farming", type: "tool", },
    pickaxe: { quality: 3, category: "farming", type: "tool", }, 
    fishingrod: { quality: 5, category: "farming", type: "tool", }, 

    // Item - farming - seed
    "potato_seed": { quality: 2, category: "farming", type: "seed", imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, crop_grow: "potato_grow", },
    "eggplant_seed": { quality: 2, category: "farming", type: "seed", imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, crop_grow: "eggplant_grow", },    
    "cauliflower_seed": { quality: 2, category: "farming", type: "seed", imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, crop_grow: "cauliflower_grow", },
    "pumpkin_seed": { quality: 2, category: "farming", type: "seed", imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, crop_grow: "pumpkin_grow", },
    "corn_seed": { quality: 2, category: "farming", type: "seed", imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, crop_grow: "corn_grow", },
}

const ITEM_ON_USE_DATA = {
    banana: { hunger: 20 },
    bread: { hunger: 20 },
    burger: { hp: 20 },
}

const CROP_GROW_DATA = {
    "potato_grow": { imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, totalPhase: 5, timeToGrow: 6 * 1000, interaction: [ { type: "collectable", name: "potato", quantity: 1 }, ]  },
    "eggplant_grow": { imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, totalPhase: 5, timeToGrow: 6 * 1000, collectable: "eggplant", },
    "cauliflower_grow": { imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, totalPhase: 5, timeToGrow: 6 * 1000, collectable: "cauliflower", },
    "pumpkin_grow": { imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, totalPhase: 5, timeToGrow: 6 * 1000, collectable: "pumpkin", },
    "corn_grow": { imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, totalPhase: 5, timeToGrow: 6 * 1000, collectable: "corn", },
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

const QUEST_DATA = {
    "beginner-quest-one": {
        prev_quest: null,
        tasks: [
            {
                name: "Move around",
                description: "Move around",
                completion: {
                    type: "pointerdown",
                    target: "joystick",
                },
                hint: {
                    type: "restriction",
                    target: "joystick",
                },
                spawn: [],
                direction: null,
                checkpoint: true,
            },
            {
                name: "Attack",
                description: "Attack",
                completion: {
                    type: "pointerdown",
                    target: "attack-btn",
                },
                hint: {
                    type: "restriction",
                    target: "attack-btn",
                },
                spawn: [],
                direction: null,
                checkpoint: true,
            },
            {
                name: "Move to the left side of the tree",
                description: "Move to the left side of the tree",
                completion: {
                    type: "arrival",
                    target: "2,-3",
                },
                hint: {
                    type: "arrival",
                    target: "2,-3",
                },
                spawn: [
                    {
                        name: "tree",
                        location: "3,-3",
                    }
                ],
                direction: "2,-3",
                checkpoint: true,
            },
            {
                name: "Cut down the tree",
                description: "Cut down the tree",
                completion: {
                    type: "kill",
                    target: "tree",
                },
                hint: {
                    type: "arrival",
                    target: "3,-3",
                },
                spawn: [
                    {
                        name: "tree",
                        location: "3,-3",
                    }
                ],
                direction: "3,-3",
                checkpoint: true,
            },
            {
                name: "Pick up woods",
                description: "Pick up woods",
                completion: {
                    type: "pickup",
                    target: "wood",
                },
                hint: {},
                spawn: [],
                direction: null,
                checkpoint: true,
            },
        ]
    },
    "beginner-quest-two": {
        prev_quest: null,
        tasks: [
            {
                name: "Harvest crop",
                description: "Harvest crop",
                type: "pickup",
                target: "crop",
                direction: null,
            },
        ]
    }
}

const MAP_DATA = {
    "island": {
        "0,-3":  { isLand: true, entities: [ { name: "tree" }, ], },
        "0,-2":  { isLand: true, entities: [ ], },
        "0,-1":  { isLand: true, entities: [ ], },
        "0,0":   { isLand: true, entities: [ ], },
     
        "1,-3":  { isLand: true, entities: [ ], },
        "1,-2":  { isLand: true, entities: [ { name: "home_0" }, ], },
        "1,-1":  { isLand: true, entities: [ ], },
        "1,0":   { isLand: true, entities: [ ], },
     
        "2,-3":  { isLand: true, entities: [ ], },
        "2,-2":  { isLand: true, entities: [ ], },
        "2,-1":  { isLand: true, entities: [ ], },
        "2,0":   { isLand: true, entities: [ ], },
     
        "3,-3":  { isLand: true, entities: [ { name: "tree" }, ], },
        "3,-2":  { isLand: true, entities: [ ], },
        "3,-1":  { isLand: true, entities: [ ], },
        "3,0":   { isHoedLand: true, isLand: true, entities: [ ], },
    },
    "home": {
        "0,-1":  { isLand: true, entities: [ ], },
        "0,0":   { isLand: true, entities: [ ], },
     
        "1,-1":  { isLand: true, entities: [ ], },
        "1,0":   { isLand: true, entities: [ ], },
    },

}

const HOME_DATA = {
    "0,0":   { entities: [ { name: "bed" }, ], },
}



export {
    ENTITY_DATA,
    ITEM_DATA,
    ITEM_ON_USE_DATA,
    CROP_GROW_DATA,
    SHOP_DATA,
    QUEST_DATA,
    MAP_DATA,
}