let cityName = "lahore";
axios
  .get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=49cc8c821cd2aff9af04c9f98c36eb74&units=metric`
  )
  .then(function (response) {
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
    dayWise.map((eachDay) => {
    //   document.querySelector("#forcastDiv").innerHTML +=
    //       `
    //       <div class="forcastCard">
    //           <div class="day">${moment(eachDay.dt_txt).format('ddd')}</div>
    //           <img class="img" src="./img/04d@2x.png" alt="">
    //           <div class="min">Min: ${Math.floor(eachDay.main.temp_min / eachDay.length)}</div>
    //           <div class="max">Max: ${Math.floor(eachDay.main.temp_max / eachDay.length)}</div>
    //       </div>
    //       `
  
    let forcastDiv = document.querySelector("#forcastDiv");
    let div = document.createElement("div");
    div.setAttribute("class", "forcastCard");
    let day = document.createElement("div");
    day.setAttribute("class", "day");
    let dayTxt = document.createTextNode(`${moment(eachDay.dt_txt).format('ddd')}`)
    let imgInDiv1 = document.createElement('img')
    imgInDiv1.setAttribute('src', ``)
    let min = document.createElement("div");
    min.setAttribute("class", "min");
    let minTxt = document.createTextNode(`${Math.floor(eachDay.main.temp_min / eachDay.length)}`)
    let max = document.createElement("div");
    max.setAttribute("class", "max");
    let maxTxt = document.createTextNode(`${Math.floor(eachDay.main.temp_max / eachDay.length)}`)


    div.appendChild(day);
    day.appendChild(dayTxt)
    div.appendChild(imgInDiv1)
    div.appendChild(min);
    min.appendChild(minTxt)
    div.appendChild(max);
    max.appendChild(maxTxt)
    forcastDiv.appendChild(div);



});



})
  .catch(function (error) {
    // handle error
    console.log(error);
  });

