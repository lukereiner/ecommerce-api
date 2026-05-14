const routeLoader = require('../routes')

module.exports = async (app) => {
    await routeLoader(app);
}