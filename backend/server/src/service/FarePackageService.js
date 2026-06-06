const FarePackageRepository = require('../repository/FarePackageRepository.js');

const farePackageRepository = new FarePackageRepository()

class FarePackageService{
    async createFarePackage(data){
        try{
            const farePackage = await farePackageRepository.createFarePackage(data);
            return farePackage;
        }
        catch(error){

                console.log("Error in creating fare package",error)
                throw error

        }
    }
    
    async getFarePackagesByFlight(flightId){
        try{
            const farePackages = await farePackageRepository.getFarePackagesByFlight(flightId);
            return farePackages;
        }
        catch(error){

                console.log("Error in getting fare packages by flight",error)
                throw error
        }
    }
}


module.exports = FarePackageService;