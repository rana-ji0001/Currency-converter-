let Base = "https://open.er-api.com/v6/latest";
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromc = document.querySelector(".from select");
let toc = document.querySelector(".to select");
let msg = document.querySelector(".msg");






for(let select of dropdowns){
    for(let currCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOpt.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOpt.selected = "selected";
        }
        select.append(newOpt);
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        })

    }
}
const update = async() => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    console.log(amtval);
    if(amtval < 1){
        amtval = 1;
        amount.value = "1";
    }
    let url = `${Base}/${fromc.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.rates[toc.value];
    let finalamt = amtval*rate;
    msg.innerText = `${amtval}${fromc.value} = ${finalamt}${toc.value}`
}
const updateFlag = (elm) => {
    let currCode = elm.value;
    let countCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countCode}/flat/64.png`;
    let img = elm.parentElement.querySelector("img");
    img.src = newSrc;
}
btn.addEventListener("click",(evt) =>{
    evt.preventDefault();
    update();
    
});
window.addEventListener("load", ()=>{
    update();

});
