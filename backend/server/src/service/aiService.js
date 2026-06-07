const {Flight,Bus}=require('../models');
const {Op}=require('sequelize');
const groqClient=require('../config/groq_config.js');
class AiService{

    async recommendTrips(data){


        try{

            const {source,destination,date,budget}=data;

            const filter={
                source:source,
                destination:destination,
                status:'scheduled',

            }


            if(date){
            
                const startDate=new Date(date);
                const endDate=new Date(date);
                endDate.setDate(endDate.getDate()+1);


               filter.departureTime = {
                [Op.gte]: startDate,
                [Op.lt]: endDate,
            };

            
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
                If no options are available, say no travel options found.
                Before giving recommendation, carefully calculate cheapest and fastest options from the provided data. Do not make mathematical mistakes.
               
                Do not infer airline names, bus operators, or any other information from the flight or bus numbers.
                Only use the exact fields provided in the data.
                If a field is missing, simply omit it.
                Never make assumptions.

                calculate the cheapest and fastest options yourself based on the provided data. Do not rely on any "cheapest" or "fastest" labels in the data, as they may not be accurate.
                `


                const response = await groqClient.post("/chat/completions", {
                    model: "llama-3.1-8b-instant",
                    messages: [
                        {
                        role: "user",
                        content: prompt,
                        },
                    ],
                    temperature: 0.4,
                });

                return response.data.choices[0].message.content;
        }




        catch(error){
            console.log("Error in recommending trips in ai service",error);
            throw error;


        }






    }







}


module.exports=AiService;