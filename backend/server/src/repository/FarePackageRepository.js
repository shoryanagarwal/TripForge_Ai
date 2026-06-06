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
            return farePackages;
        }
        catch(error){
            throw error;       
        }
    }

}


module.exports = FarePackageRepository;