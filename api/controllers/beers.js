var NoSQL = require('nosql');
var db = NoSQL.load('database/file.nosql');
var axios = require('axios');
var cache = require('memory-cache');

function sanitizeResponse(data){
    let responseData = []
    data.forEach(beer => {
        responseData.push((({ id, name, description, first_brewed, food_pairing }) => ({ id, name, description, first_brewed, food_pairing }))(beer))
    })
    return responseData
}

exports.findByName = async function (req, res) {
    let cacheResponse = cache.get(req.query.name);
    if (cacheResponse){
        res.send(cacheResponse);
    }else{
        const punkAPIResponse = await axios.get('https://api.punkapi.com/v2/beers', {
            params: {
                beer_name: req.query.name
            }
        })
        let sanitizedResponse = sanitizeResponse(punkAPIResponse.data);
        cache.put(req.query.name, sanitizedResponse, 5*1000)
        res.send(sanitizedResponse);
    }
}

exports.insertRating = async function (req, res) {
    const { rating, comments } = req.body
    if (rating && comments != null && rating >= 1 && rating <= 5){
        try {
            await axios.get(`https://api.punkapi.com/v2/beers/${req.params.id}`)
            db.insert({id: req.params.id, rating, comments});
            res.send(200)
        }catch (exception){
            console.log(exception)
            res.sendStatus(404)
        }
    } else {
        res.status(400).send({message:'Rating should be in the range of 1 to 5.'})
    }
}