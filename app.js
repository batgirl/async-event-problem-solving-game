(function() { 

  var userStatus = {
    energy: 100,
    steps: 0,
    berries: 0,
    water: 0
  };

  var status = document.getElementById("status");
  var button = document.getElementById("walk");
  var middle = document.getElementById("middle");
  var left = document.getElementById("left");

  function disableButton() {
    button.setAttribute("disabled", "true");
    function enableButton() {
      button.removeAttribute("disabled");
    };
    setTimeout(enableButton, 250);
    userStatus.steps++;
    left.innerHTML = left.innerHTML + "<div>you continue down the trail</div>";

    updateDom();

    // when steps is a multiple of 5, create berries button
    if (userStatus.steps % 5 === 0) {
      var berriesButton = document.createElement("button");
      berriesButton.innerHTML = "pick berries";
      middle.appendChild(berriesButton);

      function berriesClick() {
        var initialBerries = userStatus.berries;
        userStatus.berries += Math.floor(Math.random() * 10) + 1;
        var berriesDiff = userStatus.berries - initialBerries;
        left.innerHTML = left.innerHTML + "<div>you picked " + berriesDiff + " berries</div>";
        middle.removeChild(berriesButton);
        updateDom();
      };

      berriesButton.onclick = berriesClick;

    };

    // when steps is a multiple of 10, create water button
    if (userStatus.steps % 10 === 0) {
      var waterButton = document.createElement("button");
      waterButton.innerHTML = "look for water";
      middle.appendChild(waterButton);

      function waterClick() {
        var waterChance = Math.floor(Math.random() * 2) + 1;
        if (waterChance === 1) {
          userStatus.water++;
          left.innerHTML = left.innerHTML + "<div>you found water</div>";
        }
        else if (waterChance === 2) {
          left.innerHTML = left.innerHTML + "<div>you couldn't find any water</div>";
        }
        middle.removeChild(waterButton);
        updateDom();
      };

      waterButton.onclick = waterClick;

    };

    userStatus.energy -= Math.floor(Math.random() * 10) + 1;
    updateDom(); 

  };

  button.onclick = disableButton;

  function updateDom() {
    status.innerHTML = "";
    for (key in userStatus) {
      if (userStatus[key] > 0) {
        status.innerHTML = status.innerHTML + "<div>" + key + ": " + userStatus[key] + "</div>"; 
      }
    }
  }

  updateDom();

})();

