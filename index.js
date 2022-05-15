const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const xlsx = require('xlsx');

app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.get('/', function(req, res) {

    res.send("Hello world");

  });

  app.post('/data', function(req,res){

    const url = 'https://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?tp=2&frmdt=01-Apr-2022&todt=11-Apr-2022'
    const options = {
      method: 'POST',
      json: true,
    }
    request(url, options, (err,res,body) => {
      console.log("body");
      const worksheet = xlsx.utils.book_new(body);
      const workbook = xlsx.utils.book_new();
  
      xlsx.utils.book_append_sheet(workbook,worksheet,'nav data');
  
      xlsx.write(workbook,{bookType:'xlsx', type:"buffer"});
      xlsx.write(workbook,{bookType:'xlsx', type:"binary"});
      xlsx.writeFile(workbook,"Navdata.xlsx");
    });

  });

  app.post('/returns',function(req,res){
    
  });

  app.listen(3000);