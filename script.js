const countriesAPI = 'https://restcountries.com/v2/all'
const catsAPI = 'https://api.thecatapi.com/v1/breeds'


//Lv1 Fetch and print the name of country, capital, languages, population and area
  fetch(countriesAPI)   
  .then(response => response.json())
  .then(data => {
    data.forEach(country => {
      const { name, capital, languages, population, area } = country;
      console.log('Country:', name);
      console.log('Capital:', capital);
      console.log('Languages:', languages.map(lang => lang.name).join(', '));
      console.log('Population:', population);
      console.log('Area:', area);
      console.log('---------------------');
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });


//Lv2 Print out all the cat names in to catNames variable
fetch(catsAPI)
.then(response => response.json())
.then(data => {
  const catNames = data.map(cat => cat.name);
  console.log(catNames);
})
.catch(error => {
  console.error('Error:', error);
});


//Lv3(i) Read the cats api and find the average weight of cat in metric unit
fetch(catsAPI)
.then(response => response.json())
.then(data => {
  const catWeight = data.map(cat => cat.weight.metric);
  console.log(catWeight);
  const catAverge = catWeight.map(weight => {
    const [min, max] = weight.split(' - ');
    return (parseInt(min) + parseInt(max)) / 2;
  })
  console.log(catAverge);
  const catTotal = catAverge.reduce((sum, weight) => sum + weight, 0);
  console.log(catTotal);
  const totalAverge = catTotal / catAverge.length;
  console.log(totalAverge);
  console.log(`Average Weight: ${totalAverge.toFixed(2)} kg`);
})
.catch(error => {
  console.error('Error:', error);
});


//Lv3(ii) Read the countries api and find out the 10 largest countries
fetch(countriesAPI)
.then(response => response.json())
.then(data => {
    const countries = data
      .map(country => ({
        name: country.name,
        area: country.area || 0
      }))
      .sort((a, b) => b.area - a.area)
      .slice(0, 10)
      .map(country => country.name);

    console.log(countries);
  })
  .catch(error => {
    console.error('Error:', error);
  });

//Lv3(3) Read the countries api and count total number of languages in the world used as officials

fetch(countriesAPI)
.then(response => response.json())
.then(data => {
    const languages = new Set() // Using set helps us to automatically filter distinct values
    data.map(el => el.languages.forEach(lang => languages.add(lang.name)))

    console.log(`Total number of official languages in the world is ${languages.size}`)
})
.catch(error => console.log(error))  
 