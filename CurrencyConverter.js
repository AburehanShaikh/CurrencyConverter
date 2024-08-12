const BASEURL='https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json';

const dropdown = document.querySelectorAll(".dropdown select") 
const btn = document.querySelector(".btn") 
const Fromcurr = document.querySelector(".From select")
const Tocurr = document.querySelector(".To select")
const msg = document.querySelector(".msg");


for(let select of dropdown){
    for(currcode in countryList){
       let newoption = document.createElement("option")
       newoption.innerText = currcode;
       newoption.value= currcode;
       if(select.name === "From" && currcode === "USD"){
        newoption.selected ="selected";
       } else if(select.name === "To" && currcode === "INR"){
        newoption.selected ="selected";
       }
     select.append(newoption)
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input")
    let amtvalue = amount.value;
    if(amtvalue === "" || amtvalue <1 ){
       amtvalue=1;
       amount.value = "1"
    }
    console.log(Fromcurr.value,Tocurr.value)
        const URL = `${BASEURL}/${Fromcurr.value.toLowerCase()}/${Tocurr.value.toLowerCase()}.json`;
        let response = await fetch(BASEURL);
        let data =  await response.json();
        let rate = data[Tocurr.value.toLowerCase()]
        let finalAmount = amtvalue * rate;
      msg.innerText = `${amtvalue} ${Fromcurr.value} = ${finalAmount} ${Tocurr.value}`;
    console.log(finalAmount)
  }
 
const updateFlag = (element) =>{
    let currcode = element.value
    let countrycode = countryList[currcode]
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png` 
    let img = element.parentElement.querySelector("img")
    img.src = newsrc;
} 

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  })

window.addEventListener("load",()=>{
    updateExchangeRate();

  })