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



            const plainFlights=flights.map(f=>f.toJSON()); // Convert Sequelize instances to plain objects
            const plainBuses=buses.map(b=>b.toJSON());


            const allOptions=[
                ...plainFlights.map(f=>({...f,type:'flight'})),
                ...plainBuses.map(b=>({...b,type:'bus'}))

            ]



            if (allOptions.length === 0) {
            return "No travel options found for the selected route and date.";
            }

            const cheapestOption=allOptions.reduce((min,item)=>{ //what is reduce function in js-> it reduces the value to 1 by iterating the array according to the condition provided in the function
                return item.price<min.price?item:min;
            },allOptions[0]) 

            const fastestOption=allOptions.reduce((min,item)=>{
                return item.duration<min.duration?item:min;
            },allOptions[0])  //it means take the first element of alloptions ans the inital value of min







            const prompt=`
            You are TripForge AI, a travel recommendation assistant.

                User wants to travel:
                Source: ${source}
                Destination: ${destination}
                Date: ${date || "not specified"}
                Budget: ₹${budget || "not specified"}

                Available Flights:
                ${JSON.stringify(plainFlights, null, 2)} 

                Available Buses:
                ${JSON.stringify(plainBuses, null, 2)}

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



                Pre-calculated results by backend:

                Cheapest Option:
                ${JSON.stringify(cheapestOption, null, 2)}

                Fastest Option:
                ${JSON.stringify(fastestOption, null, 2)}

                Your task:
                    Explain the travel options in a clear and helpful way.

                    Rules:
                    1. You MUST use the backend-calculated cheapest option as the cheapest option.
                    2. You MUST use the backend-calculated fastest option as the fastest option.
                    3. Do NOT recalculate or change cheapest and fastest options.
                    4. Do NOT invent airline names, bus operators, routes, prices, durations, or timings.
                    5. Only use fields present in the provided data.
                    6. If a field is missing, omit it.
                    7. Keep the response concise and user-friendly.
                    9. also denote time of duration and departure and arrival in hours and minutes format
                    10. bold the best overall recommendation in the response. and also the important data related to it like price and duration.

                    Best Overall Recommendation Rule:
                    - If the user provided a budget, first consider options within budget.
                    - If at least one flight is within budget and it saves more than 6 hours compared to the cheapest bus, prefer the flight as best overall.
                    - If no flight is within budget, recommend the best bus option.
                    - If budget is not provided, balance price, duration, and convenience.
                    - Cheapest option can still be a bus, but best overall should consider time saved and comfort.

                    Return exactly in this structure:

                    Best Overall:
                    Mention the best overall option and explain why.

                    Cheapest Option:
                    Mention the backend-calculated cheapest option.

                    Fastest Option:
                    Mention the backend-calculated fastest option.

                    Final Recommendation:
                    Give a practical recommendation based on budget, duration, and convenience.
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