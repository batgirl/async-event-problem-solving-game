// all of this lives inside an anonymous function invoked on page load
(function() { 
  // object that tracks users' items and status
  var userStatus = {
    energy: 100,
    steps: 0,
    berries: 0,
    water: 0,
    meat: 0
  };
  // these access various parts of the DOM
  var status = document.getElementById("status");
  var button = document.getElementById("walk");
  var middle = document.getElementById("middle");
  var left = document.getElementById("left");
  var timer = document.getElementById("timer");
  // this function represents the button hard coded in the HTML
  function firstClick() {
    // on click the button will be disabled for 3 seconds
    button.setAttribute("disabled", "true");
    function enableButton() {
      button.removeAttribute("disabled");
    };
    setTimeout(enableButton, 3000);
    userStatus.steps++;
    left.innerHTML = left.innerHTML + "<div>you continue down the trail</div>";
    updateDom();
    // when steps is a multiple of 5, the berries button is created
    if (userStatus.steps % 5 === 0) {
        var berriesButton = document.createElement("button");
        berriesButton.innerHTML = "pick berries";
        middle.appendChild(berriesButton);
        function berriesClick() {
          // after the berries button has been clicked, it changes the users' status and is removed
          var initialBerries = userStatus.berries;
          userStatus.berries += Math.floor(Math.random() * 10) + 1;
          var berriesDiff = userStatus.berries - initialBerries;
          left.innerHTML = left.innerHTML + "<div>you picked " + berriesDiff + " berries</div>";
          middle.removeChild(berriesButton);
          updateDom();
          // define the button variable above where it is referenced
          var eatButton = document.createElement("button");
              eatButton.setAttribute("id", "hungry");
              eatButton.innerHTML = "eat berries";
          function eatBerries() {
            // if an element with an id of hungry does not exist, create one
            if (!document.getElementById("hungry")) {
              middle.appendChild(eatButton);
            };
          };
          // check for this condition every 5 seconds
          setInterval(eatBerries, 5000);
          function eatClick() {
            if (userStatus.berries > 0) {
              userStatus.berries -= 1;
              userStatus.energy += 2;
              left.innerHTML = left.innerHTML + "<div>you ate berries and gained energy</div>";
              middle.removeChild(eatButton);
              updateDom();
            }
            else {
              left.innerHTML = left.innerHTML + "<div>you need more berries</div>";
              middle.removeChild(eatButton);
              updateDom();
            };
          };
          eatButton.onclick = eatClick;
        };
        berriesButton.onclick = berriesClick;
    };
    // when steps is a multiple of 10, a water button is created
    if (userStatus.steps % 10 === 0) {
      var waterButton = document.createElement("button");
      waterButton.innerHTML = "look for water";
      middle.appendChild(waterButton);
      function waterClick() {
        // there is a 50/50 chance to find water after clicking the water button
        var waterChance = Math.floor(Math.random() * 2) + 1;
        if (waterChance === 1) {
          userStatus.water++;
          left.innerHTML = left.innerHTML + "<div>you found water</div>";
        }
        else if (waterChance === 2) {
          left.innerHTML = left.innerHTML + "<div>you couldn't find any water</div>";
        };
        middle.removeChild(waterButton);
        updateDom();
        var drinkButton = document.createElement("button");
        drinkButton.setAttribute("id", "thirsty");
        drinkButton.innerHTML = "drink water";
        function drinkWater() {
          if (!document.getElementById("thirsty")) {
            middle.appendChild(drinkButton);
          };
        };
        setInterval(drinkWater, 5000);
        function drinkClick() {
          // this button changes the users' status and removes the button
          if (userStatus.water > 0) {
            userStatus.water -= 1;
            userStatus.energy += 10;
            left.innerHTML = left.innerHTML + "<div>you drank water and gained energy</div>";
            middle.removeChild(drinkButton);
            updateDom();
          }
          else {
            left.innerHTML = left.innerHTML + "<div>you need more water</div>";
            middle.removeChild(drinkButton);
            updateDom();
          };
        };
        drinkButton.onclick = drinkClick;
      };
      waterButton.onclick = waterClick;      
    };
    // when steps is a multiple of 20, a go hunt button is created
    if (userStatus.steps % 20 === 0) {
      var huntButton = document.createElement("button");
      huntButton.innerHTML = "go hunt";
      middle.appendChild(huntButton);
      function huntClick() {
        // clicking go hunt gives the user a 50/50 chance of finding meat
        var huntChance = Math.floor(Math.random() * 2) + 1;
        if (huntChance === 1) {
          userStatus.meat++;
          userStatus.energy--;
          left.innerHTML = left.innerHTML + "<div>you found an animal</div>";
        }
        else if (huntChance === 2) {
          userStatus.energy--;
          left.innerHTML = left.innerHTML + "<div>you couldn't find any animals</div>";
        };
        middle.removeChild(huntButton);
        updateDom();
        function eatMeat() {
          var meatButton = document.createElement("button");
          meatButton.innerHTML = "eat meat";
          middle.appendChild(meatButton);
          function meatClick() {
            // if the user has meat, this button changes the users' status and removes the button
            if (userStatus.meat > 0) {
              userStatus.meat -= 1;
              userStatus.energy += 15;
              left.innerHTML = left.innerHTML + "<div>you ate meat and gained energy</div>";
              middle.removeChild(meatButton);
              updateDom();
            }
            else {
              left.innerHTML = left.innerHTML + "<div>you need more meat</div>";
              middle.removeChild(meatButton);
              updateDom();
            };
          };
          meatButton.onclick = meatClick;
        };
        // this button is available 15 seconds after clicking go hunt
        setInterval(eatMeat, 15000);
      };
      huntButton.onclick = huntClick;
    };
    // this reduces the users' energy with every step
    userStatus.energy -= Math.floor(Math.random() * 10) + 1;
    updateDom(); 
  };
  button.onclick = firstClick;
  var counter = 0;
  // this creates a counter that displays above the status log
  function updateTimer() {
    counter++;
    timer.innerHTML = "<div>timer: " + counter + "</div>";
  }
  // this refreshes the status log on the right side of the DOM
  function updateDom() {
    status.innerHTML = "";
    for (key in userStatus) {
      if (userStatus[key] > 0) {
        status.innerHTML = status.innerHTML + "<div>" + key + ": " + userStatus[key] + "</div>"; 
      }
    }
  }
  window.setInterval(updateTimer, 1000);
  updateDom();
})();
