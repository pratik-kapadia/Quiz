require('dotenv').config();
debugger
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

db.on('error', (error) => { console.error(error) });
db.on('open', () => { console.log('Databse connection.', process.env.DATABASE_URL) })

app.use(cors());
app.use(express.json());

//ROUTES
const objectiveRouter = require('./routes/objective');
const testListRouter = require('./routes/testlist');
const testResultRouter = require('./routes/testResult');


// app.use('/objectives/test/:testid', objectiveRouter);
// app.use('/objectives/:id', objectiveRouter);
app.use('/objectives', objectiveRouter);

app.use('/testlist',testListRouter);

app.use('/testresult',testResultRouter);
app.use('/testresult/:userid/:testid',testResultRouter);
app.use('/testresult/:userid/:testid/:id',testResultRouter);


//LISTEN
app.listen(3000, () => { console.log('Server Started..!!') });