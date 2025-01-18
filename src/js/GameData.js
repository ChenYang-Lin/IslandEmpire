
const ENTITY_DATA = {
    player:   { texture: "player",   frame: "player_idle_right",  imageWidth: 6, imageHeight: 6, colliderWidth: 0.5, colliderHeight: 0.5, offsetX: 2.75, offsetY: 3.5, hpBarOffsetY: 48, },
    civilian: { texture: "civilian", frame: "civilian_idle_down", imageWidth: 6, imageHeight: 6, colliderWidth: 0.5, colliderHeight: 0.5, offsetX: 2.75, offsetY: 3.5, hpBarOffsetY: 48, },
    soldier:  { texture: "soldier",  frame: "soldier_idle_down",  imageWidth: 4, imageHeight: 4, colliderWidth: 0.5, colliderHeight: 0.5, offsetX: 1.75,  offsetY: 2.5, hpBarOffsetY: 48, },
    piglet:   { texture: "animal",   frame: "piglet_idle_down",   imageWidth: 1, imageHeight: 1, colliderWidth: 1,   colliderHeight: 1,   offsetX: 0,    offsetY: 0,   hpBarOffsetY: 48, },
    goblin:   { texture: "goblin",   frame: "goblin_idle_down",   imageWidth: 6, imageHeight: 6, colliderWidth: 0.5, colliderHeight: 0.5, offsetX: 2.75, offsetY: 3.5, hpBarOffsetY: 48, },
    raft:     { texture: "raft",     frame: "raft_move_right_0",  imageWidth: 5, imageHeight: 5, colliderWidth: 1,   colliderHeight: 1,   offsetX: 2,    offsetY: 2, },  

    // Resources
    tree:  {category: "resource", type: "multiple", texture: "resource", frame: "tree_whole", collidable: true, imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, maxHP: 1, drops: [ "wood", "wood", ], },
    weeds: {category: "resource", type: "single",   texture: "resource", frame: "weeds",    collidable: true, imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, maxHP: 1, drops: [ "fiber", ], },
    rock:  {category: "resource", type: "single",   texture: "resource", frame: "rock",     collidable: true, imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, maxHP: 1, drops: [ "stone", "stone", ] },

    "water_collector": { type: "water_collector", category: "craftable", texture: "resource", frame: "water_collector", collidable: true, imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, },
    "house":           { type: "structure", category: "craftable", texture: "construction", frame: "house", collidable: true, imageWidth: 5, imageHeight: 7, colliderWidth: 5, colliderHeight: 3, offsetX: 0, offsetY: 3, },
    "tent":            { type: "structure", category: "craftable", texture: "construction", frame: "tent", collidable: true, imageWidth: 2, imageHeight: 3, colliderWidth: 2, colliderHeight: 2, offsetX: 0, offsetY: 1, },
    "home_0":          { type: "structure", category: "craftable", texture: "construction", frame: "home_0", collidable: true, imageWidth: 2, imageHeight: 3, colliderWidth: 2, colliderHeight: 2, offsetX: 0, offsetY: 1, },
    "home_1":          { type: "structure", category: "craftable", texture: "construction", frame: "home_1", collidable: true, imageWidth: 2, imageHeight: 3, colliderWidth: 2, colliderHeight: 2, offsetX: 0, offsetY: 1, },
    "bed":             { type: "decoration", category: "craftable", texture: "entity", frame: "bed", collidable: true, imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, },
    "entrance_rug":    { imageWidth: 2, imageHeight: 1, colliderWidth: 2, colliderHeight: 1, offsetX: 0, offsetY: 0, offsetDepth: -100, },

    "portal-infinite-forest": { imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, texture: "portal", frame: "portal_0", animation: "portal", },
    "portal-island": { imageWidth: 1, imageHeight: 1, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, texture: "portal", frame: "portal_0", animation: "portal",},

    // Crops entity
    "potato_grow":      { texture: "crops_grow", frame: "potato_grow_5",       imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, },
    "eggplant_grow":    { texture: "crops_grow", frame: "eggplant_grow_5",     imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, },
    "cauliflower_grow": { texture: "crops_grow", frame: "cauliflower_grow_5",  imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, },
    "pumpkin_grow":     { texture: "crops_grow", frame: "pumpkin_grow_5",      imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, },
    "corn_grow":        { texture: "crops_grow", frame: "corn_grow_5",         imageWidth: 1, imageHeight: 2, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 1, },

    // Item - weapon
    sword: { quality: 4, category: "weapon", type: "sword", imageWidth: 0, imageHeight: 0, colliderWidth: 1, colliderHeight: 1, offsetX: 0, offsetY: 0, },

    // Item - construction
    house: { quality: 1, category: "construction", type: "structure", },

    // Item - material - material
    wood:  { quality: 1, category: "material", type: "material", interaction: [ { type: "collectable", name: "wood", quantity: 1 }, ]  },
    fiber: { quality: 1, category: "material", type: "material", interaction: [ { type: "collectable", name: "fiber", quantity: 1 }, ] },
    stone: { quality: 1, category: "material", type: "material", interaction: [ { type: "collectable", name: "stone", quantity: 1 }, ] },


    // Item - material - ingredient
    potato:        { quality: 1, type: "ingredient", category: "material", name: "potato",        texture: "item", frame: "potato",},
    eggplant:      { quality: 1, type: "ingredient", category: "material", name: "eggplant",      texture: "item", frame: "eggplant", },
    cauliflower:   { quality: 1, type: "ingredient", category: "material", name: "cauliflower",   texture: "item", frame: "cauliflower", },        
    drumstick_raw: { quality: 1, type: "ingredient", category: "material", name: "drumstick raw", texture: "item", frame: "drumstick_raw", },    
    egg:           { quality: 1, type: "ingredient", category: "material", name: "egg",           texture: "item", frame: "egg", },

    
    // Item - consumable - food
    pumpkin:     { quality: 1, type: "food", category: "consumable", name: "pumpkin",     texture: "item", frame: "pumpkin" },
    corn:        { quality: 1, type: "food", category: "consumable", name: "corn",        texture: "item", frame: "corn" },
    apple:       { quality: 1, type: "food", category: "consumable", name: "apple",       texture: "item", frame: "apple" },
    bagel:       { quality: 1, type: "food", category: "consumable", name: "bagel",       texture: "item", frame: "bagel" },  
    banana:      { quality: 1, type: "food", category: "consumable", name: "banana",      texture: "item", frame: "banana" },   
    bread:       { quality: 1, type: "food", category: "consumable", name: "bread",       texture: "item", frame: "bread" },  
    burger:      { quality: 1, type: "food", category: "consumable", name: "burger",      texture: "item", frame: "burger" },   
    burrito:     { quality: 1, type: "food", category: "consumable", name: "burrito",     texture: "item", frame: "burrito" },    
    canned_food: { quality: 1, type: "food", category: "consumable", name: "canned food", texture: "item", frame: "canned_food" },        
    croissant:   { quality: 1, type: "food", category: "consumable", name: "croissant",   texture: "item", frame: "croissant" },      
    doughnut:    { quality: 1, type: "food", category: "consumable", name: "doughnut",    texture: "item", frame: "doughnut" },     
    drumstick_cooked: { quality: 1, type: "food", category: "consumable", name: "drumstick cooked", texture: "item", frame: "drumstick_cooked" },  
    
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

const TRANSPARENT_HITBOX_DATA = {
    tree: [ 
        { transparentWidth: 1, transparentHeight: 5, transparentOffsetX: 1, transparentOffsetY: 0, },
        { transparentWidth: 3, transparentHeight: 2, transparentOffsetX: 0, transparentOffsetY: 2, },
    ],
    "home_0": [
        { transparentWidth: 0.5, transparentHeight: 0.5, transparentOffsetX: 1.25, transparentOffsetY: 2, },
    ],
}

const INTERACTION_HITBOX_DATA = {
    "home_0":        [ { type: "entrance", name: "home",   destination: "home",   interactionWidth: 0.5,  interactionHeight: 0.5,  interactionOffsetX: .25,   interactionOffsetY: 1.5, }, ],
    "entrance_rug":  [ { type: "entrance", name: "island", destination: "island", interactionWidth: 0.25, interactionHeight: 0.25, interactionOffsetX: 0.375, interactionOffsetY: 0.75, }, ],
    "portal-island": [ { type: "entrance", name: "island", destination: "island", interactionWidth: 1,    interactionHeight: 1,    interactionOffsetX: 0,     interactionOffsetY: 0, } ],
    "portal-infinite-forest":  [ { type: "entrance", name: "infinite-forest", destination: "infinite-forest", interactionWidth: 1, interactionHeight: 1, interactionOffsetX: 0, interactionOffsetY: 0, } ],
    
    "potato_grow":   [ { type: "collectable", delay: true, name: "potato", quantity: 1 }, ],

    "stone": [ { type: "collectable", delay: true, name: "stone", quantity: 1 }, ],
    "wood": [ { type: "collectable", delay: true, name: "wood", quantity: 1 }, ],
    "fiber": [ { type: "collectable", delay: true, name: "fiber", quantity: 1 }, ],
}


const ITEM_ON_USE_DATA = {
    banana: { hunger: 20 },
    bread: { hunger: 20 },
    burger: { hp: 20 },
}

const CROP_GROW_DATA = {
    // "potato_grow": { totalPhase: 5, timeToGrow:  60 * 1000, },
    "potato_grow": { totalPhase: 5, timeToGrow: 24 * 60 * 60 * 1000, },
    "eggplant_grow": { totalPhase: 5, timeToGrow: 1 * 60 * 1000, interaction: [ { type: "collectable", delay: true, name: "eggplant", quantity: 1 }, ]},
    "cauliflower_grow": { totalPhase: 5, timeToGrow: 1 * 60 * 1000, interaction: [ { type: "collectable", delay: true, name: "cauliflower", quantity: 1 }, ] },
    "pumpkin_grow": { totalPhase: 5, timeToGrow: 1 * 60 * 1000, interaction: [ { type: "collectable", delay: true, name: "pumpkin", quantity: 1 }, ] },
    "corn_grow": {  totalPhase: 5, timeToGrow: 1 * 60 * 1000, interaction: [ { type: "collectable", delay: true, name: "corn", quantity: 1 }, ]  },
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
        "0,-2":  { isLand: true, entities: [ { name: "portal-infinite-forest"} ], },
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
     
        "3,-3":  { isLand: true, entities: [ { name: "rock" }, ], },
        "3,-2":  { isLand: true, entities: [ ], },
        "3,-1":  { isLand: true, entities: [  { name: "weeds" }, ], },
        "3,0":   { isHoedLand: true, isLand: true, entities: [ ], },
    },
    "home": {
        "0,0":   { isLand: true, entities: [ { name: "entrance_rug" }, ], },
        "0,-1":   { isLand: true, entities: [ ], },
     
        "1,0":   { isLand: true, entities: [  ], },
        "1,-1":  { isLand: true, entities: [{ name: "bed" },  ], },

    },

}




export {
    ENTITY_DATA,
    ITEM_ON_USE_DATA,
    CROP_GROW_DATA,
    SHOP_DATA,
    QUEST_DATA,
    MAP_DATA,
    TRANSPARENT_HITBOX_DATA,
    INTERACTION_HITBOX_DATA,
}