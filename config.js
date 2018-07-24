var config = {
	database: {
		multipleStatements: true,
		host:	  'localhost', 	// database host
		user: 	  'root', 		// your database username
		password: '', 		// your database password
		port: 	  3306, 		// default MySQL port
		db: 	  'sampledb' 		// your database name
	},
	server: {
		host: '127.0.0.1',
		port: '4300'
	}
}

module.exports = config
