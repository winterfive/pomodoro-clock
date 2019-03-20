// Pomodoro Clock
// Lee Gainer
// March 2019

$(document).ready(function() {
  var buzzer = $("#buzzer");
  var sessCount = parseInt($("#session-length").html());
  var breakCount = parseInt($("#break-length").html());
  $(".reset, #timer-label").hide();
  $("#start").click(function(){
    var counter = setInterval(timer, 1000);
    
    function timer(){
      // Hide things
      $("#start, #session-decrement, #session-increment, #break-decrement, #break-increment, #break-label, #session-label").hide();
      $("#")
      if(sessCount - 1 >= 0) {
        sessCount -= 1;
      }
      
      if(sessCount === 0) {
        clearInterval(counter);
        buzzer.play();
      }      
      $("#session-length").html(sessCount);
    }
  })
   
  // Session Buttons
  $("#session-decrement").click(function(){
    // work session should be longer then a break
    if(sessCount > 0 && sessCount - 1 > breakCount) {
      sessCount -= 1;
      $("#session-length").html(sessCount);
      console.log("session is: " + sessCount);
    }
  });    
    
  $("#session-increment").click(function(){
    if(sessCount + 1 < 60) {
      sessCount += 1;  
    $("#session-length").html(sessCount);
    console.log("session is: " + sessCount);
    }
  });
    
  
  // Break Buttons
  $("#break-decrement").click(function(){
    if(breakCount > 1) {
      breakCount -= 1;
      $("#break-length").html(breakCount);
      console.log("break is: " + breakCount);
    }
  });
  
  $("#break-increment").click(function(){
    // a break shouldn't take longer then the work session
    if(breakCount + 1 < sessCount && breakCount + 1 < 60) {
      breakCount += 1;  
      $("#break-length").html(breakCount);
      console.log("break is: " + breakCount);
    }    
  });  
});


  
  
