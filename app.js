// Pomodoro Clock
// Lee Gainer
// March 2019

$(document).ready(function() {
  var beep = $("#beep")[0];
  let sessCount = 0;
  let breakCount = 0;
  let timeLeft = parseInt($("#time-left").html());
  let isSessionRunning = false;
  let isBreakRunning = false;
  let startSession;
  let startBreak;

  $("#start_stop").click(function() {
    
    // stop button
    if(isSessionRunning || isBreakRunning) {
      if(isSessionRunning) {
        clearInterval(startSession);
        isSessionRunning = false;
      }
    
      if(isBreakRunning) {
        clearInterval(startBreak);
        isBreakRunning = false;
      }     
    }
    
    
    // start button
    if (!isSessionRunning) {
      sessCount = parseInt($("#session-length").html()) * 60;
      isSessionRunning = true;      
      startSession = setInterval( function() { runTimer(); }, 1000);
    }
     
    function runTimer() {
      if(isSessionRunning) {
        sessCount -= 1;
        displayCountdown(sessCount);
      }      
      
      if(isBreakRunning) {
        breakCount -= 1;
        displayCountdown(breakCount);
      }      
            
      console.log("SessCount:" + sessCount + ", breakCount: " + breakCount);

      if (sessCount === 0 || breakCount === 0) {
        beep.play();
        if (isSessionRunning) {
          // stop session, start break          
          clearInterval(startSession);
          console.log("got to here: beyound clear Session");
          breakCount = parseInt($("#break-length").html()) * 60;
          $("#runTimer-label").html("BreakTime: <span id='time-left'></span>");
          startBreak = setInterval( function() { runTimer(); }, 1000);
          console.log("got beyound startBreak");
          isSessionRunning = false;
          isBreakRunning = true;
        } else {
          // stop break, start session
          clearInterval(startBreak);
          sessCount = parseInt($("#session-length").html()) * 60;
          $("#runTimer-label").html("Session Time: <span id='time-left'></span>");
          startSession = setInterval( function() { runTimer(); }, 1000);
          isSessionRunning = true;
          isBreakRunning = false;
        }                
      }
    }     
    
    
    function displayCountdown(amount) { 
      console.log("got to here, amount is: " + amount);
      

      if (amount < 600) {
        // if less than 10 minutes
        if (amount % 60 >= 10) {
          // 10 seconds or more
          $("#time-left").html("0" + Math.floor(amount / 60) + ":" + amount % 60);
        } else {
          // 9 seconds or less
          $("#time-left").html("0" + Math.floor(amount / 60) + ":" + "0" + amount % 60);
        }
      } else {
        // if more than 10 minutes
        if (amount % 60 >= 10) {
          $("#time-left").html(Math.floor(amount / 60) + ":" + amount % 60);
        } else {
          $("#time-left").html(Math.floor(amount / 60) + ":" + "0" + amount % 60);
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
  $(".reset").click(function() {
    // After FCC test, change so each reset button affects only its target:session, break
    sessCount = 1;
    breakCount = 1;
    $("#session-length").html(sessCount);
    $("#break-length").html(breakCount);
  });
});
