const jwt = require('jsonwebtoken');

module.exports = function () {
    return async (req, res, next) => {
        try {
            // Extract the token from the Authorization header
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                return res.status(401).send({ msg: 'Access Denied. No token provided.' });
            }

            // Verify the token
            const decoded = jwt.verify(token, process.env.SECERT_KEY);

            // Extract user details and access permissions from the token
            const { user } = decoded;

            if (!user || !user.access || typeof user.access !== 'object') {
                return res.status(403).send({ msg: 'Access Denied. Invalid permissions structure.' });
            }

            // Define a mapping of HTTP methods to access keys
            const methodToAccessMap = {
                post: 'create',
                get: 'get',
                put: 'update',
                delete: 'delete',
            };

            const routeAccessKey = req.baseUrl; // Base URL of the route (e.g., /api/v1/product)
            const httpMethod = req.method.toLowerCase(); // HTTP method in lowercase
            const requiredAccessKey = methodToAccessMap[httpMethod]; // Map method to access key (e.g., post -> create)

            if (!requiredAccessKey) {
                return res.status(403).send({ msg: 'Access Denied. Invalid HTTP method.' });
            }

            // Check if the user has the required permission
            if (
                !user.access[routeAccessKey] || 
                !user.access[routeAccessKey][requiredAccessKey]
            ) {
                return res.status(403).send({ 
                    msg: `Access Denied. You do not have ${requiredAccessKey} permission for ${routeAccessKey}.` 
                });
            }

            // Add user data to the request for use in downstream handlers
            req.user = user;

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error(error);
            return res.status(401).send({ msg: 'Invalid Token.' });
        }
    };
};
