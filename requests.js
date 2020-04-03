// let fakeRequest = new XMLHttpRequest();
// fakeRequest.open("GET", "https://swapi.co/api/starships/");

// fakeRequest.addEventListener("load", function(){
//     let response = JSON.parse(this.responseText);
//     let result = response.results;
//     console.log(result)
//     result.forEach(element => {
//         console.log(element)
//     });
//     console.log(response)
// })
// fakeRequest.addEventListener("error", ()=>{
//     console.log("ERROR");
// })

// fakeRequest.send();

// const checkStatusAndParse = (response) =>{
//     if(!response.ok){
//         throw new Error(`Shit happens! ${response.status}`);
//     } 
//     return response.json()
// }

// const printData = (data) => {
//     console.log("first 10 items!")
//     for(let item of data.results){
//         console.log(item)
//     }
//     return Promise.resolve(data.next)
// }

// const fetchNext = (url) =>{
//     console.log(url)
//     return fetch(url)
// }

// fetch("https://swapi.co/api/people/")
// .then(checkStatusAndParse)
// .then(printData)
// .then(fetchNext)
// .then(checkStatusAndParse)
// .then(printData)
// .catch((err)=> {
//     console.log(err)
// })

// axios.get('https://swapi.co/api/people/')
// .then(({data})=>{
//     console.log(data)
//     for(let item of data.results){
//         console.log(item)
//     }
//     return axios.get(data.next)
// })
// .then(({data}) => {
//     for(let item of data.results){
//         console.log(item)
//     }
// })

async function showInfo (){
    try{
        let response = await fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/324505?apikey=%09mcJ1B4qWTXdhLlrN3FFY24GDIz0t8ToM');
        let data = await response.json();
        console.log(data)
    } catch(e){
        console.log("Error", e)
    }
}

showInfo()

