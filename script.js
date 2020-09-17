//Random destination function
function randomDestination(arr) {
   let index = Math.floor(Math.random() * arr.length);
   return arr[index];
}

//Destination details
window.addEventListener("load", function () {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         let target = document.getElementById("missionTarget");
         let destination = randomDestination(json);
         target.innerHTML =
            `<h2>Mission Destination</h2>
          <ol>
            <li>Name: ${destination.name}</li>
            <li>Diameter: ${destination.diameter}</li>
            <li>Star: ${destination.star}</li>
            <li>Distance from Earth: ${destination.distance}</li>
            <li>Number of Moons: ${destination.moons}</li>
          </ol>
          <img src="${destination.image}">`;
      });
   });
});


window.addEventListener("load", function () {
   document.getElementById("formSubmit").addEventListener("click", function (e) {
      e.preventDefault();

      let pilot = document.getElementById("pilotName").value;
      let copilot = document.getElementById("copilotName").value;
      let fuel = document.getElementById("fuelLevel").value;
      let mass = document.getElementById("cargoMass").value;
      let statusCheck = document.getElementById("launchStatusCheck");
      let fuelMessage = "";
      let massMessage = "";

      if (fuel < 10000){
         fuelMessage = "Not enough fuel to reach destination";
      } else {
         fuelMessage = "Fuel level high enough for launch";
      }

      if (mass > 10000){
         massMessage = "Cargo mass to high for liftoff";
      } else {
         massMessage = "Cargo mass low enough for launch"
      }

      if (pilot === "" || copilot === "" || fuel === "" || mass === "") {
         alert("All fields are required!");
      } else if (!typeof (pilot) === "string" || !typeof (copilot) === "string" || isNaN(fuel) || isNaN(mass)) {
         alert("Make sure to enter valid information for each field!");
      } else if (fuel < 10000 || mass > 10000) {
         statusCheck.innerHTML =
            `<h2 id="launchStatus">Shuttle not ready for Launch</h2>
        <div  id="faultyItems">
            <ol>
            <li id="pilotStatus">${pilot} Ready</li>
            <li id="copilotStatus">${copilot} Ready</li>
            <li id="fuelStatus">${fuelMessage}</li>
            <li id="cargoStatus">${massMessage}</li>`
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("launchStatus").style.color = "red";
      } else {
         statusCheck.innerHTML =
            `<h2 id="launchStatus">Shuttle is ready for Launch</h2>
            <div id="faultyItems">
            <ol>
                <li id="pilotStatus">${pilot} Ready</li>
                <li id="copilotStatus">${copilot} Ready</li>
                <li id="fuelStatus">${fuelMessage}</li>
                <li id="cargoStatus">${massMessage}</li>`
         document.getElementById("launchStatus").style.color = "green";
         document.getElementById("faultyItems").style.visibility = "visible";
      }
   });
});

