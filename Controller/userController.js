const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');

exports.getAllUser = async (request,response)=>{

    try{
        const users = await User.find();
        response
            .status(200)
            .json({
                status:'success',
                data:users
            })


    }catch(error){
        console.log('failed to get all the users');
        console.log(error);
    }
}
exports.signUp = async(request,response)=>{

    try{
        const newUser = await User.create(request.body);
        const token = jwt.sign({time:Date(),userId:newUser._id},"thisIsRandomText");
        response
            .status(200)
            .json({
                token,
                user:newUser
            })

    }
    catch(error){
        console.log('error in signing up users');
    }
}

exports.login = async(request,response,next)=>{

    try{
        const email = request.body.email;
        const password = request.body.password;

        console.log(`${email} ${email}`)

        if(!email || !password){
            return next(new Error('please provide your email or password'));
        }
        const existingUser = await User.findOne({email:email}).select('+password');

        if(!existingUser){
            return (next(new Error('no user found')));
        }

        if(!await existingUser.checkPassword(password,existingUser.password)){
            return(next(new Error('Incorrect password or email')));
        }

        const token = jwt.sign({time:Date(),userId:existingUser._id},"thisIsRandomText");
        response
            .status(200)
            .json({
                token,
                user:existingUser
            })
    }catch(error){
        console.log('Error while logging in user');
    }

}


