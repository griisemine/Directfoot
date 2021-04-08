const express = require('express');

const cors = require('cors');

const fetch = require('node-fetch');

const app = express(),
      port = 8080;

app.use( cors() );

app.get("/Match", (req,res) => {

    const url = "https://samymahi.eu/accueil.json";

   
    const response = await fetch(url);
    res = await response.json();
    console.log(res);
});

app.listen(port, () => { 
    console.log('Server is running on port ' + port ); 
});