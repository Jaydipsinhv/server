
const { renderTemplate } = require('./template-provider');
const mailer = require('./mailer');

/**
 *  prepare html content from model and send email via SMTP mailer
 * @param {string} to
 * @param {string} subject
 * @param {string} templateName
 * @param {object} model
 */
const sendEmail = async (to, subject, templateName, model) => {
  const htmlContent = await renderTemplate(templateName, model);
  await mailer.send(to, subject, htmlContent, []).catch((error) => error);
};

module.exports = {
  sendEmail,
};
