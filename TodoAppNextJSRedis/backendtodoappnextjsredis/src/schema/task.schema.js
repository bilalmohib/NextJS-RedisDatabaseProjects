import {Entity, Schema} from "redis-om";

class Todo extends Entity {
    toJSON() {
        return {
            id: this.entityId,
            title: this.title,
            timeSubmitted: this.timeSubmitted,
            completed: this.completed
        }
    }
}

export const taskSchema = new Schema(Todo, {
    title: {
        type: 'string'
    },
    timeSubmitted:{
        type: 'string'
    },
    completed: {
        type: 'boolean'
    }
}, {
    dataStructure: 'JSON'
});
