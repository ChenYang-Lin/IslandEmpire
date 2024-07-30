import { ENTITY_DATA } from "../GameData";



export default class Structure extends Entity {
    constructor(scene, x, y, texture, name) {
        const entityData = ENTITY_DATA[name];
        super(scene, x, y, texture, name, entityData);

        
    }
}