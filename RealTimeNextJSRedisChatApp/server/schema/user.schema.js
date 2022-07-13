import { Entity, Schema } from "redis-om";

class User extends Entity {
    toJSON() {
        return {
            //Note: Remember here the entities you are adding you have to keep the pattern same everywhere.You can change add more entities or offcourse remove some of them
            id: this.entityId,
            name: this.name,
            password: this.password,
            timeRegistered: this.timeRegistered,
            isSignedIn: this.isSignedIn
        }
    }
}

//Note: Remember here the userSchema you are adding you have to keep the pattern same everywhere.You can change add more entities or offcourse remove some of them
export const userSchema = new Schema(User, {
    name: {
        type: 'string'
    },
    password: {
        type: 'string'
    },
    timeRegistered: {
        type: 'string'
    },
    isSignedIn: {
        type: 'boolean'
    }
}, {
    dataStructure: 'JSON'
});
