const BusService = require("../service/busService.js")
const busService = new BusService()

class BusController{

    async create(req,res){

        try{
            const bus = await busService.createBus(req.body)
            return res.status(201).json({
                success:true,
                message:"Bus created successfully",
                data:bus,
                err:{}
            })

        }
        catch(error){
            console.log("Something went wrong in the controller layer")
            return res.status(500).json({
                success:false,
                message:"Unable to create bus",
                data:{},
                err:error
            })



        }



    }


    async get(req,res){
        try{
            const busId = req.params.id
            const bus = await busService.getBusById(busId)
            return res.status(200).json({
                success:true,
                message:"Bus fetched successfully",
                data:bus,
                err:{}
            })
        }
        catch(error){
            console.log("Something went wrong in the controller layer")
            return res.status(500).json({
                success:false,
                message:"Unable to fetch bus",
                data:{},
                err:error
            })
        }
    }


    async getAll(req,res){
        try{
            const filter = req.query
            const bus=await busService.getAllBus(filter);

            return res.status(200).json({
                success:true,
                message:"bus fetched successfully",
                data:bus,
                err:{}
            })
        }
        catch(error){
            console.log("Something went wrong in the controller layer")
            return res.status(500).json({
                success:false,
                message:"Unable to fetch bus",
                data:{},
                err:error
            })
        }

    }





}



module.exports = BusController