const Pdf=require('pdfkit');

const fs=require('fs');
const path=require('path');


const BusgenerateTicket=async(booking,payment)=>{

    const ticketDir=path.join(__dirname,"../tickets")


    if(!fs.existsSync(ticketDir)){
        fs.mkdirSync(ticketDir);
    }

    const filePath = path.join(ticketDir,`ticket_${booking.id}.pdf`)

    const doc=new Pdf();
    const stream=fs.createWriteStream(filePath);

    doc.pipe(stream);

     doc.fontSize(24).text(
    "TripForge AI",
    {
      align: "center",
    }
  );

    doc.moveDown();

    doc.fontSize(18).text(
        "Flight Ticket Confirmation"
    );

    doc.moveDown();

    doc.fontSize(12).text(
        `Booking ID: ${booking.id}`
    );

    doc.text(
        `Passenger Name: ${booking.user.name}`
    );

    doc.text(
        `Email: ${booking.user.email}`
    );

    doc.moveDown();

    doc.text(
        `Flight Number: ${booking.flight.flightNumber}`
    );

    doc.text(
        `Route: ${booking.flight.source} → ${booking.flight.destination}`
    );

    doc.text(
        `Departure: ${booking.flight.departureTime}`
    );

    doc.text(
        `Arrival: ${booking.flight.arrivalTime}`
    );

    doc.text(
        `Seats: ${booking.seats}`
    );

    doc.moveDown();

    doc.text(
        `Amount Paid: ₹${booking.totalAmount}`
    );

    doc.text(
        `Transaction ID: ${payment.transactionId}`
    );

    doc.text(
        `Payment Status: ${payment.status}`
    );


    doc.end();

    await new Promise((resolve,reject)=>{
        stream.on("finish", resolve);

        stream.on("error", reject);
    })


    return filePath;
}

module.exports=BusgenerateTicket;