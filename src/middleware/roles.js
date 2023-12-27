const rolesMiddleware = ( roles = []) => {
    
    return (req, res, next) => {
        if (typeof roles === "string") {
            roles = [roles]
        }
        //check if user role is included in the
        console.log(req.user)
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "You are unauthorized to access this endpoint" })
        }
        return next()

    }
}
module.exports = rolesMiddleware