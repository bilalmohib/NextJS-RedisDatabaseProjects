import {Entity, Schema} from "redis-om";

class Task extends Entity {
    toJSON() {
        return {
            id: this.entityId,
            name: this.name,
            complete: this.complete
        }
    }
}

export const taskSchema = new Schema(Task, {
    name: {
        type: 'string'
    },
    complete: {
        type: 'boolean'
    }
}, {
    dataStructure: 'JSON'
});
