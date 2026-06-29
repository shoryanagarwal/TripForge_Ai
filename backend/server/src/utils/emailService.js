const dotenv = require("dotenv");
dotenv.config();

const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async ({ to, subject, text, html, attachments }) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "TripForge AI",
      email: process.env.EMAIL_FROM_ADDRESS,
    };

    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.textContent = text || "";

    if (attachments && attachments.length > 0) {
      sendSmtpEmail.attachment = attachments.map((file) => ({
        name: file.filename,
        content: file.content.toString("base64"),
      }));
    }

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return response;
  } catch (error) {
    console.error("Brevo email error:", error?.response?.body || error);
    throw error;
  }
};

module.exports = sendEmail;