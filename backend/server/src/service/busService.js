const BusRepository = require('../repository/busRepository.js')

const {Op}=require('sequelize')
const busRepository = new BusRepository()



class BusService{

    async createBus(data){

        try{

          

            

            //check the timee

            if(new Date(data.departureTime) >= new Date(data.arrivalTime)){
                throw new Error("Departure time should be less than arrival time")

            const expireAt=new Date(
                Date.now() + 5*60*1000 // 5 minutes
            )
            }


            const bus=await busRepository.createBus(data);


            return bus;           


        }
        catch(error){
            console.log("Something went wrong in the service layer",error)
            throw error

        }



    }



    async getBusById(busId){
    
        
        try{
            const bus = await busRepository.getBusById(busId)
            return bus;

        }
        catch(error){
            console.log("Something went wrong in the service layer")
            throw error
        }
    
    }


    async getAllBus(query){
        try{

            let filter={};

            if(query.source){
                filter.source=query.source
            }
            if(query.destination){
                filter.destination=query.destination
            }

            if(query.date){
                const startDate = new Date(query.date);
                const endDate = new Date(query.date);
                endDate.setDate(endDate.getDate() + 1);

                filter.departureTime={
                    [Op.gte]:startDate,
                    [Op.lt]:endDate
                }
            }
            


            return await busRepository.getAllBus(filter)
            


        }
        catch(error){
            console.log("Something went wrong in the service layer",error)
            throw error
        }
    }




}



module.exports = BusService