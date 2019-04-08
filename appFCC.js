// Pomodoro Clock
// Lee Gainer
// March 2019

// Not complete as yet
// TODO Break timer display is incorrect
// TODO Session timer immediately initiates to break timer

$(document).ready(function() {
  var beep = $("#beep")[0];
  let sessCount = 25;
  let breakCount = 5;
  let timeLeft = parseInt($("#time-left").html());
  let isSessionRunning = false;
  let isBreakRunning = false;
  let isPaused = false;
  let startSession;
  let startBreak;
  let sessionLength = 0;
  let breakLength = 0;
  

  $("#start_stop").click(function() {
    
    // pause button
    if(!isPaused) {      
      $("#start-pause").html("Start");
      
      if (isSessionRunning) {
        clearInterval(startSession);
        return;
      }    
      if (isBreakRunning) {
        clearInterval(startBreak);
        return;
      }
      isPaused = true;
    }
    
    // restarting session or break
    if (isPaused) {
      if (isSessionRunning) {
        //restart session
        startSession = setInterval( function() { runTimer(); }, 1000);
      }
      
      if (isBreakRunning) {
        //restart break
        startBreak = setInterval( function() { runTimer(); }, 1000);
      }
      isPaused = false;
      $("#start-pause").html("Start");
    }    
    
    // Starting a new session
    if (!isSessionRunning && !isBreakRunning) {
      // display initial time of session
      let x = parseInt($("#session-length").html());
      $("#time-left").html(x + ":00");
      
      sessionLength = x * 60;
      isSessionRunning = true;      
      startSession = setInterval( function() { runTimer(); }, 1000);
      $("#start-pause").html("Pause");
    }
     
    function runTimer() {
      if (isSessionRunning) {
        sessionLength -= 1;
        displayCountdown(sessionLength);
      }      
      
      if (isBreakRunning) {
        breakLength -= 1;
        displayCountdown(breakLength);
      }

      if (sessionLength === 0 || breakLength === 0) {
        beep.play();
        if (isSessionRunning) {
          // stop session, start break
          clearInterval(startSession);
          
          //display initial break length
          let y = parseInt($("#break-length").html());
          $("#time-left").html(y + ":00");
          
          sessCount = parseInt($("#session-length").html()) * 60;
          breakCount = y * 60;
          $("#timer-label").html("Break Time: <span id='time-left'></span>");          
          startBreak = setInterval( function() { runTimer(); }, 1000);
          isSessionRunning = false;
          isBreakRunning = true;
          } else {
          // stop break, start session
          clearInterval(startBreak);
            
          // display initial time of session
          let z = parseInt($("#session-length").html());
          $("#time-left").html(z + ":00");
            
          sessCount = z * 60;
          breakCount = parseInt($("#break-length").html()) * 60;
          $("#timer-label").html("Session Time: <span id='time-left'></span>");
          startSession = setInterval( function() { runTimer(); }, 1000);
          isSessionRunning = true;
          isBreakRunning = false;
        }                
      }
    }     
    
    
    function displayCountdown(amount) {
      if (amount < 600) {
        // if less than 10 minutes
        if (amount % 60 > 9) {
          // 10 seconds or more
          $("#time-left").html("0" + Math.floor(amount / 60) + ":" + amount % 60);
        } else {
          // 9 seconds or less
          $("#time-left").html("0" + Math.floor(amount / 60) + ":" + "0" + amount % 60);
        }
      } else {
        // if more than 10 minutes
        if (amount % 60 > 9) {
          // 10 seconds or more
          $("#time-left").html(Math.floor(amount / 60) + ":" + amount % 60);
        } else {
          // 9 seconds or less
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
    }
    $("#session-length").html(sessCount);
  });

  $("#session-increment").click(function() {
    // max session is 59 minutes
    if (sessCount + 1 < 61) {
      sessCount += 1;
    }
    $("#session-length").html(sessCount);
  });

  // Break Buttons
  $("#break-decrement").click(function() {
    // min break is 1 minute
    if (breakCount - 1 > 0) {
      breakCount -= 1;
    }
    $("#break-length").html(breakCount);
  });

  $("#break-increment").click(function() {
    // max break is 59 minutes
    if (breakCount + 1 < 61) {
      breakCount += 1;      
    }
    $("#break-length").html(breakCount);
  });

  // Reset buttons
  $(".reset").click(function() {
    sessCount = 25;
    breakCount = 5;
    if(isSessionRunning) {
      clearInterval(startSession);
    }
    if(isBreakRunning) {
      clearInterval(startBreak);
    }
    isSessionRunning = false;
    isBreakRunning = false;
    isPaused = false;
    $("#session-length").html(sessCount);
    $("#break-length").html(breakCount);
    $("#timer-label").html("Session Time: <span id='time-left'>00:00</span>");
    $("#start-pause").html("Start");
    beep.load();
  });
});
