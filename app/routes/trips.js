/* ------------------------------------------------------------------------- *\
	 						   ROUTES TRIPS
\* ------------------------------------------------------------------------- */

var Trip = require('../models/trips.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app) {

	app.get('/api/trips', Auth.user.hasAuthorization, Trip.findAll);

	app.get('/api/trip/:id', Auth.user.hasAuthorization, Trip.findById);

	app.post('/api/trip', Trip.create);

	app.put('/api/trip/:id', Auth.user.hasAuthorization, Trip.update);

	app.delete('/api/trip/:id', Auth.user.hasAuthorization, Trip.delete);

};
