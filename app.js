// Pomodoro Clock
// Lee Gainer
// March 2019

$(document).ready(function() {
  var beep = $("#beep")[0];
  let sessCount = parseInt($("#session-length").html());
  let breakCount = parseInt($("#break-length").html());
  let timeLeft = parseInt($("#time-left").html());

  $("#start_stop").click(function() {
    // TODO once clicked, second click doesn't start another countdown!!!
    var startSession = setInterval(timer, 1000);
    sessCount *= 60;
    
    function timer() {
      sessCount -= 1;      

      if (sessCount === 0) {
        beep.play();
        clearInterval(startSession);        
        var startBreak = setInterval(breakTimer, 1000);
      };
      
      adjustTime(sessCount);  
      
      
      function breakTimer() {
        $("#timer-label").html("Break Time: <span id='time-left'></span>");
        breakCount *= 60;
        breakCount -= 1;  
                
        if (breakCount === 0) {
          beep.play();
          clearInterval(startBreak);
          $("#timer-label").html("Session Time: <span id='time-left'>00:00</span>");
        }        
        adjustTime(breakCount);
      };    
      
      
      function adjustTime(amount) {
        if (amount < 600) {
          // if less than 10 minutes
          if (amount % 60 >= 10) {
            // 10 seconds or more
            $("#time-left").html("0" + Math.floor(amount/60) + ":" + amount%60);
          } else {
            // 9 seconds or less
            $("#time-left").html("0" + Math.floor(amount/60) + ":" + "0" + amount%60);
          }
        } else {
          // if more than 10 minutes
          if (amount % 60 >= 10) {
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
    // min session is 1 minute
    if (sessCount - 1 > 0) {
      sessCount -= 1;
      $("#session-length").html(sessCount);
    }
  });

  $("#session-increment").click(function() {
    // max session is 59 minutes
    if (sessCount + 1 < 60) {
      sessCount += 1;
      $("#session-length").html(sessCount);
    }
  });

  // Break Buttons
  $("#break-decrement").click(function() {
    // min break is 1 minute
    if (breakCount - 1 > 0) {
      breakCount -= 1;
      $("#break-length").html(breakCount);
    }
  });

  $("#break-increment").click(function() {
    // max break is 59 minutes
    if (breakCount + 1 < 60) {
      breakCount += 1;
      $("#break-length").html(breakCount);
    }
  });
  
  // Reset buttons
  $(".reset").click(function(){
    // After FCC test, change so each reset button affects only its target:session, break
    sessCount = 1;
    breakCount = 1;
    $("#session-length").html(sessCount);
    $("#break-length").html(breakCount);    
  });  
});
