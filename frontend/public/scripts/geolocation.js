let x = document.getElementById("out");
let y = document.getElementById("weather");

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });


function geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    // x.innerText = "Geo Not Supported";
    alert("Geo Not Supported");
  }
}

function showPosition(data) {
  console.log(data);
  let lat = data.coords.latitude;
  let lon = data.coords.longitude;
//   x.innerText = `Latitude is ${lat} and longitude is ${lon}`;
  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
  //api calling
  fetch(url, { method: "GET" })
    //return promise
    .then((res) => res.json())
    //resolve the promise
    .then((data) => {
      console.log(data);
      let cityName = data.city.name;
      let countryCode = data.city.country;
      let country = regionNames.of(countryCode);
      let temp = data.list[0].temp.day + " °C";
      //   y.innerText = `Weather of ${cityName} is ${temp}`;
      console.log(countryCode);
      console.log(regionNames.of(countryCode)); // 👉️ "United States"
      alert(
        `The temperature in your area  (${cityName} -  ${country}) is ${temp}.`
      );
    });
}



// module.export 
