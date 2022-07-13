import { Entity, Schema } from "redis-om";

class Listing extends Entity {
    toJSON() {
        return {
            //Note: Remember here the entities you are adding you have to keep the pattern same everywhere.You can change add more entities or offcourse remove some of them
            id: this.entityId,
            category: this.category,
            title: this.title,
            description: this.description,
            isPublic: this.isPublic,
            userWhoCreated: this.userWhoCreated,
            timeCreated: this.timeCreated,
        }
    }
}

//Note: Remember here the listingSchema you are adding you have to keep the pattern same everywhere.You can change add more entities or offcourse remove some of them
export const listingSchema = new Schema(Listing, {
    category: {
        type: 'string'
    },
    title: {
        type: 'string'
    },
    description: {
        type: 'string'
    },
    isPublic: {
        type: 'boolean'
    },
    userWhoCreated: {
        type: 'string'
    },
    timeCreated: {
        type: 'string'
    }
}, {
    dataStructure: 'JSON'
});
