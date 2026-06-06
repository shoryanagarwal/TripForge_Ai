const FlightRepository = require('../repository/flightRepository.js')

const AirplaneRepository = require('../repository/airplaneRepository.js')

const airplaneRepository = new AirplaneRepository()
const {Op}=require('sequelize')

const flightRepository = new FlightRepository()


class FlightService{

    async createFlight(data){

        try{

            const airplane= await airplaneRepository.getAirplaneById(data.airplaneId)

            if(!airplane){
                throw new Error("Airplane not found")
            }

            //check the timee

            if(new Date(data.departureTime) >= new Date(data.arrivalTime)){
                throw new Error("Departure time should be less than arrival time")
            }

            data.availableSeats=airplane.totalSeats

            const flight=await flightRepository.createFlight(data);


            return flight;
           


        }
        catch(error){
            console.log("Something went wrong in the service layer",error)
            throw error

        }



    }



    async getFlight(flightId){
    
        
        try{
            const flight = await flightRepository.getFlight(flightId)
            return flight;

        }
        catch(error){
            console.log("Something went wrong in the service layer")
            throw error
        }
    
    }


    async getAllFlights(query){
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


            return await flightRepository.getAllFlights(filter)
            


        }
        catch(error){
            console.log("Something went wrong in the service layer",error)
            throw error
        }
    }


    
}


module.exports = FlightService