import { sendEmail } from "../utils/contact.utils.js";

export async function createContact(req, res) {
  const { fullname, email, message } = req.body;

  if (!email || !message) {
    return res
      .status(400)
      .json({ message: "Email and message are required." });
  }

  try {
    // Send email using the sender's email and message from the form
    await sendEmail({ fullname, email, message });

    // Respond back to the user
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error submitting form, please try again later." });
  }
}
