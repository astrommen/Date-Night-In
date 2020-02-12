$(document).ready(function() {



    var x = "italian";
    var spoonQuery = "https://api.spoonacular.com/recipes/search?query=" + 
        x + "&number=10&apiKey=b998635bd1cd4b36826270ed3c112703";

    var y = "romance";  
    var ombdQuery = "http://img.omdbapi.com/?apikey=trilogy&t="  

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


});