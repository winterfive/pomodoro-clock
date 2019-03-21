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
    
    console.log("isSessRun1: " + isSessionRunning);

    if (!isSessionRunning) {
      sessCount = parseInt($("#session-length").html()) * 60;
      isSessionRunning = true;
      
      console.log("isSessRun2: " + isSessionRunning);
      
      startSession = setInterval( function() {runTimer(sessCount)}, 1000);
    }    
    
    // HERE  runTimer repeats with count being the same value over and over    
    function runTimer(count) {
      count -= 1;
      
      console.log("count is: " + count);

      if (count === 0) {
        beep.play();
        if (isSessionRunning) {
          // stop session, start break
          clearInterval(startSession);
          breakCount = parseInt($("#break-length").html()) * 60;
          $("#runTimer-label").html("BreakTime: <span id='time-left'></span>");
          startBreak = setInterval( function() {runTimer(breakCount)}, 1000);
          isSessionRunning = false;
          isBreakRunning = true;
        }

        if (isBreakRunning) {
          // stop break, start session
          clearInterval(startBreak);
          sessCount = parseInt($("#session-length").html()) * 60;
          $("#runTimer-label").html("Session Time: <span id='time-left'></span>");
          startSession = setInterval( function() {runTimer(sessCount)}, 1000);
          isSessionRunning = true;
          isBreakRunning = false;
        }

        displayCountdown(count);        
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
