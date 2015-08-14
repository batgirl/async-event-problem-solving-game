(function() { 

  var userStatus = {
    energy: 100,
    steps: 0,
    berries: 0
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
    setTimeout(enableButton, 500);
    userStatus.steps++;
    left.innerHTML = left.innerHTML + "<div>you continue down the trail</div>";

    updateDom();

    if (userStatus.steps % 5 === 0) {
      var berriesButton = document.createElement("button");
      berriesButton.innerHTML = "pick berries";
      middle.appendChild(berriesButton);

      function berriesClick() {
        var initialBerries = userStatus.berries;
        userStatus.berries += Math.floor(Math.random() * 10) + 1;
        var berriesDiff = userStatus.berries - initialBerries;
        left.innerHTML = left.innerHTML + "<div>you picked " + berriesDiff + " berries</div>";
        updateDom();
      }

      berriesButton.onclick = berriesClick;

    }; 

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

