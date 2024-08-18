const api_key= "YOUR-APIKEY";
// free websites https://www.exchangerate-api.com/
const url = `https://v6.exchangerate-api.com/v6/${api_key}`;

const currency_one = document.getElementById("currency_one");
const currency_two = document.getElementById("currency_two");
const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const amount = document.getElementById("amount");
const calcute = document.getElementById("calculate");
const result = document.getElementById("result");

// fetch(url)
//     .then(res => res.json())
//     .then(data =>{
//         
//         const items = data.supported_codes;
//         let options;
//         for(item of items){
//             options += `
//             <option value=${item[0]}>${item[1]}</option>
//             `;
//         }
//         list_one.innerHTML = options;
//         list_two.innerHTML = options;
        
//     })


async function displayCurrency() {
    try {
        const response = await fetch(url+"/codes");
        const data = await response.json();
        const items = data.supported_codes;
        let options;
        for(item of items){
            options += `
            <option value=${item[0]}>${item[1]}</option>
            `;
        }
        list_one.innerHTML = options;
        list_two.innerHTML = options;
        
    } catch (error) {
        console.log(error);
    }
    
}

async function calculate(){
    try {
        const doviz1 = currency_one.value;
        const doviz2 = currency_two.value;
        const miktar = amount.value;
        
        const res = await fetch(url + "/latest/"+ doviz1)
        const data = await res.json();

        const sonuc= (data.conversion_rates[doviz2]*miktar).toFixed(3);
        
        result.innerHTML = `
            <div class="card border-primary">
                <div class="card-body text-center" style="font-size:30px;">
                    ${miktar} ${doviz1} = ${sonuc} ${doviz2}
                </div>
            </div>
        `;


    } catch (error) {
        console.log(error);
    }
    
}
calcute.addEventListener("click" ,function(){
    calculate();
});


displayCurrency();