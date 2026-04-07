const jwt = require('jsonwebtoken');
const SECRET = 'abcd123'
function AssignToken(user) {
    return jwt.sign(user , SECRET)
    
}

module.exports = AssignToken