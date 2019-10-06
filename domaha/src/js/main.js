var startButton=document.getElementById("start");
var budget_value=document.querySelector(".budget-value");
var daybudget_value=document.querySelector(".daybudget-value");
var level_value=document.querySelector(".level-value");
var expenses_value=document.querySelector(".expenses-value");
var optionalexpenses_value=document.querySelector(".optionalexpenses-value");
var income_value=document.querySelector(".income-value");
var monthsavings_value=document.querySelector(".monthsavings-value");
var yearsavings_value=document.querySelector(".yearsavings-value");
var fieldSet=document.getElementsByClassName("expenses-item");
var utverdit=document.getElementsByTagName("button")[0];
var utverdit2=document.getElementsByTagName("button")[1];
var rashchitat=document.getElementsByTagName("button")[2];
var optionalexpenses_item=document.querySelectorAll(".optionalexpenses-item");
let choose_income=document.querySelector(".choose-income");
let savings=document.querySelector("#savings");
let choose_sum=document.querySelector(".choose-sum");
let choose_percent=document.querySelector(".choose-percent");
let year_value=document.querySelector(".year-value");
let month_value=document.querySelector(".month-value");
let day_value=document.querySelector(".day-value");
let money,time,flag=false;

startButton.addEventListener("click",function(){
flag=true;
utverdit.removeAttribute("disabled");
utverdit2.removeAttribute("disabled");
rashchitat.removeAttribute("disabled");
    time=prompt("Введіть дату у форматі (yyyy-mm-dd)",'');
    money=prompt("Ваш бюджет?",'');
    while(isNaN(money)||money==''||money==null){
        money=prompt("Ваш бюджет?",'');
    }
    appData.budget=money;
    appData.timeDate=time;
    budget_value.textContent=money;
    year_value.value=new Date(Date.parse(time)).getFullYear();
    month_value.value=new Date(Date.parse(time)).getMonth()+1;
    day_value.value=new Date(Date.parse(time)).getDate();
    
});
utverdit.addEventListener("click",function()
{
    
    let sum=0;
    for (let i = 0; i < fieldSet.length; i++) {
        let a = fieldSet[i].value;

         let  b = fieldSet[++i].value;
    
        if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
    
            
         console.log(b);
            appData.expenses[a] = b;
            sum+=+b;
            console.log("sum"+sum);
        } else {
            
            i--;
        }
    
    }
expenses_value.textContent=sum;
daybudget_value.textContent=(appData.budget-sum)/30;

});
utverdit2.addEventListener("click",function(){
    for (let i = 0; i < optionalexpenses_item.length; i++) {
        let opt =optionalexpenses_item[i].value;
        appData.optionalexpenses[i] =opt;
        optionalexpenses_value.textContent+=appData.optionalexpenses[i]+' ';
    }
});
rashchitat.addEventListener("click",function(){
    if(appData.budget != undefined){
        appData.moneyPerDay=(appData.budget/30).toFixed();
        daybudget_value.textContent=appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
            level_value.textContent= "Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            level_value.textContent="Это средний уровень достатка!";
        } else if (appData.moneyPerDay > 2000) {
            level_value.textContent= "Это высокий уровень достатка!";
        } else {
            level_value.textContent="Ошибочка...!";
        }
    }else{
        daybudget_value.textContent="Ошибочка...!";
    }
        
});
choose_income.addEventListener("input",function(){
         let item=choose_income.value;
         appData.income=item.split(', ');
         income_value.textContent=item;
});
savings.addEventListener("click",function(){
      if(appData.savings==true){
          appData.savings=false;
      }
      else{
          appData.savings=true;
      }
});
choose_sum.addEventListener("input",function(){
    if(appData.savings==true){
                let sum=+choose_sum.value,
                percent=+choose_percent.value;
                console.log(sum);
                console.log(percent);
                appData.monthIncome=sum/100/12*percent;
                appData.yearIncome=sum/100*percent;
                monthsavings_value.textContent=appData.monthIncome.toFixed(1);
                year_value.textContent=appData.yearIncome.toFixed(1);
    }
});
choose_percent.addEventListener("input",function(){
    if(appData.savings==true){
        let sum=+choose_sum.value,
        percent=+choose_percent.value;
        console.log(sum);
        console.log(percent);
        appData.monthIncome=sum/100/12*percent;
        appData.yearIncome=sum/100*percent;
        monthsavings_value.textContent=appData.monthIncome.toFixed(1);
        yearsavings_value.textContent=appData.yearIncome.toFixed(1);
    }
});
if(flag==false){
    utverdit.setAttribute("disabled","disabled");
    utverdit2.setAttribute("disabled","disabled");
    rashchitat.setAttribute("disabled","disabled");
}

let appData={
    budget:money,
    expenses:{},
    optionalexpenses:{},
    income:[],
    timeDate:time,
    savings:false
};