let cityName = "lahore";

let userINputDive = document.getElementById("input");
let btnDiv = document.getElementById("btn");
let userinput = document.createElement("input");
userinput.setAttribute("class", "input");
userinput.setAttribute("id", "city");
btnDiv.appendChild(userinput);
let inputButton = document.createElement("button");
inputButton.setAttribute("id", "inputButton");
let buttonTxt = document.createTextNode("search");
inputButton.appendChild(buttonTxt);
userINputDive.appendChild(inputButton);
let clickButton = document.getElementById("inputButton");

clickButton.addEventListener("click", function () {
  let city = document.getElementById("city").value;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=49cc8c821cd2aff9af04c9f98c36eb74&units=metric`
    )
    .then(function (response) {
console.log(city)

      // handle success
      console.log(response);
      let dayWise = [];

      let dateOfMonth = null;
      let counter = -1;

      response.data.list.map((eachHour) => {
        let tempDateOfMonth = new Date(eachHour.dt_txt).getDate();

        console.log("tempDateOfMonth: ", tempDateOfMonth);

        if (dateOfMonth !== tempDateOfMonth) {
          counter++;
          dateOfMonth = tempDateOfMonth;
        }
        if (!dayWise[counter]) {
          dayWise[counter] = [];
        }
        dayWise[counter].push(eachHour);

       
      });
      console.log("dayWise: ", dayWise);
      dayWise = dayWise.map((eachDay) => {
        return eachDay.reduce(
          (previousEachHour, currentEachHour) => {
            // console.log(
            //     previousEachHour.main.temp,
            //     currentEachHour.main.temp
            // )
            let sumTemp =
              Number(previousEachHour.main.temp) +
              Number(currentEachHour.main.temp);
            let sumMinTemp =
              Number(previousEachHour.main.temp_min) +
              Number(currentEachHour.main.temp_min);
            let sumMaxTemp =
              Number(previousEachHour.main.temp_max) +
              Number(currentEachHour.main.temp_max);

            return {
              main: {
                temp: sumTemp,
                temp_min: sumMinTemp,
                temp_max: sumMaxTemp,
                weather: [
                  {
                    icon: currentEachHour.weather[0].icon,
                    description: currentEachHour.weather[0].description,
                    bg: currentEachHour.weather[0].main,
                  },
                ],
              },
              dt_txt: currentEachHour.dt_txt,
              length: eachDay.length,
            };
          },
          {
            main: {
              temp: 0,
              temp_min: 0,
              temp_max: 0,
            },
          }
        );
      });
      console.log("final: ", dayWise);

      const removeOldData = () => {
        console.log(` remove date`)
        document.querySelector('#forcastDiv').innerHTML = '';
        
  }
  removeOldData()

      dayWise.map((eachDay) => {
        let forcastDiv = document.querySelector("#forcastDiv");
        let div = document.createElement("div");
        div.setAttribute("class", "forcastCard");
        let day = document.createElement("div");
        day.setAttribute("class", "day");
        let dayTxt = document.createTextNode(
          `${moment(eachDay.dt_txt).format("ddd")}`
        );
        let imgInDiv1 = document.createElement("img");
        imgInDiv1.setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${eachDay.main.weather[0].icon}@2x.png`
        );
        let description = document.createElement("div");
        description.setAttribute("class", "dep");
        let descriptionTxt = document.createTextNode(
          eachDay.main.weather[0].description
        );
        description.appendChild(descriptionTxt);

        let min = document.createElement("div");
        min.setAttribute("class", "min");
        let minTxt = document.createTextNode(
          "Min:" +
            `${Math.floor(eachDay.main.temp_min / eachDay.length)}` +
            "°C"
        );
        let max = document.createElement("div");
        max.setAttribute("class", "max");
        let maxTxt = document.createTextNode(
          "Max:" +
            `${Math.floor(eachDay.main.temp_max / eachDay.length)}` +
            "°C"
        );
        div.appendChild(day);
        day.appendChild(dayTxt);
        div.appendChild(imgInDiv1);
        div.appendChild(description);
        div.appendChild(min);
        min.appendChild(minTxt);
        div.appendChild(max);
        max.appendChild(maxTxt);
        forcastDiv.appendChild(div);

        
      });
     
      let back1 = response.data.list[0].weather[0].main
      console.log(back1)
      switch (back1) {
        case "Snow":
          document.getElementById("body").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
          break;
        case "Clouds":
          document.getElementById("body").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
          break;
        case "Fog":
          document.getElementById("body").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
          break;
        case "Rain":
          document.getElementById("body").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
          break;
        case "Clear":
          document.getElementById("body").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
          break;
        case "Thunderstorm":
          document.getElementById("body").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
          break;
        default:
          document.getElementById("body").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
          break;
      }
    });
    
   
  });


