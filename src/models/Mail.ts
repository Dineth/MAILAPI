import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MailSchema = new Schema({
    to: {
        type: String
    },
    content: {
        type: String
    },
    subject: {
        type: String            
    },
    status: {
        type: String            
    }
});