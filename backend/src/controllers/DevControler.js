const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArry = require('../utils/parseStringAsArray');

module.exports ={
    async store (request, response){
        const { gitHub_userName, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ gitHub_userName });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${gitHub_userName}`);
        
            let { name, avatar_url, bio } = apiResponse.data;
            if(!name)  name = apiResponse.data.login;
        
            const techsArray = parseStringAsArry(techs);
            
            const location = {
                type:'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                name,
                gitHub_userName,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
        }
        return response.json(dev);
    },

    async index(request, response){
        const devs = await Dev.find(); 
        return response.json(devs);
    }

};