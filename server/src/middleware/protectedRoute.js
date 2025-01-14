import jwt from 'jsonwebtoken';

const protectedRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message:"Unauthorized access",success:false})
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET)

        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        }

        req.id = decode.id
        next();
    } catch (error) {
        console.log(error)
    }
}

export default protectedRoute;
