/*

category#   name
34000000	holiday entertainment
31000000	holiday clothes
15000000	groceries
21000000	household supplies
6000000	    health/beauty
2000000	    baby
11000000	pet
10000000	electronics
3000000	    appliances
13000000	home
18000000	furniture
8000000	    toys
20000000	games
1000000	    books
9000000	    clothes
16000000	jewelry
17000000	sport
5000000	    arts/crafts
12000000	office supplies
19000000	tools/hardware
4000000	    automotive

*/

var casper = require('casper').create();
var x = require('casper').selectXPath;
var fs = require('fs');
var i = 0;



casper.start();

var categoryArray = [6000000]

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

        append2Index(itemName, price)

    }//loop
};//getItem function


function append2Index(itemName, price){

    // remove $ from string
    price = price.replace("$", "")

    // remove double quotes from string
    itemName = itemName.replace(/\"/g, "")
    itemName = itemName.replace(/\:/g, "")

    if (itemName !== "" || price !== ""){
        fs.write('index.html', '{"itemName":' + '"' + itemName + '"' + ',' + '"price":' + '"' + price + '"}, \n', 'a')
        i++;

        console.log(itemName) //returns Mead Fashion 2-Pocket Folder, blue
        console.log(price) // returns 1
    }


}//append2Index



casper.run();
