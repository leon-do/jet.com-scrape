var casper = require('casper').create();
var x = require('casper').selectXPath;
var fs = require('fs');
var request = require('request')


request('file:///Users/leondo/Desktop/jet.com-scraper/jetData.html', function (error, response, body) {
  console.log(body)
})
