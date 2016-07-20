/* ------------------------------------------------------------------------- *\
	 						   ROUTES GROUPES
\* ------------------------------------------------------------------------- */

var Groupe = require('../models/groupes.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function(app) {

    app.get('/api/groupes', Auth.user.hasAuthorization, Groupe.findAll);

    app.get('/api/groupe/:id', Auth.user.hasAuthorization, Groupe.findById);

    app.post('/api/groupe/:user_id', Groupe.create);

    app.put('/api/groupe/:group_id/:user_id', Auth.user.hasAuthorization, Groupe.addUserToGroup);

    app.delete('/api/groupe/:group_id/:user_id', Auth.user.hasAuthorization, Groupe.removeUserFromGroup);

    app.put('/api/groupe/:id', Auth.user.hasAuthorization, Groupe.update);

    app.delete('/api/groupe/:id', Auth.user.hasAuthorization, Groupe.delete);

};
