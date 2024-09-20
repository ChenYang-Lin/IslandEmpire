
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

}

const ITEM_DATA = {
    // Item - weapon
    sword: { category: "weapon", type: "sword", imageWidth: 0, imageHeight: 0, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, },

    // Item - material - material
    wood: { category: "material", type: "material", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "wood", },
    fiber: { category: "material", type: "material", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "fiber", },
    stone: { category: "material", type: "material", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "stone", },

    // Item - material - ingredient
    potato: { category: "material", type: "ingredient", name: "potato", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "potato", },
    eggplant: { category: "material", type: "ingredient", name: "eggplant", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "eggplant", },
    cauliflower: { category: "material", type: "ingredient", name: "cauliflower", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "cauliflower", },        
    drumstick_raw: { category: "material", type: "ingredient", name: "drumstick raw", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "drumstick_raw", },    
    egg: { category: "material", type: "ingredient", name: "egg", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "egg", },     

    // Item - consumable - food
    pumpkin: { category: "consumable", type: "food", name: "pumpkin", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "pumpkin", },
    corn: { category: "consumable", type: "food", name: "corn", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "corn", },
    apple: { category: "consumable", type: "food", name: "apple", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "apple", },
    bagel: { category: "consumable", type: "food", name: "bagel", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "bagel", },        
    banana: { category: "consumable", type: "food", name: "banana", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "banana", },        
    bread: { category: "consumable", type: "food", name: "bread", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "bread", },        
    burger: { category: "consumable", type: "food", name: "burger", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "burger", },        
    burrito: { category: "consumable", type: "food", name: "burrito", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "burrito", },        
    canned_food: { category: "consumable", type: "food", name: "canned food", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "canned_food", },        
    croissant: { category: "consumable", type: "food", name: "croissant", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "croissant", },        
    doughnut: { category: "consumable", type: "food", name: "doughnut", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "doughnut", },        
    drumstick_cooked: { category: "consumable", type: "food", name: "drumstick cooked", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, collectable: "drumstick_cooked", },       
    
    // Item - farming - tool
    hoe: { category: "farming", type: "tool", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, },
    axe: { category: "farming", type: "tool", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, },
    pickaxe: { category: "farming", type: "tool", imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, }, 

    // Item - farming - seed
    "potato_seed": { category: "farming", type: "seed", imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, crop_grow: "potato_grow", },
    "eggplant_seed": { category: "farming", type: "seed", imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, crop_grow: "eggplant_grow", },    
    "cauliflower_seed": {category: "farming", type: "seed", imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, crop_grow: "cauliflower_grow", },
    "pumpkin_seed": { category: "farming", type: "seed", imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, crop_grow: "pumpkin_grow", },
    "corn_seed": { category: "farming", type: "seed", imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, crop_grow: "corn_grow", },
}

const CROP_GROW_DATA = {
    "potato_grow": { imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, totalPhase: 5, timeToGrow: 6 * 1000, collectable: "potato", },
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
                spawn: {
                    
                },
                direction: null,
                checkpoint: true,
            },
            {
                name: "Attack",
                description: "Attack",
                type: "pointerdown",
                target: "attack-btn",
                direction: null,
            },
            {
                name: "Move to the left side of the tree",
                description: "Move to the left side of the tree",
                type: "arrival",
                target: "2,-3",
                direction: "2,-3",
            },
            {
                name: "Cut down the tree",
                description: "Cut down the tree",
                type: "teach-kill",
                target: "tree",
                direction: "3,-3",
            },
            {
                name: "Pick up woods",
                description: "Pick up woods",
                type: "pickup",
                target: "wood",
                direction: null,
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
    "0,-3":  { isLand: true, entities: [ ], },
    "0,-2":  { isLand: true, entities: [ ], },
    "0,-1":  { isLand: true, entities: [ ], },
    "0,0":   { isLand: true, entities: [ ], },
 
    "1,-3":  { isLand: true, entities: [ ], },
    "1,-2":  { isLand: true, entities: [ ], },
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

}



export {
    ENTITY_DATA,
    ITEM_DATA,
    CROP_GROW_DATA,
    SHOP_DATA,
    QUEST_DATA,
    MAP_DATA,
}