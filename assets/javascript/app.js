$(document).ready(function() {

    var firebaseConfig = {
        apiKey: "AIzaSyCrSSki_Misx81c3biTIe_JpXlBDWPHMQQ",
        authDomain: "kicking-in-the-kitchen.firebaseapp.com",
        databaseURL: "https://kicking-in-the-kitchen.firebaseio.com",
        projectId: "kicking-in-the-kitchen",
        storageBucket: "kicking-in-the-kitchen.appspot.com",
        messagingSenderId: "569082977624",
        appId: "1:569082977624:web:b8cfb9b691612ca899d92d",
        measurementId: "G-4TBS04NC6W"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // Convert Firebase into variable
    var database = firebase.database().ref();
    
    
    // Create new user acct
    $("#create").on("click", function () {
        event.preventDefault();
        //Variables for Email and Password
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    //   $(".info").val() = "";  
    });

    // Sign In User
    $("#signin").on("click", function() {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    //   clearing input values
    // $(".info").val() = "";  
    });

    // Sign Out User 
    $("#signout").on("click", function () {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
        // clearing input values
        // $(".info").val() = ""; 
        });
    
    //User Recipe submission
    $("#myDropdown").on("change", function() {

        $(".movies").empty();
        $(".recipes").empty();
    
        var x = $(this).val(); console.log(x);
        
        
        var edamamQuery = "https://api.edamam.com/search?q=" + 
        x + "&app_id=4063f31e&app_key=02c947260b3a28a9dace374d2233e77e&from=0&to=10";

    
        
    // var y = "10749";  
        
        var y = Math.floor(Math.random() * 520,176 + 1); // what is this for?

        //temp disabled because its rated limited
        var tmdbQuery = "https://api.themoviedb.org/3/discover/movie?api_key=" +
        "0c26415454ad6b4927743c99caee27b5&language=en-US&sort_by=popularity.desc&include_adult=" +
        "true&include_video=false&page=5&with_genres="+ x; //found a way to make it random by page #

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

        var movieSwiper = $("<div class='swiper-wrapper'>"+"</div>");
        
        var tmdbImgUrl = "https://image.tmdb.org/t/p/w220_and_h330_face/";

        movieDiv.append(movieSwiper);
        
        $.each(results, function(index) {
            
            // create new img tags for 
            var movieImgDiv = $("<div>");

            // create new img tags for 
            var movieImg = $("<img>");
            
            // adds src link to img tag
            movieImg.attr("src", tmdbImgUrl + results[index].poster_path); 

            movieImgDiv.hasClass("swiper-slide");
            
            // appends img to img div
            movieImgDiv.append(movieImg);

            // appends img div to movie div
            movieSwiper.append(movieImgDiv);

        })

        // Pushing recipe to database
       database.push({
           recipes: pRecipe,
       });
        
    });
});  
});