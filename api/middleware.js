const authenticateUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized. Example text." });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized. Example text." });
        }

        req.user = user; // Attach the user to the request object
        next();
    });
};

module.exports = authenticateUser;
