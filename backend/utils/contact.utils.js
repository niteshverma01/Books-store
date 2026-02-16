import nodemailer from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.GMAIL_REDIRECT_URI || "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const SENDER_EMAIL = process.env.GMAIL_SENDER_EMAIL;

function assertEmailConfig() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !SENDER_EMAIL) {
    throw new Error("Missing Gmail OAuth configuration in environment.");
  }
}

// Create an OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Set the refresh token
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Generate an access token
async function generateAccessToken() {
  const { token } = await oauth2Client.getAccessToken();
  return token;
}

// Send email using nodemailer
export async function sendEmail({ fullname, email, message }) {
  try {
    assertEmailConfig();
    const accessToken = await generateAccessToken();

    // Create a transporter using OAuth2
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // Email options
    const mailOptions = {
      from: SENDER_EMAIL,
      replyTo: email,
      to: SENDER_EMAIL,
      subject: "Contact Form Message",
      text: `From: ${fullname || "Anonymous"} <${email}>\n\n${message}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("Error sending email:", error);
    throw error;
  }
}
