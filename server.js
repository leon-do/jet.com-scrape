/*

https://jet.com/search?category=34000000	holiday entertainment
https://jet.com/search?category=31000000	holiday clothes
https://jet.com/search?category=15000000	groceries
https://jet.com/search?category=21000000	household supplies
https://jet.com/search?category=6000000	    health/beauty
https://jet.com/search?category=2000000	    baby
https://jet.com/search?category=11000000	pet
https://jet.com/search?category=10000000	electronics
https://jet.com/search?category=3000000	    appliances
https://jet.com/search?category=13000000	home
https://jet.com/search?category=18000000	furniture
https://jet.com/search?category=8000000	    toys
https://jet.com/search?category=20000000	games
https://jet.com/search?category=1000000	    books
https://jet.com/search?category=9000000	    clothes
https://jet.com/search?category=16000000	jewelry
https://jet.com/search?category=17000000	sport
https://jet.com/search?category=5000000	    arts/crafts
https://jet.com/search?category=12000000	office supplies
https://jet.com/search?category=19000000	tools/hardware
https://jet.com/search?category=4000000	    automotive

*/

var casper = require('casper').create();
var x = require('casper').selectXPath;
var fs = require('fs');



casper.start();

var categoryArray = [19000000,12000000,5000000,17000000,16000000,9000000,1000000,20000000,8000000,18000000,13000000,3000000,10000000,11000000,2000000,6000000,21000000,15000000]

//loop through categories
for (var i = 0; i < categoryArray.length; i++){
    var categoyNumber = categoryArray[i];
    nextPage(categoyNumber)
}


//Move on to next page
function nextPage(categoyNumber){

    for (var pageNumber = 1; pageNumber <= 21; pageNumber++){
        var jetURL = 'https://jet.com/search?&sort=price_low_to_high&category='+categoyNumber+'&page='+pageNumber;
        casper.thenOpen(jetURL,getItem)
    }
}


//get item name and $
function getItem(){

    //loop itemNumber to get all the item names and prices
    for (var itemNumber = 1; itemNumber <= 24; itemNumber++){

        var itemNamePath = x('/html/body/div[2]/div[1]/div/div[1]/div[3]/div[1]/ul/li['+itemNumber+']/a/div[2]/div[2]')

        var pricePath = x('/html/body/div[2]/div[1]/div/div[1]/div[3]/div[1]/ul/li['+itemNumber+']/a/div[2]/div[4]/div[1]/span[1]')

        var itemName = this.fetchText(itemNamePath);

        var price = this.fetchText(pricePath);

        console.log(itemName) //returns Mead Fashion 2-Pocket Folder, blue
        console.log(price) // returns $1

        append2Index(itemName, price)

    }//loop
};//getItem function


function append2Index(itemName, price){

    // remove double quotes from string
    itemName = itemName.replace(/\"/g, "")
    itemName = itemName.replace(/\:/g, "")

    if (itemName !== "" || price !== ""){
        fs.write('index.html', '"' + itemName + '"' + ':' + '"' + price + '", \n', 'a')
    }

}



casper.run();
