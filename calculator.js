var result=document.getElementById("display");

let clear_display = () => {
    result.value = "";
};

let back = () => {
    result.value = result.value.slice(0, -1);
};

let calculate=(number)=> {
    result.value += number;
};

let equal=()=> {
    try {
        result.value = eval(result.value)
    }
    catch(err){
        alert("Enter a Valid Input")
    }
};