$(document).ready(function() {
  var buzzer = $("#buzzer");
  var sessCount = parseInt($("#session-length").html());
  var breakCount = parseInt($("#break-length").html());
  $(".reset").hide();
  
  // Session Buttons
  $("#session-decrement").click(function(){
    if(sessCount > 0) {
      sessCount -= 1;
      $("#session-length").html(sessCount);
      console.log("session is: " + sessCount);
    }
  });    
    
  $("#session-increment").click(function(){
    sessCount += 1;  
    $("#session-length").html(sessCount);
    console.log("session is: " + sessCount);
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
    breakCount += 1;  
    $("#break-length").html(breakCount);
    console.log("break is: " + breakCount);
  });  
});


  
  
