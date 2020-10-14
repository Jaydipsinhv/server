const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 *  using transporter send email via SMTP
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 * @param {Array} attachments
 * @param {Boolean} isTransactional if transaction email then prepare cc array with secondary emails
 */
const send = async (to, subject, html, attachments) => {
  // prepare from name to display in email
  const fromName = 'Automation';
  const mailOptions = {
    from: `${fromName} ${process.env.FROM_EMAIL}`,
    to,
    subject,
    html,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  send,
};
