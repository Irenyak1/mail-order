
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
            return  false
        }
   
};

function Exit (){
        if (confirm("Are you sure you want to exit this page?")) {
           
            document.write("<p>You may wish to <a href='mailOrder.html'>Make an Order</a> or <a href='index.html'>Exit completely!</a></p>");  
        }
        
    
}

     