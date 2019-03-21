// Pomodoro Clock
// Lee Gainer
// March 2019

$(document).ready(function() {
  var sound = $("#sound")[0];
  let sessCount = parseInt($("#session-length").html());
  let breakCount = parseInt($("#break-length").html());
  let timeLeft = parseInt($("#time-left").html());

  $("#start").click(function() {
    // TODO once clicked, second click doesn't start another countdown!!!
    var startSession = setInterval(timer, 1000);
    sessCount *= 60;
    function timer() {
      sessCount -= 1;      

      if (sessCount === 0) {
        sound.play();
        clearInterval(startSession);        
        var startBreak = setInterval(breakTimer, 1000);
      };
      
      adjustTime(sessCount);  
      
      
      function breakTimer() {
        $("#timer-label").html("Break Time: <span id='time-left'></span>");
        breakCount *= 60;
        breakCount -= 1;  
                
        if (breakCount === 0) {
          sound.play();
          clearInterval(startBreak);
          $("#timer-label").html("Session Time: <span id='time-left'>00:00</span>");
        }        
        adjustTime(breakCount);
      };     
      
      
      function adjustTime(amount) {
        if(amount < 600) {
          // if less than 10 minutes
          if(amount % 60 >= 10) {
            // 10 seconds or more
            $("#time-left").html("0" + Math.floor(amount/60) + ":" + amount%60);
          } else {
            // 9 seconds or less
            $("#time-left").html("0" + Math.floor(amount/60) + ":" + "0" + amount%60);
          }
        } else {
          // if more than 10 minutes
          if(amount % 60 >= 10) {
            $("#time-left").html(Math.floor(amount/60) + ":" + amount%60);
          } else {
            $("#time-left").html(Math.floor(amount/60) + ":" + "0" + amount%60);
          }
        } 
      }
    }
  });  
  
  
  // Session Buttons
  $("#session-decrement").click(function() {
    // work session should be longer then a break
    if (sessCount > 0 && sessCount - 1 > breakCount) {
      sessCount -= 1;
      $("#session-length").html(sessCount);
    }
  });

  $("#session-increment").click(function() {
    if (sessCount + 1 < 60) {
      sessCount += 1;
      $("#session-length").html(sessCount);
    }
  });

  // Break Buttons
  $("#break-decrement").click(function() {
    if (breakCount > 1) {
      breakCount -= 1;
      $("#break-length").html(breakCount);
    }
  });

  $("#break-increment").click(function() {
    // a break shouldn't take longer then the work session
    if (breakCount + 1 < sessCount && breakCount + 1 < 60) {
      breakCount += 1;
      $("#break-length").html(breakCount);
    }
  });
  
  // Reset buttons
  $(".reset").click(function(){
    // After FCC test, change so each reset button affects only its target:session, break
    sessCount = 25;
    breakCount = 5;
    $("#session-length").html(sessCount);
    $("#break-length").html(breakCount);    
  });  
});
