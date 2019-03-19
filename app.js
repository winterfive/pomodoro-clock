$(document).ready(function() {
  var buzzer = $("#buzzer");
  var count = parseInt($("#session-length").html());
  console.log("count: " + count);
  $(".reset").hide();
  
  $("#session-decrement").click(function(){
    count -= 1;
    $("#session-length").html(count);
    console.log("session is: " + count);
  })
});

  
  
