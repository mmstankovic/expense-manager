require('dotenv').config();
const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')
const mongoose = require('mongoose')

const expensesRoutes = require('./routes/expense-routes')

const port = process.env.PORT || 5000

const app2 = express()
app2.use(cors())
app2.use(body_parser.json())

app2.get('/', (req, res) => {
    res.send('Hello, world!')
})

app2.use('/api/expenses', expensesRoutes)

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app2.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })