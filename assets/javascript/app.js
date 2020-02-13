$(document).ready(function() {

   

    var x = "italian";
    var edamamQuery = "https://api.edamam.com/search?q=" + 
        x + "&app_id=4063f31e&app_key=02c947260b3a28a9dace374d2233e77e&from=0&to=10";

        //https://webknox.com/recipeImages/swiss-cheese-fondue-with-english-stilton-773508.jpeg
        //https://api.spoonacular.com/recipes/search?query=fondue&number=10&apiKey=70f3c998a06f47cfbcc87a31f2ed8aae
        
    var y = "10749";  //tmdb genre id for romance is 10749

    var tmdbQuery = "https://api.themoviedb.org/3/discover/movie?api_key=0c26415454ad6b4927743c99caee27b5&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=5&with_genres="+ y; //found a way to make it random by page #

    // API call
    $.ajax({
        url: edamamQuery,
        method: "GET",
    })
    .then(function(response) { console.log(response);
       
        var results = response.hits;

        var recipeDiv = $(".recipes");

        $.each(results, function(index){
            
            var recipeTitle = $("<p>");

            recipeTitle.text(results[index].recipe.label);

            var recipeImg = $("<img>");

            recipeImg.attr("src", results[index].recipe.image);

            recipeDiv.append(
                recipeTitle,
                recipeImg
            );
    
        });
        
    });
    // API call
    $.ajax({
        url: tmdbQuery,
        method: "GET",
    })
    .then(function(response) { console.log(response);
       
        var results = response.results;
             
        var movieDiv = $(".movies"); // assign var to div for modularity

        var tmdbImgUrl = "https://image.tmdb.org/t/p/w220_and_h330_face/";

        $.each(results, function(index) {
            
            // create new img tags for 
            var movieImg = $("<img>");
            
            // adds src link to img tag
            movieImg.attr("src", tmdbImgUrl + results[index].poster_path); 
            
            // appends img tag to movie div
            movieDiv.append(movieImg);
        })
        
    });


});