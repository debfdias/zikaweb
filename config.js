var config = {
	database: {
		multipleStatements: true,
		host:	  'us-cdbr-iron-east-01.cleardb.net', 	// database host
		user: 	  'b87ad073f0d63d', 		// your database username
		password: '2d8c7b6b', 		// your database password
		port: 	  3306, 		// default MySQL port
		db: 	  'heroku_77659378f7bfef1' 		// your database name
	},
	server: {
		host: '127.0.0.1',
		port: '4300'
	}
}

module.exports = config
