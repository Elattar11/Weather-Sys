

async function search(a) {
    let wether = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`);
    

    if (wether.ok && 400 != wether.status) {
        let done = await wether.json();
        displayCurrent(done.location, done.current);
        displayAnother(done.forecast.forecastday);
    }
    
}

document.getElementById("search").addEventListener("keyup", a=>{
    search(a.target.value)
}
);

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(a, t) {
    if (t != null) {
        let e = new Date(t.last_updated);
        let today_weather = `
            <div class="forecast-today forecast-width">
                    <div class="header-display d-flex justify-content-between">
                        <div class="day">${days[e.getDay()]}</div>
                        <div class=" date">${e.getDate() + monthNames[e.getMonth()]}</div>
                    </div>
                    <div class="forecast-content">
                        <div class="location">${a.name}</div>
                        <div class="degree-display">
                            <h1 class="num">
                            ${t.temp_c}
                                <sup>o</sup>
                                C
                            </h1>
                            
                            <div class="forcats-icon">
                                <img src="https:${t.condition.icon}" alt="" width=90>
                            </div>
                            
                            </div>
                            <div class="custom">${t.condition.text}</div>
                            <span><img src="images/icon-umberella.png" alt="">20%</span>
                            <span><img src="images/icon-wind.png" alt="">18km/h</span>
                            <span><img src="images/icon-compass.png" alt="">East</span>
                            
                        </div>

                    </div>
                `;
        
        document.getElementById("forecast").innerHTML = today_weather
    }
}


function displayAnother(a) {
    let another = "";
    for (let i = 1; i < a.length; i++)
    {
        another += `


                    <div class="forecast-next forecast-width">
                      <div class="header-display">
                          <div class="day">${days[new Date(a[i].date).getDay()]}</div>
                          
                      </div>
                      <div class="forecast-content text-center">
                        <div class="forecast-icon mb-3">
                            <img src="https:${a[i].day.condition.icon}" alt="" width=48>
                        </div>
                        <div class="degree-display">
                          <div class="degree">${a[i].day.maxtemp_c}<sup>o</sup>C</div>
                          <small>${a[i].day.mintemp_c}<sup>o</sup></small>
                        </div>
                        
                            <div class="custom">${a[i].day.condition.text}</div>
                              
                              
                          </div>
                        </div>
        `       
    }
    document.getElementById("forecast").innerHTML += another;

}




search("cairo");
// displayAnother("cairo");