
var newIncome = document.getElementById('incomeAmt')
var incomeType = document.getElementById('incometype')
var newExpense = document.getElementById('expenseAmt')
var expenseType = document.getElementById('expensetype')
var addtable = document.getElementById('table1')

// For US Dollar Format
var usd = Intl.NumberFormat('en-US');
// variable used to format the income value 
let toNumincome
// Set Income type to string
let incomeSource
// function used to post income value to table 
function createNewIncome(){

    incomeSource = incomeType.value.toString()
    let capletter = incomeSource.charAt(0).toUpperCase()
    let incomeSlice = incomeSource.slice(1)
    let newincomeSource = capletter + incomeSlice

    toNumincome = usd.format(newIncome.value);
    if(incomeType.value <= 0 || newIncome.value <= 0){
        window.alert("Please enter an Income Type or Amount.")
    }
    if(newIncome.value > 0 && incomeType.value != ''){
        addtable.innerHTML += "<tr><td>Income</td><td>"+newincomeSource+"</td><td> Monthly </td><td>$"+toNumincome+"</td></tr>"
    }
    // Refreshes the input values to default 
   var refreshincome = () => {
    newIncome.value = ''
    incomeType.value = ''
   }
   refreshincome()
    
}

// variable used to format the income value 
let toNumexpense
// Set Income type to string
let expenseSource
// function used to post income value to table 


// function used to post expense value to table 
function createNewExpense(){
    toNumexpense = usd.format(newExpense.value)

    expenseSource = expenseType.value.toString()
    let capletterexp = expenseSource.charAt(0).toUpperCase()
    let expSlice = expenseSource.slice(1)
    let newexpSource = capletterexp + expSlice

    if(expenseType.value <= 0 || newExpense.value <= 0){
        window.alert("Please enter an Expense(ex. Rent) or Amount.")
    }
    if(newExpense.value > 0 && expenseType.value != ''){
        addtable.innerHTML += "<tr><td>Expense</td><td>"+newexpSource+"</td><td> Monthly </td><td>$"+toNumexpense+"</td></tr>"
    }

    var refreshExpense = () => {
        newExpense.value = ''
        expenseType.value = ''
       }
       refreshExpense()
}

var ExpenseChart = document.getElementById('summaryExpense')


var incomeChart = document.getElementById('summaryIncome')
var totalexp = []
var replaceexparr = []
var runningtotalexpense = 0
let arrcount = 0
let cntexp = 0 

let inctable
var totalinc = []
var replaceinc = []
var runningtotalincome = 0

var pE = []
var EXPper = 0
var ECP = 0 
// sort and calculate for the submissions of income/expense
var chartview = () => {
    for(let i = 0; i <= addtable.rows.length; i ++){
        var totalIncome = addtable.rows[i].cells[0]
// categorize whether income or expense and color it accordingly 
        if(totalIncome.innerHTML === "Income"){
            totalIncome.style.background = 'green'
            addtable.rows[i].cells[3].style.background = 'green'

        var createchart = () => {
            totalinc.push(addtable.rows[i].cells[3].innerHTML.slice(1))
            inctable = addtable.rows[i].cells[3].innerHTML
        }
        createchart()
        var incarrsplit = () => {
            for(let y = 0; y < totalinc.length; y++){
                replaceinc = (Number(totalinc[y].replaceAll(/,/g, "")))
             }            
             runningtotalincome += replaceinc               
        }
        incarrsplit()


        incomeChart.innerHTML += "<table id='expChartTable'> <tr><td>"+addtable.rows[i].cells[0].innerHTML+"</td><td>"+addtable.rows[i].cells[1].innerHTML+"</td><td>"+inctable+"</td><td>$"+usd.format(runningtotalincome)+"</td> </tr></table>"
     
    }

        if(totalIncome.innerHTML === "Expense"){
            totalIncome.style.background = 'red'
            addtable.rows[i].cells[3].style.background = 'red'
       
// push expenses into array          
        var makechart = () => {          
            if(addtable.rows[i].cells[3].style.background === 'red'){
                            
                totalexp.push(addtable.rows[i].cells[3].innerHTML.slice(1))
                runtotalexp = addtable.rows[i].cells[3].innerHTML

                console.log(totalexp)
                
                }};
        makechart()
// replace the commas for easier calculations 
        var arraysplit = () => {
            for(let k = 0; k < totalexp.length; k++){
                replaceexparr = (Number(totalexp[k].replaceAll(/,/g, "")))
             }            
             runningtotalexpense += replaceexparr
             pE.push(runningtotalexpense)
             console.log(replaceexparr)    
             console.log(runningtotalexpense)
            //will always hold vlaue of the largest running total
             EXPper = pE[pE.length - 1]
            ECP = replaceexparr / EXPper 
                
                      
        }
        arraysplit() 
            // add to new table to track monthly expenses 
                ExpenseChart.innerHTML += "<table id='expChartTable'><tr><td>"+addtable.rows[i].cells[0].innerHTML+"</td><td>"+addtable.rows[i].cells[1].innerHTML+"</td><td>"+runtotalexp+"</td><td>$"+usd.format(runningtotalexpense)+"</td></tr></table>"
        }               
    } 
}
   


    // clear table to avoid dups 
    var cleartable = () => {
        addtable.innerHTML = ''
    }
    cleartable()
    