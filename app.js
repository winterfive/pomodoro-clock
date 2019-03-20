// Pomodoro Clock
// Lee Gainer
// March 2019

$(document).ready(function() {
  var sound = $("#sound")[0];
  var sessCount = parseInt($("#session-length").html());
  var breakCount = parseInt($("#break-length").html());
  var countdown = parseInt($("#countdown").html());

  $("#start").click(function() {
    var startSession = setInterval(timer, 1000);

    function timer() {
      sessCount -= 1;
      console.log(sessCount);

      if (sessCount === 0) {
        sound.play();
        // TODO audio not playing
        clearInterval(startSession);        
        var startBreak = setInterval(breakTimer, 1000);
      }
      $("#countdown").html(sessCount);

      function breakTimer() {
        $("#timer-label").html("Break Time: ");
        countdown -= 1;
        if (countdown === 0) {
          clearInterval(startBreak);
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
});
