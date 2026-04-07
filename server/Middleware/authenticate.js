const jwt = require('jsonwebtoken');

function AdminOnly(req,res,next) {
    const token = req.cookies.jwtToken;

    if (!token) {
        return res.status(401).json({message:'☹ No Token Provided'})
    }

    try {
        const decoded = jwt.verify(token , 'abcd123')
        console.log(' 🧪 Decoded ki value : ',decoded)
        req.user = decoded
        next()
    } catch (error) {
        
        return res.status(403).json({message : 'Invalid or expired token, decode nai ho ska'})
    }
}

module.exports = AdminOnly