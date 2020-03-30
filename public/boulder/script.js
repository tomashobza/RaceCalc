let competitorData = {
  name,
  tops: 0,
  zones: 0,
  triesOnTop: 0,
  triesOnZone: 0,
}

let competitorDataLastChange = {
  tops: 0,
  zones: 0,
  triesOnTop: 0,
  triesOnZone: 0,
}

//Sets number of tries to zero and shows it to the #numOfTries div
let numOfTries = 0;

document.querySelector('#numOfTries').innerHTML = numOfTries;

fetch('../get_competitors')
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      response.json().then(function (data) {

        //Writes all categories as options for first <select>
        for (const [key, value] of Object.entries(data)) {
          document.querySelector('#categorySelect').innerHTML += `<option value='${key}'>${key}</option>`;
        }

        //If a category is chosen, writes all competitor names to the second <select>
        document.querySelector('#categorySelect').addEventListener('change', () => {
          //cleaning of other names, that might be already written there
          document.querySelector('#nameSelect').innerHTML = '<option disabled selected value> -- vyberte jméno -- </option>';

          //Writes all names of competitors in a specific (chosen) category
          let chosenCategory = document.querySelector('#categorySelect').value
          data[chosenCategory].contestants.forEach((e) => {
            document.querySelector('#nameSelect').innerHTML += `<option value='${e.name}'>${e.name}</option>`;
          });
          document.querySelector('#nameSelect').disabled = false; //undisables the second <select>
        });
        
        //Undisables all buttons
        document.querySelector('#nameSelect').addEventListener('change', () => {
          document.querySelectorAll('.sendButton').forEach((e) => {
            e.disabled = false;
          });
          competitorData.name = document.querySelector('#nameSelect').value;
        });

      });
    }
  )
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });

document.querySelector('#tryBtn').addEventListener('click', () => {
  numOfTries += 1;
  document.querySelector('#numOfTries').innerHTML = numOfTries;
});

document.querySelector('#backBtn').addEventListener('click', () => {
  numOfTries -= (numOfTries>0)? 1 : 0 ;
  document.querySelector('#numOfTries').innerHTML = numOfTries;
  competitorData.tops -= competitorDataLastChange.tops;
  competitorData.zones -= competitorDataLastChange.zones;
  competitorData.triesOnTop -= competitorDataLastChange.triesOnTop;
  competitorData.triesOnZone -= competitorDataLastChange.triesOnZone;
});

document.querySelector('#zoneBtn').addEventListener('click', () => {
  competitorData.zones += 1;
  competitorData.triesOnZone += numOfTries - competitorData.triesOnZone;
  competitorDataLastChange.zones += 1;
  competitorDataLastChange.triesOnZone += numOfTries - competitorDataLastChange.triesOnZone;
  numOfTries += 1;
  console.log(competitorData);
  console.log(competitorDataLastChange);
});

document.querySelector('#topBtn').addEventListener('click', () => {
  numOfTries += 1;
  competitorData.tops += 1;
  competitorData.triesOnTop += numOfTries;
  competitorDataLastChange.tops += 1;
  competitorDataLastChange.triesOnTop += numOfTries;
  competitorData.zones += 1;
  competitorData.triesOnZone += numOfTries - competitorData.triesOnZone;
  competitorDataLastChange.zones += 1;
  competitorDataLastChange.triesOnZone += numOfTries - competitorDataLastChange.triesOnZone;
  numOfTries += 1;
  console.log(competitorData);
  console.log(competitorDataLastChange);
});