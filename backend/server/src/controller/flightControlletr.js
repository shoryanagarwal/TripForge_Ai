const FlightService = require('../service/flightService.js');

const flightService = new FlightService()

class FlightController{

    async create(req,res){

        try{
            const flight = await flightService.createFlight(req.body)
            return res.status(201).json({
                success:true,
                message:"Flight created successfully",
                data:flight,
                err:{}
            })

        }
        catch(error){
            console.log("Something went wrong in the controller layer")
            return res.status(500).json({
                success:false,
                message:"Unable to create flight",
                data:{},
                err:error
            })



        }



    }


    async get(req,res){
        try{
            const flightId = req.params.id
            const flight = await flightService.getFlight(flightId)
            return res.status(200).json({
                success:true,
                message:"Flight fetched successfully",
                data:flight,
                err:{}
            })
        }
        catch(error){
            console.log("Something went wrong in the controller layer")
            return res.status(500).json({
                success:false,
                message:"Unable to fetch flight",
                data:{},
                err:error
            })
        }
    }


    async getAll(req,res){
        try{
            const filter = req.query
            const flights=await flightService.getAllFlights(filter);

            return res.status(200).json({
                success:true,
                message:"Flights fetched successfully",
                data:flights,
                err:{}
            })
        }
        catch(error){
            console.log("Something went wrong in the controller layer")
            return res.status(500).json({
                success:false,
                message:"Unable to fetch flights",
                data:{},
                err:error
            })
        }

    }





}



module.exports = FlightController