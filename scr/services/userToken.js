import jwt from 'jsonwebtoken';

function checkToken(req, res, next) {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if(!token)
        return res.status(401).json({ msg: 'Access denied' })

    try {
        let secret = process.env.SECRET;

        jwt.verify(token, secret);
        
        next();

    } catch (error) {
        res.status(400).json({ msg: 'Invalid token' })
    }
}

export default checkToken;