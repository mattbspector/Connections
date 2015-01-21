var currentscoreright = 0;
var currentscoretotal = 0;
var totalpeople = 0;
var totalrightonfirst = 0;


function onLinkedInLoad() {
  IN.Event.on(IN, "auth", function() {onLinkedInLogin();});
  IN.Event.on(IN, "logout", function() {onLinkedInLogout();});
}

function onLinkedInLogout() {
  setConnections({}, {total:0});
}

function onLinkedInLogin() {
  // here, we pass the fields as individual string parameters
  IN.API.Connections("me")
    .fields("id", "firstName", "lastName", "pictureUrl", "publicProfileUrl", "headline", "location:(name)", "positions:(is-current,title,company:(name))")
    .result(function(result, metadata) {
      setConnections(result.values, metadata);
    });
}

function playGame(connections){
   var first = true;
   var connHTML = "";
   var connsize = connections.length;

  var rightPerson = Math.floor((Math.random() * connsize));
  var optionOne = Math.floor((Math.random() * connsize));



  if(connections[rightPerson].pictureUrl == undefined)
  {
    playGame();
  }
  totalpeople++;
  if(optionOne == rightPerson)
  {
    optionOne = Math.floor((Math.random() * connsize));
  }
  var optionTwo = Math.floor((Math.random() * connsize));
  if(optionTwo == rightPerson || optionTwo == optionOne)
  {
    optionTwo = Math.floor((Math.random() * connsize));
  }
  var optionThree = Math.floor((Math.random() * connsize));
  if(optionThree == rightPerson)
  {
    optionThree = Math.floor((Math.random() * connsize));
  }

  var options = [rightPerson, optionOne, optionTwo, optionThree];
  var counter = 0;
  options.sort( function() { return 0.5 - Math.random() } );
  console.log(rightPerson);
  while(counter < 4)
  {
     var index = Math.floor((Math.random() * 3));
     var yes = "Wrong";
     console.log(options[counter]);

     if(options[counter] == rightPerson)
     {
        yes = "Right";
     }
     connHTML += "<button class = 'button "+ yes + " ' " +   ">" + connections[options[counter]].firstName + " " + connections[options[counter]].lastName + "</button>" +" <br>";
     counter++;

  }

  var currpic = "";
  IN.API.Raw("/people/" + connections[rightPerson].id +"/picture-urls::(original)").result(function(value, currpic){

    currpic = "<img align=\"baseline\" src=\"" + value.values[0] + "\">";
    console.log(currpic);
     document.getElementById("picture").innerHTML = currpic;
  });

  console.log(currpic);
  //document.getElementById("picture").innerHTML = currpic;
  //currpic = "<img align=\"baseline\" src=\"" + connections[rightPerson].pictureUrl + "\">"
  //document.getElementById("picture").innerHTML = currpic;
  //document.getElementById("question").innerHTML = 
  document.getElementById("connectionsdata").innerHTML = connHTML;


    $(document).ready(function(){


  $(".button").click(function(){
      console.log("HI");
    if($(this).hasClass("Right"))
    {

      if(first == true)
      {
        totalrightonfirst++;
      }
      $(this).addClass("rightattempt");
      $(this).attr("disabled", true);

      alert("GOT IT");
      currentscoreright++;
      currentscoretotal++;
      setScore();
      playGame(connections);
      //location.reload();
    }
    if($(this).hasClass("Wrong"))
    {
      first = false;
      $(this).addClass("wrongattempt");
      $(this).attr("disabled", true);
      alert("NOPE");

      currentscoretotal++;
      setScore();
      playGame(connections);
    }

    return false;
  });




});


}

function setScore(){
  document.getElementById("score").innerHTML = "Number Right: " + currentscoreright + "<br>" + "Number of Attempts: " + currentscoretotal + "<br>" + "Percent Right on First Attempt: " + Math.round((totalrightonfirst/totalpeople) * 100) + "%" ;
}

function setConnections(connections) {
  console.log(connections);
  setScore();
  playGame(connections);

}