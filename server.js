var casper = require('casper').create();
var x = require('casper').selectXPath;

//links can be changed
casper.start('https://jet.com/search?category=12000000&page=1&sort=price_low_to_high');

casper.then(function() {

    //loop itemNumber to get all the prices for page 1
    for (var itemNumber = 1; itemNumber <= 24; itemNumber++){

        var itemNamePath = x('/html/body/div[2]/div[1]/div/div[1]/div[3]/div[1]/ul/li['+itemNumber+']/a/div[2]/div[2]')

        var pricePath = x('/html/body/div[2]/div[1]/div/div[1]/div[3]/div[1]/ul/li['+itemNumber+']/a/div[2]/div[4]/div[1]/span[1]')

        var itemName = this.fetchText(itemNamePath);

        var price = this.fetchText(pricePath);

        console.log(itemName) //returns Mead Fashion 2-Pocket Folder, blue
        console.log(price) // returns $1

    }//loop
});//casper function



casper.run();
