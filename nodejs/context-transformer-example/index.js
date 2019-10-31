
const express = require('express');
const jsonParser = require("body-parser").json();
const app = express();

// API key must be provided when adding the integration on the Touchpont admin interface
const apiKey = 'sup3r!5ecret';

app.post('/', jsonParser, (req, res) => {
	console.log('Got a connection', req.body);
	if (req.body.apiKey === apiKey) {
		const context = req.body.context;
		if (context.signed && context.signed['User ID']) {
			const userId = context.signed['User ID'];
			getBalance(userId, (err, balance) => {
				if (err) {
					console.log('Error getting balance for ' + userId, err);
				} else {
					context.signed['Balance'] = '' + balance; // all context fields must be strings
				}
				res.send(context);
			});
		} else {
			res.send(context);
		}
	} else {
		res.sendStatus(401);
	}
});

function getBalance(userId, callback) {
	// Get balance from database... or at least, pretend to
	setTimeout(() => {
		callback(null, Math.floor(Math.random()*1000));
	}, 100);
}

app.listen(9265, err => {
	if (err) {
		console.log(err);
	} else {
		console.log('Listening on port 9265');
	}
})
