import {Entity, Schema} from "redis-om";

class Todo extends Entity {
    toJSON() {
        return {
            //Note: Remember here the entities you are adding you have to keep the pattern same everywhere.You can change add more entities or offcourse remove some of them
            id: this.entityId,
            title: this.title,
            timeSubmitted: this.timeSubmitted,
            completed: this.completed
        }
    }
}

//Note: Remember here the taskSchema you are adding you have to keep the pattern same everywhere.You can change add more entities or offcourse remove some of them
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
