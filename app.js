(function() { 
  var userStatus = {
    energy: 100,
    steps: 0
  };
  
  var status = document.getElementById("status");
  for (key in userStatus) {
    if (userStatus[key] > 0) {
    status.innerHTML = status.innerHTML + "<div>" + key + ": " + userStatus[key] + "</div>"; 
  }
}})();

var button = document.getElementById("walk");
function disableButton() {
  button.setAttribute("disabled", "true");
  function enableButton() {
    button.removeAttribute("disabled");
  }
  setTimeout(enableButton, 3000);
};
button.onclick = disableButton;

