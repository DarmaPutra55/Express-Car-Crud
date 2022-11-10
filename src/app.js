const express = require('express');
const helemt = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(helemt());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('tiny'));

app.get('*',  (req, res)=>{
    res.status(404).json({
        ok: false,
        error: "Route is not found."
    });
});

app.use((error, req, res, next)=>{
    const errStatus = error.status || 400;
    res.status(errStatus).json({
        "status" : "error",
        "error" : error.message
    });
});
  

app.listen(3001, ()=>{
    console.log("Listened on port 3001");
})