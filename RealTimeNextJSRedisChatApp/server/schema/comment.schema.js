import { Entity, Schema } from "redis-om";

class Comment extends Entity {
    toJSON() {
        return {
            //Note: Remember here the entities you are adding you have to keep the pattern same everywhere.You can change add more entities or offcourse remove some of them
            id: this.entityId,
            listingID: this.listingID,
            comment: this.comment,
            userWhoCommented: this.userWhoCommented,
            timeCommented: this.timeCommented
        }
    }
}

//Note: Remember here the commentSchema you are adding you have to keep the pattern same everywhere.You can change add more entities or offcourse remove some of them
export const commentSchema = new Schema(Comment, {
    listingID: {
        type: 'string'
    },
    comment: {
        type: 'string'
    },
    userWhoCommented: {
        type: 'string'
    },
    timeCommented: {
        type: 'string'
    }
}, {
    dataStructure: 'JSON'
});
