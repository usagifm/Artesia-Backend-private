const { verify } = require("jsonwebtoken")

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) {
                    res.json({
                        message: "Invalid token !"
                    })
                }else {
                    console.log(decoded)
                    req.user = decoded;
                    next();
                }
            })
        }else{
            res.json({
                message: "Access Denied ! You are not authorized"
            })
        }
    },

    checkTokenAdmin: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) {
                    res.json({
                        message: "Invalid token !"
                    })
                }else {
                    if(decoded.user.role == 'Admin'){
                        console.log(decoded);
                        req.user = decoded;
                        next();
                    }else if(decoded.user.role != 'Admin') {
                        res.json({
                            message: "It's not an admin token !"
                        })
                    }
                }
            })
        }else{
            res.json({
                message: "Access Denied ! You are not authorized"
            })
        }
    }
     
}

