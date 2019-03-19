$(document).ready(function() {
  var buzzer = $("#buzzer");
  var sessCount = parseInt($("#session-length").html());
  $(".reset").hide();
  
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
  })
});

  
  
