import { ENTITY_DATA } from "../GameData.js";



export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, texture, frame, entityData, isAlly) {

        if (!entityData) {
            entityData = ENTITY_DATA[name];
        }
        
        let entityTexture = entityData?.texture ?? texture;
        let entityFrame = entityData?.frame ?? frame;

        // console.log(entityData, entityFrame)
        super(scene, x, y, entityTexture, entityFrame);

        this.entityData = entityData;
        this.name = name;
        this.isAlly = isAlly;
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        if (!this.entityData) {
            this.entityData = ENTITY_DATA[this.name]
        }

        // console.log(this.entityData)

        this.collidable = this?.entityData?.collidable ?? false;
        this.imageWidth = this?.entityData?.imageWidth ?? 1;
        this.imageHeight = this?.entityData?.imageHeight ?? 1;
        this.colliderWidth = this?.entityData?.colliderWidth ?? 1;
        this.colliderHeight = this?.entityData?.colliderHeight ?? 1;
        this.offsetX = this?.entityData?.offsetX ?? 0;
        this.offsetY = this?.entityData?.offsetY ?? 0;
        this.animation = this?.entityData?.animation;
        this.hpBarOffsetY = this?.entityData?.hpBarOffsetY ?? 20;
        this.hpBarWidth = this?.entityData?.hpBarWidth ?? 32;




        // Default stats
        this.maxHp = 30;
        this.hp = this.maxHp;

        this.adjustX = 0;
        if (this.colliderWidth % 2 === 0) {
            this.adjustX = 16;
        }
        this.adjustY = 0;
        if (this.colliderHeight % 2 === 0) {
            this.adjustY = 16;
        }
        

        this.setPosition(x, y);
        
        this.setSize(this.colliderWidth * 32, this.colliderHeight * 32);
        this.setOffset(this.offsetX * 32, this.offsetY * 32);
        
        this.depth = this.position.y;
        if (this?.entityData?.offsetDepth) {
            this.depth += this.entityData.offsetDepth;
        }

        if (this.animation) {
            console.log(this.animation)
            this.anims.play(this.animation, true );  
        }

        // console.log(this.name, this.collidable)
        if (this.collidable && (this.colliderWidth > 1 || this.colliderHeight > 1)) {
            let halfWidth = (this.colliderWidth - 1) / 2;
            let halfHeight = (this.colliderHeight - 1) / 2;

            let left = this.onGrid.x - Math.floor(halfWidth);
            let right = this.onGrid.x + Math.ceil(halfWidth);
            let top = this.onGrid.y - Math.floor(halfHeight);
            let bottom = this.onGrid.y + Math.ceil(halfHeight);
            
            for (let x = left; x <= right; x++) {
                for (let y = top; y <= bottom; y++) {
                    this.scene.worldManager.map[`${x},${y}`].entities.push({ collidable: true });
                }
            }
        } 

        // Selected
        this.setInteractive(this.scene.input.makePixelPerfect());
 
        this.on('pointerdown', () => {
            // Add postfx pipeline
            this.scene.inputController.selectedEntity = this;
            this.scene.inputController.selectedEntityREXOutline.add(this, {
                thickness: 3,
                outlineColor: 0xFF0000
            });
            console.log('clicked: ', this.name)
        })


        if (this.entityData?.interaction) {
            let isDelay = false;
            this.entityData.interaction?.forEach((hitbox) => {
                if (hitbox?.delay) {
                    isDelay = true;
                }
            });
            if (!isDelay){
                this.initInteractionHitBox(this);
            }
        }

    }

    static preload(scene) {
        scene.load.atlas("player", "assets/player.png", "assets/player_atlas.json");
        scene.load.animation("player_anim", "assets/player_anim.json");
        scene.load.atlas("player_fishing", "assets/player_fishing.png", "assets/player_fishing_atlas.json");
        scene.load.animation("player_fishing_anim", "assets/player_fishing_anim.json");
        
        scene.load.atlas("civilian", "assets/civilian.png", "assets/civilian_atlas.json");
        scene.load.animation("civilian_anim", "assets/civilian_anim.json");

        scene.load.atlas("goblin", "assets/character/goblin.png", "assets/character/goblin_atlas.json")
        scene.load.animation("goblin_anim", "assets/character/goblin_anim.json");

        scene.load.atlas("portal", "assets/portal.png", "assets/portal_atlas.json")
        scene.load.animation("portal_anim", "assets/portal_anim.json");

        scene.load.atlas("animal", "assets/animal.png", "assets/animal_atlas.json")
        scene.load.animation("animal_anim", "assets/animal_anim.json");

        scene.load.atlas("raft", "assets/entity/raft.png", "assets/entity/raft_atlas.json")
        scene.load.animation("raft_anim", "assets/entity/raft_anim.json");
    }

    setPosition(x, y) {
        this.x = x + (-this.imageWidth / 2 + this.offsetX + this.colliderWidth / 2) * 32 + this.adjustX; 
        this.y = y + (this.imageHeight / 2 - this.offsetY - this.colliderHeight / 2) * 32 + this.adjustY;
    }

    get position() {
        let x = this.x - this.adjustX - (-this.imageWidth / 2 + this.offsetX + this.colliderWidth / 2) * 32;
        let y = this.y - this.adjustY - (this.imageHeight / 2 - this.offsetY - this.colliderHeight / 2) * 32;
        // console.log(this.name, x, y);
        return { x, y } 
    }

    get onGrid() {
        return {
            x: Math.floor((this.position.x+16) / 32),
            y: Math.floor((this.position.y+16) / 32),
        }
    }

    renderHealthBar() {
        this.graphics = this.scene.add.graphics();

        this.healthBarBG?.destroy();
        this.healthBar?.destroy();

        let x = this.position.x - (this.hpBarWidth/2);
        let y = this.position.y - this.hpBarOffsetY;
        let width = this.hpBarWidth;
        let height = 6;
        let radius = 2;


        // HealthBarBackground
        this.graphics.fillStyle(0x000000, 1);
        this.healthBarBG = this.graphics.fillRoundedRect(x, y, width, height, radius); // x, y, width, height, radius
        this.healthBarBG.depth = this.depth + 1;
        

        // Healthbar
        this.graphics.fillStyle(0xff0000, 1);
        if (this.isAlly === undefined) {
            this.graphics.fillStyle(0x0000ff, 1);
        } else if (this.isAlly) {
            this.graphics.fillStyle(0x00ff00, 1);
        }
        console.log(this.hp, this.maxHp)
        this.healthBar = this.graphics.fillRoundedRect(x+2, y+2, (this.hp/this.maxHp)*(width-4), height-4, 1); // x, y, width, height, radius
        this.healthBar.depth = this.depth + 2;
    }

    initTransparentHitBox(object) {
        this.transparentSprites = [];
        let transparentHitBox = this.entityData.transparentHitBox;
        
        
        transparentHitBox?.forEach((hitbox) => {
            let colliderBody = this.scene.add.sprite(object.x, object.y, "resource", "");
            colliderBody.parent = this;
            colliderBody.alpha = 0;
            this.transparentSprites.push(colliderBody);
            this.scene.physics.add.existing(colliderBody);

            colliderBody.body.setSize(hitbox.transparentWidth * 32, hitbox.transparentHeight * 32);
            colliderBody.body.setOffset(hitbox.transparentOffsetX * 32, hitbox.transparentOffsetY * 32);

            this.scene.worldManager.transparentHitboxGroup.add(colliderBody);
            

        });
    }

    destroyTransparentHitBox() {
        this.transparentSprites.forEach((hitbox) => {
            hitbox.destroy();
            this.scene.worldManager.transparentHitboxGroup.remove(hitbox);
        })
    }

    initInteractionHitBox(object) {
        this.interactionSprites = [];
        let interactionHitBox = this.entityData.interaction;
        
        // console.log(interactionHitBox)
        
        interactionHitBox?.forEach((hitbox) => {
            
            // console.log("created interaction hit box")
            let colliderBody = this.scene.add.sprite(object.x, object.y);
            colliderBody.type = hitbox.type;
            colliderBody.parent = this;
            colliderBody.interactionData = hitbox;
            this.interactionSprites.push(colliderBody);
            this.scene.physics.add.existing(colliderBody);0

            let width = hitbox.interactionWidth ?? 1;
            let height = hitbox.interactionHeight ?? 1;
            let offsetX = hitbox.interactionOffsetX ?? 0;
            let offsetY = hitbox.interactionOffsetY ?? 0;

            colliderBody.body.setSize(width * 32, height * 32);
            colliderBody.body.setOffset(offsetX * 32, offsetY * 32);

            // console.log(colliderBody)
            this.scene.worldManager.interactionHitboxGroup.add(colliderBody);
            

        });

    }

    destroyInteractionHitBox() {
        this.interactionSprites?.forEach((hitbox) => {
            hitbox?.destroy();
            this.scene.worldManager.interactionHitboxGroup.remove(hitbox);
        })
    }

    onHit(attacker, damage) {    
        if (this.hp <= 0) { 
            console.log(attacker)
            this.onDeath(attacker);
        }
    }  


    onDeath(attacker) {
        this.scene.eventEmitter.emit(`${attacker}-destroy-${this.name}`);
        this.destroy();
        
    }
    
    destroySelf() {
        this.destroyInteractionHitBox();
        this.destroy();
    }
}