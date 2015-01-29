var currentscoreright = 0;
var currentscoretotal = 0;
var totalpeople = 0;
var totalrightonfirst = 0;
var rightone = "";

var currstats = "";

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

  $(".ya").hide();
    $(".hello").hide();

  var fcounter = 0;
   var first = true;
   var connHTML = "";
   if(connections.length === 'undefined')
   {
      location.reload();
   }
   var connsize = connections.length;

  var rightPerson = Math.floor((Math.random() * connsize));
  rightone = rightPerson;
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
  var rawoptions = options;

  

  firstName(options, connections);
  
  $(document).ready(function(){


  $(".button").on("click", function(){

    console.log("HI");
    if($(this).hasClass("Right"))
    {

      if(first == true)
      {
        totalrightonfirst++;
      }
      $(this).addClass("button-success");
      $(this).css("opacity","1.0");
      $(this).attr("disabled", true);

      //$(this).animate({height:"20px"}, 500, function(){secondName(options, connections)});
      currentscoreright++;
      currentscoretotal++;
      

      var stats = "";
      currstats += "<ul class = 'here'><li class = 'spec activea'>First Name:   " + connections[rightPerson].firstName+ "</li>"
      stats = currstats + "<li class = 'spec'>Last Name:  </li><li class = 'spec'>Current Location: </li><li class = 'spec'>Current Employer: </li><li class = 'spec'>Current Title:</li></ul>";
      document.getElementById("stats").innerHTML = stats;


      $(".activea").animate({color:"#1CB841", fontSize:"25px"}, 1000).animate({color:"#FFF", fontSize: "15px"}, 1000, function(){secondName(options, connections)});


   
      
      //location.reload();
    }
    if($(this).hasClass("Wrong"))
    {
      first = false;
      $(this).addClass("button-error");
       $(this).css("opacity","1.0");
      $(this).attr("disabled", true);
  

      currentscoretotal++;
      

      var stats = "";
      currstats += "<ul class = 'here'><li class = 'spec activea'>First Name:   " + connections[rightPerson].firstName+ "</li>"
      stats = currstats + "<li class = 'spec'>Last Name:  </li><li class = 'spec'>Current Location: </li><li class = 'spec'>Current Employer: </li><li class = 'spec'>Current Title:</li></ul>";
      document.getElementById("stats").innerHTML = stats;

      currstats = "";
      $(".activea").animate({color:"#CA3C3C", fontSize:"25px"}, 1000).animate({color:"#FFF", fontSize: "15px"}, 1000, function(){playGame(connections)});

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
  
  playGame(connections);

}


function firstName(tempoptions, connections)
{

  console.log(connections[0].positions.values[0].company.name);

  var connHTML = "";
  var rightPerson = rightone;
  var counter = 0;
  var options = tempoptions;
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
     connHTML += "<button class = 'button pure-button "+ yes + " ' " +   ">" + connections[options[counter]].firstName + "</button>" +" <br>";
     counter++;

  }

  var currpic = "";
  var stats = "";
  IN.API.Raw("/people/" + connections[rightPerson].id +"/picture-urls::(original)").result(function(value, currpic){

    currpic = "<img align=\"baseline\" src=\"" + value.values[0] + "\">";

  stats = "<ul class = 'here'><li class = 'spec'>First Name: </li><li class = 'spec'>Last Name:  </li><li class = 'spec'>Current Location: </li><li class = 'spec'>Current Employer: </li><li class = 'spec'>Current Title:</li></ul>";


     document.getElementById("picture").innerHTML = currpic;
     document.getElementById("stats").innerHTML = stats;
  });

  console.log(currpic);
  //document.getElementById("picture").innerHTML = currpic;
  //currpic = "<img align=\"baseline\" src=\"" + connections[rightPerson].pictureUrl + "\">"
  //document.getElementById("picture").innerHTML = currpic;
  document.getElementById("question").innerHTML = "What is this Connection's First Name?";
  document.getElementById("connectionsdata").innerHTML = connHTML;

}

function secondName(tempoptions, connections)
{
  var connHTML = "";
  var rightPerson = rightone;
  var counter = 0;
  var options = tempoptions;
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
     connHTML += "<button class = 'button pure-button "+ yes + " ' " +   ">" + connections[options[counter]].lastName + "</button>" +" <br>";
     counter++;

  }
  //document.getElementById("picture").innerHTML = currpic;
  //currpic = "<img align=\"baseline\" src=\"" + connections[rightPerson].pictureUrl + "\">"
  //document.getElementById("picture").innerHTML = currpic;
  document.getElementById("question").innerHTML = "What is this Connection's Last Name?";
  document.getElementById("connectionsdata").innerHTML = connHTML;
   $(document).ready(function(){


   $(".button").on("click", function(){

    console.log("HI");
    if($(this).hasClass("Right"))
    {

      $(this).addClass("button-success");
      $(this).css("opacity","1.0");
      $(this).attr("disabled", true);

      //$(this).animate({height:"20px"}, 500, function(){secondName(options, connections)});
      currentscoreright++;
      currentscoretotal++;
      

      var stats = "";
      currstats += "<li class = 'spec activeb'>Last Name:   " + connections[rightPerson].lastName+ "</li>"
      stats = currstats + "<li class = 'spec'>Current Location: </li><li class = 'spec'>Current Employer: </li><li class = 'spec'>Current Title:</li></ul>";
      document.getElementById("stats").innerHTML = stats;


      $(".activeb").animate({color:"#1CB841", fontSize:"25px"}, 1000).animate({color:"#FFF", fontSize: "15px"}, 1000, function(){currentLocation(options, connections)});


   
      
      //location.reload();
    }
    if($(this).hasClass("Wrong"))
    {
      first = false;
      $(this).addClass("button-error");
      $(this).css("opacity","1.0");
      $(this).attr("disabled", true);
  

      currentscoretotal++;
      

 var stats = "";
      currstats += "<li class = 'spec activeb'>Last Name:   " + connections[rightPerson].lastName+ "</li>"
      stats = currstats + "<li class = 'spec'>Current Location: </li><li class = 'spec'>Current Employer: </li><li class = 'spec'>Current Title:</li></ul>";
      document.getElementById("stats").innerHTML = stats;

      currstats = "";
      $(".activeb").animate({color:"#CA3C3C", fontSize:"25px"}, 1000).animate({color:"#FFF", fontSize: "15px"}, 1000, function(){playGame(connections)});
    }

    return false;


  });

});

}

function currentLocation(tempoptions, connections)
{
  var connHTML = "";
  var rightPerson = rightone;
  var counter = 0;
  var options = tempoptions;
  options.sort( function() { return 0.5 - Math.random() } );


  if(connections[rightPerson].location === 'undefined')
  {
    playGame(connections);
  }


  console.log(rightPerson);
  while(counter < 4)
  {
     var index = Math.floor((Math.random() * 3));
     var yes = "Wrong";
     console.log(options[counter]);

     if(options[counter] == rightPerson)
     {
        yes = "Right";
        connHTML += "<button class = 'button pure-button "+ yes + " ' " +   ">" + connections[options[counter]].location.name + "</button>" +" <br>";
     }

    else if(connections[options[counter]].location.name != connections[rightPerson].location.name)
    {
           connHTML += "<button class = 'button pure-button "+ yes + " ' " +   ">" + connections[options[counter]].location.name + "</button>" +" <br>";
    }
  
     counter++;

  }
  //document.getElementById("picture").innerHTML = currpic;
  //currpic = "<img align=\"baseline\" src=\"" + connections[rightPerson].pictureUrl + "\">"
  //document.getElementById("picture").innerHTML = currpic;
  document.getElementById("question").innerHTML = "What is this Connection's Current Location?";
  document.getElementById("connectionsdata").innerHTML = connHTML;
   $(document).ready(function(){


   $(".button").on("click", function(){

    console.log("HI");
    if($(this).hasClass("Right"))
    {

      $(this).addClass("button-success");
      $(this).css("opacity","1.0");
      $(this).attr("disabled", true);

      //$(this).animate({height:"20px"}, 500, function(){secondName(options, connections)});
      currentscoreright++;
      currentscoretotal++;
      

      var stats = "";
      currstats += "<li class = 'spec activec'>Current Location:   " + connections[rightPerson].location.name+ "</li>"
      stats = currstats + "<li class = 'spec'>Current Employer: </li><li class = 'spec'>Current Title:</li></ul>";
      document.getElementById("stats").innerHTML = stats;


      $(".activec").animate({color:"#1CB841", fontSize:"20px"}, 1000).animate({color:"#FFF", fontSize: "15px"}, 1000, function(){currentEmployer(options, connections)});


   
      
      //location.reload();
    }
    if($(this).hasClass("Wrong"))
    {
      first = false;
      $(this).addClass("button-error");
      $(this).css("opacity","1.0");
      $(this).attr("disabled", true);
  

      currentscoretotal++;
      

 var stats = "";
      currstats += "<li class = 'spec activec'>Current Location:   " + connections[rightPerson].location.name+ "</li>"
      stats = currstats + "<li class = 'spec'>Current Employer: </li><li class = 'spec'>Current Title:</li></ul>";
      document.getElementById("stats").innerHTML = stats;


      currstats = "";
      $(".activec").animate({color:"#CA3C3C", fontSize:"20px"}, 1000).animate({color:"#FFF", fontSize: "15px"}, 1000, function(){playGame(connections)});
    }

    return false;


  });

});

}

function currentEmployer(tempoptions, connections)
{
  var connHTML = "";
  var rightPerson = rightone;
  var counter = 0;
  var options = tempoptions;
  options.sort( function() { return 0.5 - Math.random() } );



  console.log(rightPerson);

  if(connections[rightPerson].positions._total == 0)
  {
    currentTitle(options,connections);
  }
  while(counter < 4)
  {
     var index = Math.floor((Math.random() * 3));
     var yes = "Wrong";


     if(options[counter] == rightPerson)
     {
        yes = "Right";
     }
     if(connections[options[counter]].positions._total > 0)
     {
     connHTML += "<button class = 'button pure-button "+ yes + " ' " +   ">" + connections[options[counter]].positions.values[0].company.name + "</button>" +" <br>";
     }
    
  
     counter++;

  }
  //document.getElementById("picture").innerHTML = currpic;
  //currpic = "<img align=\"baseline\" src=\"" + connections[rightPerson].pictureUrl + "\">"
  //document.getElementById("picture").innerHTML = currpic;
  document.getElementById("question").innerHTML = "What is this Connection's Current Employer?";
  document.getElementById("connectionsdata").innerHTML = connHTML;
   $(document).ready(function(){


  $(".button").on("click", function(){

    console.log("HI");
    if($(this).hasClass("Right"))
    {

      $(this).addClass("button-success");
      $(this).css("opacity","1.0");
      $(this).attr("disabled", true);

      //$(this).animate({height:"20px"}, 500, function(){secondName(options, connections)});
      currentscoreright++;
      currentscoretotal++;
      

      var stats = "";
      currstats += "<li class = 'spec actived'>Current Employer:   " + connections[rightPerson].positions.values[0].company.name+ "</li>"
      stats = currstats + "<li class = 'spec'>Current Title:</li></ul>";
      document.getElementById("stats").innerHTML = stats;


      $(".actived").animate({color:"#1CB841", fontSize:"20px"}, 1000).animate({color:"#FFF", fontSize: "15px"}, 1000, function(){currentTitle(options, connections)});


   
      
      //location.reload();
    }
    if($(this).hasClass("Wrong"))
    {
      first = false;
      $(this).addClass("button-error");
      $(this).css("opacity","1.0");
      $(this).attr("disabled", true);
  

      currentscoretotal++;
      

 var stats = "";
      currstats += "<li class = 'spec actived'>Current Employer:   " + connections[rightPerson].positions.values[0].company.name+ "</li>"
      stats = currstats + "<li class = 'spec'>Current Title:</li></ul>";
      document.getElementById("stats").innerHTML = stats;


      currstats = "";
      $(".actived").animate({color:"#CA3C3C", fontSize:"20px"}, 1000).animate({color:"#FFF", fontSize: "15px"}, 1000, function(){playGame(connections)});
    }

    return false;


  });

});

}

function currentTitle(tempoptions, connections)
{
  var connHTML = "";
  var rightPerson = rightone;
  var counter = 0;
  var options = tempoptions;
  options.sort( function() { return 0.5 - Math.random() } );



  console.log(rightPerson);
  while(counter < 4)
  {
     var index = Math.floor((Math.random() * 3));
     var yes = "Wrong";


     if(options[counter] == rightPerson)
     {
        yes = "Right";
     }
   
     connHTML += "<button class = 'button pure-button "+ yes + " ' " +   ">" + connections[options[counter]].headline + "</button>" +" <br>";
 
    
  
     counter++;

  }
  //document.getElementById("picture").innerHTML = currpic;
  //currpic = "<img align=\"baseline\" src=\"" + connections[rightPerson].pictureUrl + "\">"
  //document.getElementById("picture").innerHTML = currpic;
  document.getElementById("question").innerHTML = "What is this Connection's Current Title?";
  document.getElementById("connectionsdata").innerHTML = connHTML;
   $(document).ready(function(){


  $(".button").on("click", function(){

    console.log("HI");
    if($(this).hasClass("Right"))
    {

      $(this).addClass("button-success");
      $(this).css("opacity","1.0");
      $(this).attr("disabled", true);

      //$(this).animate({height:"20px"}, 500, function(){secondName(options, connections)});
      currentscoreright++;
      currentscoretotal++;
      

      var stats = "";
      currstats += "<li class = 'spec activee'>Current Title:   " + connections[rightPerson].headline+ "</li>"
      stats = currstats + "</ul>";
      document.getElementById("stats").innerHTML = stats;

      currstats = "";
      $(".activee").animate({color:"#1CB841", fontSize:"20px"}, 1000).animate({color:"#FFF", fontSize: "15px"}, 1000, function(){playGame(connections)});


   
      
      //location.reload();
    }
    if($(this).hasClass("Wrong"))
    {
      first = false;
      $(this).addClass("button-error");
      $(this).css("opacity","1.0");
      $(this).attr("disabled", true);
  

      currentscoretotal++;
      

     var stats = "";
      currstats += "<li class = 'spec activee'>Current Title:   " + connections[rightPerson].headline+ "</li>"
      stats = currstats + "</ul>";
      document.getElementById("stats").innerHTML = stats;
      currstats = "";
      $(".activee").animate({color:"#CA3C3C", fontSize:"20px"}, 1000).animate({color:"#FFF", fontSize: "15px"}, 1000, function(){playGame(connections)});
    }

    return false;


  });
});

}











