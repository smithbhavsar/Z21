const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const csvtojson = require('csvtojson');
const fs = require('fs');

app.use(bodyParser.urlencoded({
    extended: true
  }));

  const url = 'https://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?tp=2&frmdt=01-Apr-2022&todt=11-Apr-2022'
  const options = {
    method: 'POST',
    json: true,
  }

  //Fetching Data from https://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?tp=2&frmdt=01-Apr-2022&todt=11-Apr-2022 
  //and storing it in Output.json in json format
  app.post('/post',function(req,res){

    request(url, options, (err,resp,body) => {
      const data = body;
      csvtojson({delimiter:[";"], noheader:false})
      .fromString(data)
      .then((csvrow)=>{
        console.log("true");
        fs.writeFile('output.json',JSON.stringify(csvrow),'utf-8',(err)=>{
          if(err){
            console.log(err);
          }
          else{
            res.status(200).json({isConnected: true});
          }ç
        });
      });
    });
  });

  //Create a GET API to get the top ten fund based on the returns of last 7 days
  app.post('/returns', function(req, res) {

    fs.readFile('output.json', 'utf8', function(err, data){
      // Display the file content
      var obj = JSON.parse(data);
      obj.filter((item)=>{
        if(item['Date'] === '11-Apr-2022') {
          console.log({Item: item['Scheme Code'],Value: item['Net Asset Value']})
        }
      });
  });
    
  console.log('readFile called');

  });

  //Create a GET API to get the top ten fund based on highest standard deviation
  app.get('/standard', function(req, res) {

  });

  app.listen(8080);
