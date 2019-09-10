
window.onload = function () {
    document.getElementById('customerid').focus();
}


/* 
   The arrow function validData to validate the inputs in a mail order, 
   in the html file and return a valid response to help the 
   customer know where they have inputed a wrong value. If the value provided 
   is wrong, the input will turn red on submit and if the value is right, 
   it will turn green.
*/
const ValidData = () => {

    //Validating user Id making sure it has no white spaces.
    var customerId = document.getElementById("customerid");
    const idregex =/^\d{3}-\d{2}-\d{4}$/;
        
        if(customerId.value.match(idregex)) {
            customerId.style.border = "1px solid green";
            
        } else {
            customerId.style.border = "1px solid red";
            document.getElementById('iderror').innerHTML = "Customer ID cannot be missing and cannot contain any blank spaces."
            // return false
            
        }
    
    //Validating customer name making sure it is a string with space between names.
    var customerName = document.getElementById("name");
    const nameregex = /^[a-zA-Z].*[\s\.]*$/g;

        if(nameregex.test(customerName.value)){
            customerName.style.border = "1px solid green";
            
        }else{
            customerName.style.border = "1px solid red";
            document.getElementById("nameerror").innerHTML = "Customer Name cannot be missing."
            // return false
            
        }

    // Validating towncode so that it is always entered as exactly three characters
    var townCode = document.getElementById("selection");
    const coderegex = /^\w{3}$/;
  

        if(coderegex.test(townCode.value)){
            townCode.style.border = "1px solid green";
            
        }else {
            townCode.style.border = "1px solid red";
            document.getElementById("codeerror").innerHTML = "Town code must always be entered as exactly three characters."
            // return false
        }
    
    //Validating part number to make sure it is only numeric and greater than zero.
    var partNumber = document.getElementById("partn");
    const partNregex = /^0*[1-9]\d*$/;
    

        if (partNumber.value.match(partNregex)) {
            partNumber.style.border = "1px solid green";
            
        } else {
            partNumber.style.border = "1px solid red";
            document.getElementById("partnerror").innerHTML = "Part Number cannot be missing."
            // return false
        }
    
    // Validating description to check if a string is not empty and not just whitespace
    var descript = document.getElementById("description");
    const descregex = /\S/;

        if (descregex.test(descript.value) ) {
            descript.style.border = "1px solid green";
            
        } else {
            descript.style.border = "1px solid red";
            document.getElementById("descripterror").innerHTML = "Description cannot be missing."
            // return false
        }

    // Validating price making sure it contains two decimal places and it is not zero
    var price = document.getElementById("price");
    const priceregex = /(\d+\.\d{1,2})/g;

        if (priceregex.test(price.value)){
            price.style.border = "1px solid green";
            
        }else {
            price.style.border = "1px solid red";
            document.getElementById("priceerror").innerHTML = "Price must be a number that is greater than zero."
            // return false
        }
    
    // Validating quantity to make sure it is numeric but not zero 
    var quantity = document.getElementById("quantity");
    const quantregex = /^0*[1-9]\d*$/;

        if (quantregex.test(quantity.value)){
            quantity.style.border = "1px solid green";
            
        }else {
            quantity.style.border = "1px solid red";
            // return  false
        }
   orderCost(), SalesTaxCompute(), ShippingHandling(), Total();
};

var orderCost = ()=> {
    var price = document.getElementById("price").value;
    var quant = document.getElementById("quantity").value;
    // myCost = document.getElementById("cost");

       var cost = price * quant;
       document.getElementById("cost").innerHTML = "$" + cost.toFixed(2);
       return parseFloat(cost);

}

/*
    Function to calculate sales taxes for retail customers
    making orders from different towns, Kampala, Entebbe, Mbarara and any other.
*/
var SalesTaxCompute = ()=> {
    
    //Get town selected and if customer is a retailer
    var state = document.getElementById("selection").value;
    var retail = document.getElementById("retail").checked;
    var salesTaxEl = document.getElementById("tax")
    var cost = orderCost();

    // Get sales tax for KLA (Kampala) retail customer
    if (state.toUpperCase() === "KLA" && retail === true) {
        var salesTax = ( cost * 10/100).toFixed(2);
        salesTaxEl.innerHTML = "$ " + salesTax;
        return salesTax;

    }
    // Get sales tax for EBB (Entebbe) retail customer
    else if (state.toUpperCase() === "EBB" && retail === true) {
        var salesTax = (cost * 5/100).toFixed(2);
        salesTaxEl.innerHTML = "$ " + salesTax;
        return salesTax;

    }

    // Get sales tax for MBR (Mbarara) retail customer
    else if (state.toUpperCase() === "MBR" && retail === true) {
        var salesTax = (cost * 5/100).toFixed(2);
        salesTaxEl.innerHTML = "$ " + salesTax;
        return salesTax;
    }
    

    // Get sales tax for a wholesale customer or a retail customer from any other town 
    else {
        var salesTax = 0;
        salesTaxEl.innerHTML = "$ " + salesTax.toFixed(2);
        return salesTax;
    
    }


}


// Function to calculate shipping and handling charges
var ShippingHandling = () => {
    var ups = document.getElementById("ups").checked;
    var fedexG = document.getElementById("fedex").checked;
    var usPostal = document.getElementById("postal").checked;
    var fedexAir = document.getElementById("fedexair").checked;
    var quantity = document.getElementById("quantity").value;
    var oversize = document.getElementById("oversize").checked;

    
    // Get shipping and handling cost when using Ups method with oversize
    if (ups === true && oversize === true) {
        costOne = (7 + 5) * quantity;
        document.getElementById("handling").innerHTML = costOne.toFixed(2);
        return costOne.toFixed(2);
    }

    // Get shipping and handling cost when using Ups method with no oversize
    else if (ups === true && oversize === false) {
        costTwo = 7 * quantity;
        document.getElementById("handling").innerHTML = costTwo.toFixed(2);
        return costTwo.toFixed(2);

    }
    // Get shipping and handling cost when using fedex ground method with oversize
    else if (fedexG === true && oversize === true) {
        costOne = (9.25 + 5) * quantity;
        document.getElementById("handling").innerHTML= costOne.toFixed(2);
        return costOne.toFixed(2);
    }
    // Get shipping and handling cost when using fedex ground method with no oversize
    else if (fedexG === true && oversize === false) {
        costTwo = 9.25 * quantity;
        document.getElementById("handling").innerHTML = costTwo.toFixed(2);
        return costTwo.toFixed(2);
    }
    //Get shipping and handling cost when using US Postal Air method with oversize
    else if(usPostal=== true && oversize === true) {
        costOne = (8.50 + 5) * quantity;
        document.getElementById("handling").innerHTML = costOne.toFixed(2);
        return costOne.toFixed(2);
    }
    //Get shipping and handling cost when using US Postal Air method with no oversize
    else if (usPostal === true && oversize === false) {
        costTwo = 8.50 * quantity;
        document.getElementById("handling").innerHTML = costTwo.toFixed(2);
        return costTwo.toFixed(2);
    }
    //Get shipping and handling cost when using Fedex Air method with oversize
    else if (fedexAir === true && oversize === true) {
        costOne = (12 + 5) * quantity;
        document.getElementById("handling").innerHTML = costOne.toFixed(2);
        return costOne.toFixed(2);
    }
    //Get shipping and handling cost when using Fedex Air method with no oversize
    else if(fedexAir === true && oversize === false) {
        costTwo = 12 * quantity;
        document.getElementById("handling").innerHTML = costTwo.toFixed(2);
        return costTwo.toFixed(2);
    }  
    
    //Get shipping and handling cost when using the default selected method
    else {
        costTwo = 7 * quantity;
        document.getElementById("handling").innerHTML = costTwo.toFixed(2);
        return costTwo.toFixed(2);
    }
}

// Total function takes up all the functions above as arguments,
// adds them and returns the grand total cost of the mail order.

// var Total = parseFloat(orderCost()+ SalesTaxCompute() + ShippingHandling()).toFixed(2)
// document.getElementById("total").innerHTML = Total.toFixed(2);
// return Total;

function Total () {
    orderCost();
    SalesTaxCompute();
    ShippingHandling();
    grandTotal = (orderCost()+ SalesTaxCompute()+ ShippingHandling()).toFixed(2)
    document.getElementById("my-total").innerHTML = grandTotal.toFixed(2);
    return grandTotal.toFixed(2);

}



function Exit (){
        if (confirm("Are you sure you want to exit this page?")) {
           
            document.write("<p>You may wish to <a href='mailOrder.html'>Make an Order</a> or <a href='index.html'>Exit completely!</a></p>");  
        }
        
    
}

     