import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
    },

    role: {
        type: String,
        enum: ['user', 'consultant', 'admin'],
        default: 'user',
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },


});

const User = mongoose.model('User', userSchema);
export default User;