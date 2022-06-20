import {Entity, Schema} from "redis-om";

class Task extends Entity {
    toJSON() {
        return {
            id: this.entityId,
            title: this.title,
            timeSubmitted: this.timeSubmitted,
            complete: this.complete
        }
    }
}

export const taskSchema = new Schema(Task, {
    title: {
        type: 'string'
    },
    timeSubmitted:{
        type: 'string'
    },
    complete: {
        type: 'boolean'
    }
}, {
    dataStructure: 'JSON'
});
