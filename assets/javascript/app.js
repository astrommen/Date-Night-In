$(document).ready(function() {

    var recipes = [];
    $("#submit").on("click", function() {
        var x = $("#choice").val().trim();

    var spoonQuery = "https://api.spoonacular.com/recipes/search?query=" + 
        x + "&number=10&apiKey=b998635bd1cd4b36826270ed3c112703";

    var y = "romance";  
    var ombdQuery = "http://img.omdbapi.com/?apikey=trilogy&t="  
    });
    // API call
    $.ajax({
        url: spoonQuery,
        method: "GET",
    })
    .then(function(response) { console.log(response);
       

        var results = response.results;

        $.each(results, function(index){
                
            var pRecipe = $("<p>");

            pRecipe.html(results[index].title);

            $(".recipes").append(pRecipe);
    
        });
        
    });
    
    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < recipes.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "show");
          a.attr("data-search", recipes[i]);
          a.text(recipes[i]);
          $("#userchoice").append(a);
        }
      }
      displayButtons();

});