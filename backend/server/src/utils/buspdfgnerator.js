const Pdf=require('pdfkit');

const fs=require('fs');
const path=require('path');


const generateTicket=async(booking,payment)=>{

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
        "Bus Ticket Confirmation"
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
        `Flight Number: ${booking.bus.busNumber}`
    );

    doc.text(
        `Route: ${booking.bus.source} → ${booking.bus.destination}`
    );

    doc.text(
        `Departure: ${booking.bus.departureTime}`
    );

    doc.text(
        `Arrival: ${booking.bus.arrivalTime}`
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

module.exports=generateTicket;