const {FarePackage} = require('../models');

class FarePackageRepository{

    async createFarePackage(data){

        try{
            const farePackage = await FarePackage.create(data);
            return farePackage;
        }
        catch(error){
            throw error;
        }

    }

    async getFarePackagesByFlight(flightId){

        try{
            const farePackages = await FarePackage.findAll({where:{flightId}});
            if (farePackages.length === 0) {
                return [
                    {
                    id: "default",
                    name: "Standard Fare",
                    price: 0,
                    features: [
                        "Standard booking",
                        "Basic baggage included",
                        "Regular cancellation rules",
                    ],
                    },
                ];
                }
            return farePackages;
        }
        catch(error){
            throw error;       
        }
    }

}


module.exports = FarePackageRepository;