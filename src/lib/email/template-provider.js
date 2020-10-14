
const fs = require('fs');
const Handlebars = require('handlebars');
const EmailTemplate = require('email-templates');
const path = require('path');

Handlebars.registerPartial('header', fs.readFileSync(path.join(__dirname, 'templates/partials/header.hbs'), 'utf8'));
Handlebars.registerPartial('footer', fs.readFileSync(path.join(__dirname, 'templates/partials/footer.hbs'), 'utf8'));
Handlebars.registerPartial('signoff', fs.readFileSync(path.join(__dirname, 'templates/partials/signoff.hbs'), 'utf8'));

/**
 *  prepare html content for email using handlebars
 * @param {String} templateName
 * @param {Object} model
 */
async function renderTemplate(templateName, model) {
  const newsletter = new EmailTemplate({
    views: {
      root: path.join(__dirname, 'templates'),
      options: {
        extension: 'hbs',
      },
    },
  });
  const templateString = await newsletter.render(templateName, model);
  return templateString;
}

module.exports = {
  renderTemplate,
};
