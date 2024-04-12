import * as Handlebars from 'handlebars';

export function registerHandlebarsHelpers() {
  Handlebars.registerHelper('eq', function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
  });
}
