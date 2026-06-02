const ai=require('../config/gemini_config.js');
const {Flight,Bus}=require('../models');

class AiService{

    async recommendTrips(data){


        try{

            const {source,destination,date,budget}=data;

            const filter={
                source:source,
                destination:destination,
                status:'scheduled'
            }


            if(date){
            
                const startDate=new Date(date);
                const endDate=new Date(date);
                endDate.setDate(endDate.getDate()+1);


                filter.departureTime={ // applying filter for both flights and buses as they both have departureTime field between startDate and endDate
                    $gte:startDate,
                    $lt:endDate
                }

            
            }


            const flights=await Flight.findAll({where:filter});
            const buses=await Bus.findAll({where:filter});


            const prompt=`
            You are TripForge AI, a travel recommendation assistant.

                User wants to travel:
                Source: ${source}
                Destination: ${destination}
                Date: ${date || "not specified"}
                Budget: ₹${budget || "not specified"}

                Available Flights:
                ${JSON.stringify(flights, null, 2)} // format the flight data as needed, but include key details like price, duration, departure and arrival times, and airline.

                Available Buses:
                ${JSON.stringify(buses, null, 2)}

                Compare the available options based on:
                1. Price
                2. Duration
                3. Budget fit
                4. Convenience

                Return:
                - Best overall option
                - Cheapest option
                - Fastest option
                - Final recommendation

                Important:
                Only use the provided flight and bus data.
                Do not invent unavailable options.
                If no options are available, say no travel options found.`


                const response= await ai.models.generateContent({
                    model:"gemini-2.0-flash",
                    contents:prompt
                })

                return response.text;
        }




        catch(error){
            console.log("Error in recommending trips in ai service",error);
            throw error;


        }






    }







}


module.exports=AiService;