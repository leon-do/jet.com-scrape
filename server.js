var casper = require('casper').create();
var x = require('casper').selectXPath;



casper.start();

//find how many pages there are
casper.thenOpen('https://jet.com/search?&sort=price_low_to_high&category=12000000&page=1', function(){
    var pageNumberPath = x('/html/body/div[2]/div[1]/div/div[1]/div[3]/div[2]/ul[1]/li[5]/a');

    var maxPageNumber = parseInt(this.fetchText(pageNumberPath));
    nextPage(maxPageNumber)

})


//jetURL can be changed
function nextPage(maxPageNumber){
    for (var pageNumber = 1; pageNumber <= maxPageNumber; pageNumber++){
        var jetURL = 'https://jet.com/search?&sort=price_low_to_high&category=12000000&page='+pageNumber;
        casper.thenOpen(jetURL,getItem)
    }
}


function getItem(){

    //loop itemNumber to get all the prices for page 1
    for (var itemNumber = 1; itemNumber <= 24; itemNumber++){

        var itemNamePath = x('/html/body/div[2]/div[1]/div/div[1]/div[3]/div[1]/ul/li['+itemNumber+']/a/div[2]/div[2]')

        var pricePath = x('/html/body/div[2]/div[1]/div/div[1]/div[3]/div[1]/ul/li['+itemNumber+']/a/div[2]/div[4]/div[1]/span[1]')

        var itemName = this.fetchText(itemNamePath);

        var price = this.fetchText(pricePath);

        console.log(itemName) //returns Mead Fashion 2-Pocket Folder, blue
        console.log(price) // returns $1

    }//loop
};//getItem function



casper.run();
