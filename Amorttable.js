
var la = document.getElementById('loanamount');
var loanterm = document.getElementsByName('15yr');
var LL = document.getElementById('loanlen').options[0];
var LL30 = document.getElementById('loanlen').options[1];
var table1 = document.getElementById('tab1');
var loanamt = document.getElementById('loanamount');
var apr = document.getElementById('interestrate');

var loancalc = document.getElementById("loandiv");
 


var cpla = document.getElementById('copyloanamt');
var cplt = document.getElementById('copyloanterm');
var cpir = document.getElementById('copyinterestrate');
var n = 15*12;
var mnthpmt = document.getElementById('monthlypmt');
var totint = document.getElementById('totalinterestpaid');


//on click will refresh table



var test = () => { 
// if option[0] (15 years) is selected and no input is added  
    if(LL.selected === true){
        if(loanamt.value <= 0){
            window.alert('Please enter a valid loan amount');
        }
        if( apr.value <= 0){
            window.alert('Please enter a valid interest rate')
        } 
// use usd.format() + "$ " to get numbers to US dollars 
        var usd = Intl.NumberFormat('en-US');

        cplt.innerHTML = "Loan Term: 15 Years "+"("+n+" months)";
        cpla.innerHTML = "Loan Amount: $<u>"+usd.format(loanamt.value)+"</u>";
        var localrate = eval(apr.value/12)
        cpir.innerHTML = "Interest Rate (per period): "+localrate.toFixed(2); 
        var monthpaymentrate = localrate/100;
        var localnumer = 1 + monthpaymentrate;
        var numer = (monthpaymentrate*(Math.pow(localnumer, 180)));
        var denom = (Math.pow(localnumer, 180)-1);
        var monthlypayment = loanamt.value*(numer/denom);
        mnthpmt.innerHTML = "Monthly Payment: $<u>"+usd.format(monthlypayment.toFixed(0))+"</u>";
        var totalintpaid = (monthlypayment*180)-loanamt.value;
        totint.innerHTML = "Total Interest Paid on Loan: $<u>"+usd.format(totalintpaid.toFixed(0))+"</u>";

// loan amt to use in first row of table 
        var bb = loanamt.value;
        let principalpmt = monthlypayment.toFixed(2)-(bb*monthpaymentrate);
        var interestpmt = eval(monthlypayment.toFixed(2)-principalpmt.toFixed(2));
        var endingbalance = bb-principalpmt;


//create table to go beneath table headers 
        var table2 = "";
        table2 += "<table id='loantable'>";
        table2 += "<tr>";
            table2 += "<td class='col1'> 1 </td>";
            table2 += "<td class='col2'> $ "+usd.format(bb)+"</td>";
            table2 += "<td class='col3'> $ "+usd.format(interestpmt.toFixed(0))+"</td>";
            table2 += "<td class='col4'> $ "+usd.format(principalpmt.toFixed(0))+"</td>";
            table2 += "<td class='col5'> $ "+usd.format(endingbalance.toFixed(0))+"</td>";
        table2 += "</tr>";

// start calc to fill table 
        var begbal = loanamt.value;
        var princ = monthlypayment - (begbal*(monthpaymentrate));
        var currentinterest = monthlypayment - princ;
        var endingbal = begbal - princ;
        let m = 1;
        while(Math.floor(endingbal) > 0){
            begbal = endingbal;
            princ = monthlypayment - (begbal*(monthpaymentrate));
            currentinterest = monthlypayment - princ;
            endingbal = begbal - princ;
            m++;
// for each row calc the next month payment || m is counter for month 
            table2 += "<tr>";
            table2 += "<td class='col1'>"+usd.format(m.toFixed(0))+"</td>";
            table2 += "<td class='col2'>$ "+usd.format(begbal.toFixed(0))+"</td>";
            table2 += "<td class='col3'>$ "+usd.format(currentinterest.toFixed(0))+"</td>";
            table2 += "<td class='col4'>$ "+usd.format(princ.toFixed(0))+"</td>";
            table2 += "<td class='col5'>$ "+usd.format(endingbal.toFixed(0))+"</td>";
        table2 += "</tr>";
        
        }; 
       
        
        
        table2 += "</table>";
        var loancalc = document.getElementById("loandiv");
        loancalc.innerHTML = table2;

}   else if (LL30.selected === true) {
        if(loanamt.value <= 0){
            window.alert('Please enter a valid loan amount');
        }
        if( apr.value <= 0){
            window.alert('Please enter a valid interest rate')
        } 
    
    var usdol = Intl.NumberFormat('en-US');
    var newbb = loanamt.value;
    var newint = apr.value/12;
    var p = 2;


    var newapr = newint/100;
    var newnumer = (newapr*Math.pow(1+newapr, 360));
    var newdenom = (Math.pow(1+newapr, 360)-1);
    var newMP = newbb*(newnumer/newdenom);
    var totalinterest = (newMP*360)-newbb;
    cplt.innerHTML = "Loan Term: 30 Years (360 months)";
    cpla.innerHTML = "Loan Amount: $<u>"+usdol.format(loanamt.value)+"</u>";
    cpir.innerHTML = "Interest Rate (per period): "+newint.toFixed(2);
    mnthpmt.innerHTML = "Monthly Payment: $<u>"+usdol.format(newMP.toFixed(0))+"</u>";
    totint.innerHTML = "Total Interest Paid on Loan: $<u>"+usdol.format(totalinterest.toFixed(0))+"</u>";

    

    var currentbal = loanamt.value;
    var principal = newMP - (currentbal*newapr);
    var intpay = newMP - principal;
    var endbal = currentbal - principal;

    var dispint = usdol.format(intpay.toFixed(0));
    var dispprin = usdol.format(principal.toFixed(0));
    var dispend = usdol.format(endbal.toFixed(0));



    var newtable = "";
        newtable += "<table id='newtable1'>"
        newtable += "<tr>"
            newtable += "<td class='col1'>"+1+"</td>"
            newtable += "<td class='col2'> $ "+usdol.format(currentbal)+"</td>"
            newtable += "<td class='col3'> $ "+dispint+"</td>"
            newtable += "<td class='col4'> $ "+dispprin+"</td>"
            newtable += "<td class='col5'> $ "+dispend+"</td>"
        newtable += "</tr>"
       
        while(Math.floor(endbal) > 0){
       
           currentbal = endbal;
           principal = newMP - (currentbal*newapr);
           intpay = newMP - principal;
           endbal = currentbal - principal;
           
           
           
        newtable += "<tr>"
           newtable += "<td class='col1'>"+p+"</td>"
           newtable += "<td class='col2'> $ "+usdol.format(currentbal.toFixed(0))+"</td>"
           newtable += "<td class='col3'> $ "+usdol.format(intpay.toFixed(0))+"</td>"
           newtable += "<td class='col4'> $ "+usdol.format(principal.toFixed(0))+"</td>"
           newtable += "<td class='col5'> $ "+usdol.format(endbal.toFixed(0))+"</td>"
        newtable += "</tr>"    
        p++;
       };

    newtable += "</table>";
    var loancalc = document.getElementById('loandiv');
    loancalc.innerHTML = newtable;    
    

    }



};

var refresh = () => {
    var tablerefresh = document.getElementById('loantable');
    var newtablerefresh = document.getElementById('newtable1');
    cplt.innerHTML = "Loan Term: ";
    cpla.innerHTML = "Loan Amount: ";
    cpir.innerHTML = "Interest Rate (per period): ";
    mnthpmt.innerHTML = "Monthly Payment: ";
    totint.innerHTML = "Total Interest Paid on Loan: ";
    apr.value = '';
    loanamt.value = '';
    loancalc.innerHTML = " ";
    tablerefresh.innerHTML = " ";
    newtablerefresh.innerHTML = " ";
     
};




var calcLoan = () => {
    
};