const authResolver = require('./auth');
const bookinResolver = require('./booking');
const eventResolver = require('./events');

module.exports = {
  ...authResolver,
  ...bookinResolver,
  ...eventResolver,
};
