(function() { 

  var userStatus = {
    energy: 100,
    steps: 0
  };

  var status = document.getElementById("status");

  var button = document.getElementById("walk");

  var left = document.getElementById("left");

  function disableButton() {
    button.setAttribute("disabled", "true");
    function enableButton() {
      button.removeAttribute("disabled");
    };
    setTimeout(enableButton, 3000);
    userStatus.steps++;
    left.innerHTML = left.innerHTML + "<div>you continue down the trail</div>";
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

