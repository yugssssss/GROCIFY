import jwt from 'jsonwebtoken';


export const GenerateTokens =async (user)=>{
    try {
        if(!user){
            return "error in user";
        }
        const secreatkey = 'yughjkl123456yujklpoi2345bnml45i'
        const payload ={
            userId : user._id,
            role : user.role
        }
        const accesstoken = jwt.sign(payload,secreatkey)

       return accesstoken
    } catch (error) {
        console.log(error);
        
    }
}