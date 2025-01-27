import { ENTITY_DATA, ENTITY_SPRITE_TABLE, INTERACTION_HITBOX_DATA, TRANSPARENT_HITBOX_DATA } from "../GameData.js";
import State from "./character/Stats.js";



export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, name, x, y, texture, frame, isAlly) {

        super(scene, x, y, texture, frame);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.name = name;
        
        this.entityData = ENTITY_DATA[this.name];
        this.entitySpriteData = ENTITY_SPRITE_TABLE[this.name];

        this.initSprite(x, y, texture, frame);
        


        this.animation      = this?.entityData?.animation;
        this.hpBarOffsetY   = this?.entityData?.hpBarOffsetY ?? 20;
        this.hpBarWidth     = this?.entityData?.hpBarWidth ?? 32;

        if (this.animation) {
            this.anims.play(this.animation, true );  
        }



        // Selected
        this.setInteractive(this.scene.input.makePixelPerfect());
 
        this.on('pointerdown', () => {
            this.handleSelected();
        })

        this.initInteractionHitBox(this);


        
        this.stats = new State(this.scene, this);
    }

    static preload(scene) {
        scene.load.atlas("player", "assets/player.png", "assets/player_atlas.json");
        scene.load.animation("player_anim", "assets/player_anim.json");
        scene.load.atlas("player_fishing", "assets/player_fishing.png", "assets/player_fishing_atlas.json");
        scene.load.animation("player_fishing_anim", "assets/player_fishing_anim.json");
        
        scene.load.atlas("survivor", "assets/character/survivor.png", "assets/character/survivor_atlas.json")
        scene.load.animation("survivor_anim", "assets/character/survivor_anim.json");

        scene.load.atlas("civilian", "assets/civilian.png", "assets/civilian_atlas.json");
        scene.load.animation("civilian_anim", "assets/civilian_anim.json");

        scene.load.atlas("soldier", "assets/soldier.png", "assets/soldier_atlas.json");
        scene.load.animation("soldier_anim", "assets/soldier_anim.json");

        scene.load.atlas("goblin", "assets/character/goblin.png", "assets/character/goblin_atlas.json")
        scene.load.animation("goblin_anim", "assets/character/goblin_anim.json");

        scene.load.atlas("portal", "assets/portal.png", "assets/portal_atlas.json")
        scene.load.animation("portal_anim", "assets/portal_anim.json");

        scene.load.atlas("animal", "assets/animal.png", "assets/animal_atlas.json")
        scene.load.animation("animal_anim", "assets/animal_anim.json");

        scene.load.atlas("raft", "assets/entity/raft.png", "assets/entity/raft_atlas.json")
        scene.load.animation("raft_anim", "assets/entity/raft_anim.json");

        scene.load.atlas("shark", "assets/entity/shark.png", "assets/entity/shark_atlas.json")
        scene.load.animation("shark_anim", "assets/entity/shark_anim.json");
    }

    initSprite(x, y, texture, frame) {
        this.entityTexture  = this.entitySpriteData?.texture ?? texture;
        this.entityFrame    = this.entitySpriteData?.frame ?? frame;

        this.collidable     = this.entitySpriteData?.collidable ?? false;
        this.imageWidth     = this.entitySpriteData?.imageWidth ?? 1;
        this.imageHeight    = this.entitySpriteData?.imageHeight ?? 1;
        this.colliderWidth  = this.entitySpriteData?.colliderWidth ?? 1;
        this.colliderHeight = this.entitySpriteData?.colliderHeight ?? 1;
        this.offsetX        = this.entitySpriteData?.offsetX ?? 0;
        this.offsetY        = this.entitySpriteData?.offsetY ?? 0;
        this.offsetDepth    = this.entitySpriteData?.offsetDepth ?? 0;

        this.adjustX = (this.colliderWidth  % 2 === 0) ? 16 : 0;
        this.adjustY = (this.colliderHeight % 2 === 0) ? 16 : 0;

        this.setPosition(x, y);
        this.depth = this.position.y + this.offsetDepth;

        this.setSize(this.colliderWidth * 32, this.colliderHeight * 32);
        this.setOffset(this.offsetX * 32, this.offsetY * 32);

        // update map collidable if current entity take up space greather than 1 x 1 unit
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

    handleSelected() {
        // Add postfx pipeline
        this.scene.inputController.selectedEntity = this;
        this.scene.inputController.selectedEntityREXOutline.add(this, {
            thickness: 3,
            outlineColor: 0xFF0000
        });

        this.showGeneralInfoHUD();
    }

    handleDeselect() {
        this.scene.inputController?.selectedEntityREXOutline?.remove(this);
        this.scene.inputController.selectedEntity = null;
        this.hideGeneralInfoHUD();
    }

    showGeneralInfoHUD() {
        if (!this.body) 
            return;


        // console.log(this.name, this.entityTexture, this.entityFrame);
        let name = document.getElementById("entity-general-info-name");
        let img = document.getElementById("entity-general-info-img");

        name.innerHTML = `${this.name}`;
        // img.src = this.scene.sys.game.textures.getBase64("item", "potatoe");
        img.src = this.scene.sys.game.textures.getBase64(this.entityTexture, this.entityFrame);

        
        this.entityGeneralInfoList = document.getElementById("entity-general-info-list");
        this.entityGeneralInfoList.innerHTML = ``;

        if (this.stats) {
            let hpDiv = document.createElement("div");
            hpDiv.setAttribute("id", "entity-general-info-hp");

            let hpBoxDiv = document.createElement("div");
            hpBoxDiv.setAttribute("id", "entity-general-info-hp-box");
            let hpPercentageDiv = document.createElement("div");
            hpPercentageDiv.setAttribute("id", "entity-general-info-hp-percentage");
            
            let hpBarDiv = document.createElement("div");
            hpBarDiv.setAttribute("id", "entity-general-info-hp-bar");

            this.hpPercentage = this.stats.hp / this.stats.maxHp;
            hpPercentageDiv.style.width = `calc(${this.hpPercentage * 100}% - 4px)`;

            hpBarDiv.appendChild(hpBoxDiv);
            hpBarDiv.appendChild(hpPercentageDiv);
            hpDiv.appendChild(hpBarDiv);
            this.entityGeneralInfoList.appendChild(hpDiv);

        }


        this.scene.hud.showEntityGeneralInfoHUD();
    }

    hideGeneralInfoHUD() {
        this.scene.hud.hideEntityGeneralInfoHUD();
    }


    initTransparentHitBox(object) {
        this.transparentSprites = [];
        
        let transparentHitBox = TRANSPARENT_HITBOX_DATA[this.name];
        
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

    initInteractionHitBox(object, delayExempt) {
        this.interactionSprites = [];

        let interactionHitBox = INTERACTION_HITBOX_DATA[this.name]
        
        interactionHitBox?.forEach((hitbox) => {

            if (!delayExempt && hitbox.delay) {
                return;
            }
            
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
        this.stats.hp -= damage;

        if (this.stats.hp <= 0) { 
            // console.log(this.name, " killed by: ", attacker)
            this.onDeath(attacker);
        }
    }  

    setTransparent(opacity) {
        this.alpha = opacity;
    }
    
    onDeath(attacker) {
        if (attacker) {
            this.scene.eventEmitter.emit(`${attacker}-destroy-${this.name}`);
        }
        this.destroySelf();
        
    }
    
    destroySelf() {
        this.destroyed = true;
        delete this.stats;
        this.destroyInteractionHitBox();
        this.destroy();
    }
}