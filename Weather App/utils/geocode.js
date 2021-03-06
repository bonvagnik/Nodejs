const request= require('request');

const geocode=(address, callback) =>{
    const geoURL= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmlraGlsYmtzaSIsImEiOiJjbDJlamhrNngwMWI1M2twNjVlNjNzdjcxIn0.RkSr-Bv2WsIsBZttdOxBFw&limit=1';

    request({url:geoURL, json:true}, (error,response)=>{
        if (error) {
            callback('Unable to connect to location services',undefined);       //the error can be used for specific purposes in the callback
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find the location. Try another search.', undefined);
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            });
        } 
    });
}

module.exports= geocode;
