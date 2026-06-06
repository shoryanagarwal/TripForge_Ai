const FarePackageService = require('../service/FarePackageService.js');


const farePackageService = new FarePackageService()

class FarePackageController{
    async createFarePackage(req,res){
        try{
            const data = req.body;
            const farePackage = await farePackageService.createFarePackage(data);

            res.status(201).json({
                success:true,
                data:farePackage,
                message:"Fare package created successfully"
            })
        }
        catch(error){
            console.log("Error in creating fare package",error)
            res.status(500).json({
                success:false,
                message:error.message || "Something went wrong"
            })
        }
    }

    async getFarePackagesByFlight(req,res){
        try{
            const {flightId} = req.params;
            const farePackages = await farePackageService.getFarePackagesByFlight(flightId);
            res.status(200).json({
                success:true,
                data:farePackages,
                message:"Fare packages fetched successfully"
            })
        }
        catch(error){
            console.log("Error in getting fare packages by flight",error)
            res.status(500).json({
                success:false,
                message:error.message || "Something went wrong"
            })
        }
    }

}

module.exports = FarePackageController;
