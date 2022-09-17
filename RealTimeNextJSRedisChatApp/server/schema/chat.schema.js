import { Entity, Schema } from "redis-om";
class Chat extends Entity {
    toJSON() {
        return {
            //Note: Remember here the entities you are adding you have to keep the pattern same everywhere.You can change add more entities or offcourse remove some of them
            id: this.entityId,
            userIDSender: this.userIDSender,
            userNameSender: this.userNameSender,
            userIDReceiver: this.userIDReceiver,
            userNameReceiver: this.userNameReceiver,
            message:this.message,
            timeSent:this.timeSent,
            isUserOnline:this.isUserOnline
        }
    }
}

//Note: Remember here the chatSchema you are adding you have to keep the pattern same everywhere.You can change add more entities or offcourse remove some of them
export const chatSchema = new Schema(Chat, {
    userIDSender: {
        type: 'string'
    },
    userNameSender: {
        type: 'string'
    },
    userIDReceiver: {
        type: 'string'
    },
    userNameReceiver: {
        type: 'string'
    },
    message: {
        type: 'string'
    },
    timeSent: {
        type: 'string'
    },
    isUserOnline: {
        type: 'boolean'
    },
}, {
    dataStructure: 'JSON'
});
