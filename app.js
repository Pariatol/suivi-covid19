const countrySelect = document.getElementById('country-select');

const getCountriesList = () => {
    return new Promise((resolve,reject) => {
        fetch('https://api.covid19api.com/countries')
        .then(data => data.json())
        .then(listCountries => {
        resolve(listCountries);
      })
        .catch((err)=>{
            reject(err)
        })
    })
}

getCountriesList().then(data=> {
    data.map(item=>{
        let itemOption = document.createElement('option');
        itemOption.value = item['Country'];
        itemOption.text = item['Country'];
        countrySelect.appendChild(itemOption);
            })
})

const getCountryInfo = (country) => {
    return new Promise((resolve,reject) => {
        fetch('https://api.covid19api.com/summary')
        .then(data => data.json())
        .then(countries => {
            resolve(countries);
      })
    })
}


countrySelect.addEventListener('change',(e) => {

    document.querySelector('.covidByCountry').style.display = 'block';

    document.querySelector('.countryName').innerText = e.target.value;
    
    getCountryInfo(e.target.value).then(data=>{
        // Date
        let currentDate = data['Date'].slice(0,10);
        let dateToPrint = `Date : ${currentDate.slice(8,10)}/${currentDate.slice(5,7)}/${currentDate.slice(0,4)}`
        document.querySelector('.date').innerText = dateToPrint;

        const countryData = data['Countries'].filter(item => e.target.value == item['Country']);
        console.log(countryData);

        document.querySelector('.confirmedCasesSpan').innerText = `${countryData[0]['TotalConfirmed']}`;

        document.querySelector('.totalDeathsSpan').innerText = `${countryData[0]['TotalDeaths']}`;

        document.querySelector('.totalRecoveredSpan').innerText = `${countryData[0]['TotalRecovered']}`;

        

    })
    
})


