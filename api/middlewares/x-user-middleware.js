var NoSQL = require('nosql');
var db = NoSQL.load('database/file.nosql');

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

module.exports = function () {
    return (req, res, next) => {
        const {params, query} = req
        const xUser = req.headers['x-user']
        if (xUser && emailIsValid(xUser)) {
            db.insert({requestDetail: { email: xUser, request: {params, query}}});
            next()
        } else {
            res.status(400).send({message:'Request is missing header x-user with a valid email'})
        }
    }
}