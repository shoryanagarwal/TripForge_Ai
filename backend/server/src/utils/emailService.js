const dotenv = require("dotenv");
dotenv.config();

const SibApiV3Sdk = require("@getbrevo/brevo");

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async ({ to, subject, text, html, attachments }) => {
  try {
    const email = {
      sender: {
        name: "TripForge AI",
        email: process.env.EMAIL_FROM_ADDRESS,
      },
      to: [
        {
          email: to,
        },
      ],
      subject,
      htmlContent: html,
      textContent: text,
    };

    if (attachments && attachments.length > 0) {
      email.attachment = attachments.map((file) => ({
        name: file.filename,
        content: file.content.toString("base64"),
      }));
    }

    const response = await apiInstance.sendTransacEmail(email);
    return response;
  } catch (error) {
    console.error("Brevo email error:", error);
    throw error;
  }
};

module.exports = sendEmail;