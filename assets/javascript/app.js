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

    // // Initializing Swiper for Movie Card Effect
    // // credited to https://swiperjs.com/demos/
    // var swiper = new Swiper('.swiper-container', {
    //     effect: 'coverflow',
    //     grabCursor: true,
    //     centeredSlides: true,
    //     slidesPerView: 'auto',
    //     coverflowEffect: {
    //       rotate: 50,
    //       stretch: 0,
    //       depth: 100,
    //       modifier: 1,
    //       slideShadows : true,
    //     },
    //     pagination: {
    //       el: '.swiper-pagination',
    //     },
    // });

    
    //---------------         API Code        --------------- 
    
    // Event Listener for user dropdown selection
    $("#myDropdown").on("change", function() {
   
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
            initialSlide: 1


        });

        // empties containers so images dont stack
        $(".swiper-wrapper").empty();
        $(".recipes").empty();
        
        // initializes dropdown selection as a var
        var x = $(this).val(); console.log(x);
        
        // initializes blank food query for recipe/genre if statement below
        var y = "";
        
        // code to pair recipe query w/ genre dropdown selection
        if (x === "12"){ // excited/adventure
            y = "tapas";
        } else if (x === "35") { // funny/comedy
            y = "fried";
        } else if (x === "18") { // emotional/drama
            y = "pastries";
        } else if (x === "14") { // happy/fantasy
            y = "fondue";
        } else if (x === "27") { // scary/horror
            y = "tacos";
        } else if (x === "10749") { // romance
            y = "italian";
        } else if (x === "878") { // inspired/science fiction
            y = "breakfast";
        };
        
        // recipe query url
        var edamamQuery = "https://api.edamam.com/search?q=" + 
        y + "&app_id=4063f31e&app_key=02c947260b3a28a9dace374d2233e77e&from=0&to=8";

        // page randomizer
        var r = Math.floor(Math.random() * 20 + 1);

        // tmdb query url
        var tmdbQuery = "https://api.themoviedb.org/3/discover/movie?api_key=" +
        "0c26415454ad6b4927743c99caee27b5&language=en-US&sort_by=popularity.desc&include_adult=" +
        "true&include_video=false&page=" + r + "&with_genres="+ x; 
       
        // movie API call
        $.ajax({
            url: tmdbQuery,
            method: "GET",
        }).then(function(response) { console.log(response);// for FTP only
            
            // assign API response results to var for modularity
            var results = response.results;
            
            // assign html div to var for modularity
            var swiperWrapper = $(".swiper-wrapper");
            
            // assign poster path to var for modularity
            var tmdbImgUrl = "https://image.tmdb.org/t/p/w220_and_h330_face/";
            
            // cycles through results + creates the following
            $.each(results, function(index) {
                
                // create new img tags for movies
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
        
        // recipe API call
        $.ajax({
            url: edamamQuery,
            method: "GET",
        }).then(function(response) { console.log(response);
            
            // assign API response to var for modularity
            var hits = response.hits;

            // assign html div to var for modularity
            var recipeDiv = $(".recipes");

            // cycles through results + creates the following
            $.each(hits, function(index){              

                // dynamically creates recipe card code block
                // credit: https://codepen.io/IamManchanda/pen/zoaWdW?editors=1111 by IamMachanda
                var recipeCard = $(`
                <div class="col-sm-6 col-lg-4">
                    <!-- Card Flip -->
                    <div class="card-flip">
                        <div class="flip">
                            <div class="front">
                                <!-- front content -->
                                <div class="card">
                                    
                                    <a href=${hits[index].recipe.url} class="card-link" target="_blank">
                                        
                                        <div class="card-block">
                                            <h4 class="card-title">
                                            ${hits[index].recipe.label}
                                            </h4>
                                        </div>

                                        <img class="card-img" src=${hits[index].recipe.image} alt="100%x300" data-holder-rendered="true">
                                    
                                    </a>
                                
                                </div>
                            </div>
                            <div class="back">
                                <!-- back content -->
                                <div class="card">
                                    
                                    <a href=${hits[index].recipe.url} class="card-link" target="_blank">
                                        
                                        <div class="card-block">
                                            <h4 class="card-title">
                                            ${hits[index].recipe.label}
                                            </h4>
                                            
                                            <h6 class="card-subtitle text-muted">
                                            Ingredients
                                            </h6>
                                        </div>
                                        
                                        <div class="card-block"> 
                                            <p class="card-text">
                                                <ul></ul>
                                            </p>
                                        </div>
                                    
                                    </a>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Flip -->
                </div>`
                );

                // unordered list for ingredients
                var recipeIngred = $("ul");
                
                // assign ingredientLines to var for modularity
                var hitsIndex = hits[index].recipe.ingredientLines;
                console.log(hitsIndex); //for FTP only

                // cycles through ingredients to create the following
                $.each(hitsIndex, function(index){ 
                    console.log(this); //for FTP only

                    var ingredItem = $("<li>"); 
                    
                    ingredItem.append(this); 
                    
                    recipeIngred.append(ingredItem);
                });

                // appends recipe card to recipe row in html
                recipeDiv.append(recipeCard);
            
                // card flip animation toggle 
                document.querySelector(".card-flip").classList.toggle("flip");
            
            }); // end of ingredient list creation    
        }); // end of recipe API response
    });  //---------------      End API Code       ---------------
}); // end of document ready function