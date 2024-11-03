const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({

     name:{
        type:String
     },
     age:{
        type:String
     },
     email:{
        type:String,
        requried:true
     },
     mobile:{
        type:Number
     },
     address: {
        type: String
    },
    aadharCardNumber: {
        type: Number,
        required: true,
        unqiue: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }


});


 //hash the password before saving new password
 userSchema.pre('save',async function(next){
     // Only hash the password if it has been modified (or is new)
     if(!this.isModified('password')) return next();

     try {
        const salt = 10;
        this.password = await bcrypt.hash(this.password,salt);
        next();
     } catch (error) {
        next(error);
     }
 })


 // Optionally, you could add a method to the schema for verifying passwords
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', userSchema);



module.exports = User;