const db = require('../utils/db');
const localStrategy = require('passport-local').Strategy;


module.exports = function (passport) {
	passport.use('local-signin',
		new localStrategy(
			{
				passReqToCallback: true,
			},
			(req, username, password, done) => {
				let sql = `SELECT * FROM users where userName = '${username}'`;
				db.query(sql)
					.then(result => {
						if (!result.length) {
							return done(
								null,
								false,
							);
						}
						if (password !== result[0].password)
							return done(
								null,
								false,
							);

						req.session.cookie.expires = false;
						return done(null, result[0]);
					})
					.catch(err => {
						return done(err);
					});
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user.user_id);
	});

	passport.deserializeUser((id, done) => {
		let sql = `SELECT * FROM users where user_id = '${id}'`;
		db
			.query(sql)
			.then(result => {
				done(null, result[0]);
			})
			.catch(err => {
				done(err, false);
			});
	});
};
