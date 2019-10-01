$(document).ready(function () {

    var animals = [
        "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
        "bird", "ferret", "turtle", "sugar glider", "chinchilla",
        "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
        "capybara", "teacup pig", "serval", "salamander", "frog"
    ];

    // Function to display buttons
    function displayButtons() {
        $("#animal-buttons").empty();
        const buttonsDiv = $("#animal-buttons");
        for (let i = 0; i < animals.length; i++) {
            const animalBtn = $("<button>");
            animalBtn.text(animals[i]);
            animalBtn.addClass("btn animalButton btn-outline-secondary m-2");
            buttonsDiv.append(animalBtn);
        }
    }

    // Event Listener for Add Animal
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        const newAnimal = $("#animal-input").val().trim();
        animals.push(newAnimal);
        displayButtons();
        $("#animal-input").val("");
    });

    // Event Listener to get Animal Giphys
    $(document).on("click", ".animalButton", function () {
        $("#animals").empty();
        // console.log($(this).text());
        // AJAX call
        const animalsDiv = $("#animals");
        var type = $(this).text();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            const data = res.data;
            // console.log(data[0]);
            for (let i = 0; i < res.data.length; i++) {
                const animalImg = $("<img>");
                const imgSrcStill = res.data[i].images.fixed_height_still.url;
                const imgSrcAnim = res.data[i].images.fixed_height_small.url;
                animalImg.attr("data-animate", imgSrcAnim);
                animalImg.attr("data-still", imgSrcStill);
                animalImg.attr("data-state", "still");
                animalImg.addClass("animal-img");
                animalImg.attr("src", imgSrcStill);
                animalImg.addClass("my-2 col-4");
                animalsDiv.append(animalImg);
            }
        })
    });

    $(document).on("click", ".animal-img", function(){
        // console.log($(this).attr("data-state"));
        const steady = $(this).attr("data-still");
        const animate = $(this).attr("data-animate");
        const state = $(this).attr("data-state");
        if(state === "still"){
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        } else{
            $(this).attr("src", steady);
            $(this).attr("data-state", "still");
        }
    })

    displayButtons();
















});