const apiKey="74e4e78b09e37d074d49f031e3c9d019";

const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status === 404){
        // Handle the case where the city is not found
        document.querySelector(".error").style.display= "block";
        document.querySelector(".weather").style.display= "none";
        return;// Exit the function early
    }
    
    const data = await response.json();
    

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".wind").innerHTML = data.wind;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp )+ "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if(data.weather[0].main =="Clouds"){
            weatherIcon.src="images/clouds.png"
        }
        else if(data.weather[0].main =="Clear"){
            weatherIcon.src="images/clear.png"
        }
        else if(data.weather[0].main =="Rain"){
            weatherIcon.src="images/rain.png"
        }
        else if(data.weather[0].main =="Drizzle"){
            weatherIcon.src="images/drizzle.png"
        }
        else if(data.weather[0].main =="Mist"){
            weatherIcon.src="images/mist.png"
        }
    
        // Display the weather section and hide the error section
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
      }

    

    searchBtn.addEventListener("click",()=>{
      checkWeather(searchBox.value);
});
// Listen for the "keydown" event on the input field
   searchBox.addEventListener("keydown", (event) => {
    // Check if the pressed key is the Enter key (key code 13)
    if (event.keyCode === 13) {
      // Prevent the default action of the Enter key (form submission)
      event.preventDefault();
      // Call the checkWeather function with the value of the input field
      checkWeather(searchBox.value);}

})
