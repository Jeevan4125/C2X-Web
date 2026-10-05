import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER || "info.c2x.com@gmail.com";
const rawPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD || "";
const smtpPass = rawPass.replace(/\s+/g, "");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export const sendSubscriptionConfirmationEmail = async (subscriberEmail) => {
  const year = new Date().getFullYear();
  const mailOptions = {
    from: process.env.SMTP_FROM || '"C2X Web IDE" <info.c2x.com@gmail.com>',
    to: subscriberEmail,
    subject: "🎉 Subscription Confirmed! Welcome to C2X Web IDE",
    text: `
Welcome to C2X Web IDE!

Thank you for subscribing to C2X developer updates with ${subscriberEmail}.

You will now receive the latest news on C2X Web IDE features, AI coding updates, developer tools, and product releases.

To launch the C2X Web IDE: https://c2x.com/editor
Documentation: https://c2x.com/docs

Best regards,
The C2X Team
info.c2x.com@gmail.com
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #e2e8f0; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background-color: #141414; border: 1px solid #282828; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #007acc 0%, #1f6feb 100%); padding: 30px 24px; text-align: center; }
    .header h1 { margin: 10px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
    .badge { background: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 4px 10px; border-radius: 4px; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }
    .content { padding: 32px 24px; font-size: 15px; line-height: 1.6; color: #cccccc; }
    .content h2 { color: #ffffff; font-size: 20px; margin-top: 0; }
    .box { background-color: #0a0a0a; border: 1px solid #222222; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .box-title { color: #58a6ff; font-weight: 600; margin-bottom: 8px; }
    .btn { display: inline-block; background-color: #238636; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; margin-top: 16px; }
    .footer { background-color: #0f0f0f; border-top: 1px solid #222222; padding: 20px 24px; text-align: center; font-size: 12px; color: #8b949e; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">C2X Web IDE</span>
      <h1>Subscription Confirmed 🎉</h1>
    </div>
    <div class="content">
      <h2>Welcome aboard!</h2>
      <p>Thank you for subscribing to C2X developer updates with <strong>${subscriberEmail}</strong>.</p>

      <div class="box">
        <div class="box-title">⚡ What to expect from C2X:</div>
        <ul style="margin: 0; padding-left: 20px; color: #e2e8f0;">
          <li>🚀 Latest C2X Web IDE feature previews & releases</li>
          <li>🤖 AI-assisted coding & intelligence updates</li>
          <li>🛠️ Modern cloud developer tools & tutorials</li>
          <li>⚡ Performance benchmarks & developer workflows</li>
        </ul>
      </div>

      <p>Ready to start coding anywhere, anytime, entirely in your browser?</p>

      <a href="https://c2x.com/editor" class="btn">Launch C2X Web IDE</a>
    </div>
    <div class="footer">
      <p>Sent from <strong>info.c2x.com@gmail.com</strong></p>
      <p>© ${year} C2X — Modern Developer Workspace. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

export const sendNewsletterNotification = async (
  email,
  ipAddress,
  userAgent,
) => {
  const timestamp = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || '"C2X Web IDE" <info.c2x.com@gmail.com>',
    to: process.env.ADMIN_EMAIL || smtpUser,
    subject: "🎉 New Newsletter Subscriber",
    text: `
A new user subscribed to C2X.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📧 Email: ${email}
  🕐 Time: ${timestamp} UTC
  🌐 IP Address: ${ipAddress || "N/A"}
  🖥️ Browser: ${userAgent || "N/A"}
  🏢 Website: C2X

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is an automated notification from C2X.
    `.trim(),
    html: `
      <h2>🎉 New Newsletter Subscriber</h2>
      <p>A new user subscribed to C2X.</p>
      <hr>
      <table>
        <tr><td><strong>📧 Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>🕐 Time:</strong></td><td>${timestamp} UTC</td></tr>
        <tr><td><strong>🌐 IP Address:</strong></td><td>${ipAddress || "N/A"}</td></tr>
        <tr><td><strong>🖥️ Browser:</strong></td><td>${userAgent || "N/A"}</td></tr>
        <tr><td><strong>🏢 Website:</strong></td><td>C2X</td></tr>
      </table>
      <hr>
      <p><small>This is an automated notification from C2X.</small></p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

export const testEmailConnection = async () => {
  try {
    await transporter.verify();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default {
  sendSubscriptionConfirmationEmail,
  sendNewsletterNotification,
  testEmailConnection,
};
