$(document).ready(function() {
    
  //---------------      Firebase Code      --------------- 
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

  //---------------    End Firebase Code    ---------------  

    // Initializing Swiper for Movie Card Effect
    // credited to https://swiperjs.com/demos/
    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows : true,
        },
        pagination: {
          el: '.swiper-pagination',
        },
    });
    
  //---------------         API Code        --------------- 

    // Event Listener for user dropdown selection
    $("#myDropdown").on("change", function() {

        // empties containers so images dont stack
        $(".swiper-wrapper").empty();
        $(".recipes").empty();
        
        // initializes dropdown selection as a var
        var x = $(this).val(); console.log(x);

        // initializes blank food query for recipe/genre if statement below
        var y = "";
        
        // code to pair recipe query w/ genre dropdown selection
        if (x === "12"){
            y = "tapas";
        } else if (x === "35") {
            y = "fried";
        } else if (x === "18") {
            y = "pastries";
        } else if (x === "14") {
            y = "fondue";
        } else if (x === "27") {
            y = "tacos";
        } else if (x === "10749") {
            y = "italian";
        } else if (x === "878") {
            y = "breakfast";
        }

        // recipe query url
        var edamamQuery = "https://api.edamam.com/search?q=" + 
        y + "&app_id=4063f31e&app_key=02c947260b3a28a9dace374d2233e77e&from=0&to=10";

        // tmdb query url
        var tmdbQuery = "https://api.themoviedb.org/3/discover/movie?api_key=" +
        "0c26415454ad6b4927743c99caee27b5&language=en-US&sort_by=popularity.desc&include_adult=" +
        "true&include_video=false&page=5&with_genres="+ x; //found a way to make it random by page # (n2h)

    // recipe API call
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
    
    // movie API call
    $.ajax({
        url: tmdbQuery,
        method: "GET",
    })
    .then(function(response) { console.log(response);// for FTP only
        
        // assign API response results to var for modularity
        var results = response.results;
        
        // assign html div to var for modularity
        var swiperWrapper = $(".swiper-wrapper");
        
        // assign poster path to var for modularity
        var tmdbImgUrl = "https://image.tmdb.org/t/p/w220_and_h330_face/";

        // cycles through results + creates the following
        $.each(results, function(index) {
            
            // create new img tags for 
            var movieImgDiv = $("<div>");

            // adds swiper-slide class
            movieImgDiv.addClass("swiper-slide");

            // adds image path per swiper cdn
            movieImgDiv.attr("style", "background-image:url("+ tmdbImgUrl + results[index].poster_path + ")");

            // appends img div to movie div
            swiperWrapper.append(movieImgDiv);
        });

        // Pushing recipe to database
       database.push({
           recipes: pRecipe,
       });
        
    });
});  
//---------------      End API Code       ---------------
});