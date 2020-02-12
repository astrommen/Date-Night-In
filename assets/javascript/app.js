$(document).ready(function() {

   

    var x = "italian";
    var spoonQuery = "https://api.spoonacular.com/recipes/search?query=" + 
        x + "&number=10&apiKey=c1b444b47d7b47e3a9f138fef3e699cd";

    var y = "10749";  //tmdb genre id for romance is 10749
    var tmdbQuery = "https://api.themoviedb.org/3/discover/movie?api_key=0c26415454ad6b4927743c99caee27b5&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=10&with_genres="+ y;

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