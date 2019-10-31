
'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const _ = require('underscore');
const app = express();

// API key must be provided when adding the integration on the Touchpoint admin interface
const apiKey = 'sup3r!5ecret';

app.post('/', jsonParser, (req, res) => {
	/* example:
		{
			unsigned: {
  				Name: 'Fred Smith',
				Email: 'fred@example.com'
			}
		},
		apiKey: 'sup3r!5ecret'
	} */
	console.log('Got a connection', req.body);
	if (req.body.apiKey === apiKey) {
		const context = req.body.context;
		const result = [];
		if (req.body.context.unsigned) {
			for (const key in req.body.context.unsigned) {
				if (req.body.context.unsigned.hasOwnProperty(key)) {
					let value = _.escape(req.body.context.unsigned[key]);
					if (key === 'Name') {
						value += ` <a href="https://example.com/lookup-person?name=${encodeURIComponent(value)}" target="_blank">Look up profile</a>`;
					}
					result.push(`
						<div class="row context-row">
							<div class="col-xs-3 context-label">${_.escape(key)}</div>
							<div class="col-xs-9 context-value">${value}</div>
						</div>
					`);
				}
			}
			res.send(result.join(''));
		}
	} else {
		res.sendStatus(401);
	}
});

app.listen(9265, err => {
	if (err) {
		console.log(err);
	} else {
		console.log('Listening on port 9265');
	}
})
