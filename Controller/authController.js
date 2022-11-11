const User = require("./../Model/userModel");

exports.checkIfLogin = async(request,response,next)=>{

    try{
        let token;
        if(request.headers.authorization && request.headers.authorization.startsWith("Bearer")){
            token = request.headers.authorization.split(' ')[1];
        }
        if(!token){

            return next(new Error("you are not logged in into the system"));
        }
        let decode = await jwt.decode(token,"thisIsRandomText");

        const verifiedUser = await User.findById(decode.userId);
        if(!verifiedUser){
            return (next(new Error("the user belonging to the token do not exist")));

        }
        request.user = verifiedUser;
        next();
    }catch(error){

        console.log("error in checking if login or not");
    }

}