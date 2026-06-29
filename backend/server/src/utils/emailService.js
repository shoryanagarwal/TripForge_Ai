const dotenv = require("dotenv");
dotenv.config();

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "TripForge AI",
          email: process.env.EMAIL_FROM,
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
        textContent: text || "",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo email error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;