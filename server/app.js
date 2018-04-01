let express = require('express')        // call express
let app = express()                 // define our app using express
let bodyParser = require('body-parser')
let port = process.env.PORT || 3000

let cors = require('cors')
app.use(cors())

let dbConnector = require('./database/db-connector')
dbConnector.connectToMongoDB()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let articlesRouter = require('./routes/api')
app.use('/api/articles/', articlesRouter)


let server = require('http').Server(app);

server.listen(port, () => {
  console.log('listening on 3000')
})
