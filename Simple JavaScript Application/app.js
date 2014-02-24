/*
    # Endpoint URL #
    
    https://api.github.com/legacy/repos/search/{query}
    
    Note: Github imposes a rate limit of 60 request per minute. Documentation can be found at http://developer.github.com/v3/.
    
    # Example Response JSON #
    
    {
      "meta": {...},
      "data": {
        "repositories": [
          {
            "type": string,
            "watchers": number,
            "followers": number,
            "username": string,
            "owner": string,
            "created": string,
            "created_at": string,
            "pushed_at": string,
            "description": string,
            "forks": number,
            "pushed": string,
            "fork": boolean,
            "size": number,
            "name": string,
            "private": boolean,
            "language": number
          },
          {...},
          {...}
        ]
      }
    }
*/


$(document).ready(function() {
  var $search  = $("#search");
  var $results = $("#results");
    
  $search.on("keydown", function(e) {
    var input = $search.val();
    $("results")
    if(e.which == 13) {
      GETGithubResults(input);
    }
  }); // end of submit function
   
  // ajax junction here

  var GETGithubResults = function(query) {
    $.ajax({
      url: 'https://api.github.com/legacy/repos/search/' + query,
      dataType: 'jsonp',
      cache: true,
      success: function(json) {
        outputHTML(json.data.repositories);
        $('.repo').css({"list-style": "none"});
      },
      error: function(json) {
        alert(json.message);
      }
    });
  }; // end of ajax function

   // outputHTML function here
  var outputHTML = function(repo) {
    var $header = ("<h2>Owner : Repo Name</h2>");
    var $createHTML = $("<ul class='repo'></ul>");
        $createHTML.prepend($header);

    for(var i = 0; i < repo.length; i++) {
      $li = $("<li></li>");
      $li.html(repo[i].owner + " : " + repo[i].name);
      $createHTML.append($li);
    }; //end of for loop
    $results.append($createHTML);
  }; //end of outputHTML function

   // make on click of repo to display alert here

}); //end of document.ready