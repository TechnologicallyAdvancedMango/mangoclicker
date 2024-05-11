//Starting values
var devID = 'user-4dmf68upajr';
 var superAutoclickerState = false;
      var isAuthorized = false;
      var autoClickerSpeed = 800;
      var autoClickerHasBeenBought = false;
      var autoBuyHasBeenBought = false;
      var multiplierCost = 30;
    var multiplier = 1;
   var clicks = 0;
        //Achievements here
var achievements = [
  { name: "First Click", unlocked: false, condition: function() { return clicks >= 1; } },
  { name: "Hundred Clicks", unlocked: false, condition: function() { return clicks >= 100; } },
  { name: "Sliced Mango", unlocked: false, condition: function() { return clicks >= 1000; } },
  { name: "Six Figures", unlocked: false, condition: function() { return clicks >= 100000; } },
  { name: "Diced Mango", unlocked: false, condition: function() { return clicks >= 1000000; } },
  { name: "Mr. Beast", unlocked: false, condition: function() { return clicks >= 500000000; } },
  
];
// Check if the user already has an ID
if (!localStorage.getItem('userID')) {
    // If not, generate a new ID
    var userID = 'user-' + Math.random().toString(36).substr(2, 16);
    // Store the ID in localStorage
    localStorage.setItem('userID', userID);
}

// Now, you can retrieve the ID whenever you need it
var userID = localStorage.getItem('userID');
console.log(userID); // This will output the user's ID

        

let prevAutoClickerSpeed;
function superAutoclicker() {
    if(autoClickerHasBeenBought == true) {
    if(superAutoclickerState == false) {
        prevAutoClickerSpeed = autoClickerSpeed;
        autoClickerSpeed = 1;
        superAutoclickerState = true;
    } else {
        autoClickerSpeed = prevAutoClickerSpeed;
        superAutoclickerState = false;
    }
} else {
        return;
}
}

function checkAchievements() {
  for (var i = 0; i < achievements.length; i++) {
    var achievement = achievements[i];
    if (!achievement.unlocked && achievement.condition()) {
      achievement.unlocked = true;
      alert("Achievement unlocked: " + achievement.name);
        multiplierCost /= 2;
        autoClickerSpeed /= 2;
    }
  }
}

// Check if the user's ID matches the dev ID
if (userID === devID) {
    // If it does, give them access to the devtools
   document.getElementById("devTools").style.display = "block";
}

 // Function to check the secret code

function updateGame() {
  updateContent();
  checkAchievements();
  updateAchievementsDisplay();
  multiplierCost = Math.floor(multiplierCost);
}

  function playSound(soundUrl) {
    var audio = new Audio(soundUrl);
    audio.play();
  }

      function updateAchievementsDisplay() {
  var achievementsDiv = document.getElementById("achievements");
  // Clear the current achievements display
  achievementsDiv.innerHTML = "<h2>Achievements</h2><h6 id='tip'>(Unlocking achievements halves the multiplier cost<br>and doubles autoclicker speed!)</h6>";
  
  // Add each achievement to the display
  for (var i = 0; i < achievements.length; i++) {
    var achievement = achievements[i];
    var achievementElement = document.createElement("p");
    achievementElement.textContent = achievement.name + ": " + (achievement.unlocked ? "Unlocked" : "Locked");
    achievementsDiv.appendChild(achievementElement);
  }
}
      function updateContent() {
        display.textContent = "Clicks: " + clicks;
        displayMultiplier.textContent = "Multiplier: " + multiplier;
        shopMultiplier.textContent = "Buy Multiplier | Cost: " + multiplierCost
        userId.textContent = userID;
        
    }
   function clickHandler() {
    var display = document.getElementById("display");
        clicks = clicks + 1 * multiplier;
        updateGame();
   }
    function buyMultipliers() {
  if (clicks >= multiplierCost) {
    multiplier += 1;
    clicks -= multiplierCost;
    multiplierCost = multiplierCost * 1.2
    updateGame();
  } else {
      alert("You cannot afford the multiplier.");
  }
}

     function buyAllMultipliers() {
        while(clicks >= multiplierCost) {
        clicks = clicks - multiplierCost;
        multiplier++;
        multiplierCost = multiplierCost * 1.2
        updateGame();
     }
         updateGame();
    }
//Autoclicker purchase and upgrade
      function buyAutoclicker() {
        if(!autoClickerHasBeenBought && clicks >= 1000) {
            if(shopAutoclicker.className == "acp1") {
                shopAutoclicker = "acp2";
            } else {
         autoClickerHasBeenBought = true;
            clicks = clicks - 1000;
            shopAutoclicker.textContent = "Autoclicker Purchased"
            shopAutoclicker.className = "acp1"
            }
        } updateGame()
    }

      function autoClicker() {
    if(autoClickerHasBeenBought == true) {
        clickHandler();
    }
    setTimeout(autoClicker, autoClickerSpeed); // Always set the timeout
}
        function autoBuy() {
            var checkbox = document.getElementById("autoBuyCheckbox");
            if(checkbox.checked) {
            if(autoBuyHasBeenBought && clicks >= multiplierCost) {
                buyMultipliers();
                }
            }
        } setInterval(autoBuy, 200); // Always set the interval
    
    function bounceButton() {
  var button = document.getElementById("mango");
  button.classList.add("bounceAnimation");

  // Remove the bounce animation after it finishes
  button.addEventListener("animationend", function() {
    button.classList.remove("bounceAnimation");
  });
}
autoClicker(); // Start the loop
autoBuy();// Start the loop
    updateGame();
