$(document).ready(function() {

let animals = ["cat", "dog", "horse", "mouse", "rat", "turtle"];

// function for getting data
function getGiphy(animal) {
    const queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then((response) => {
        console.log(response);
        const giphDis = $("#giphs-display");
        const data = response.data;
        for(let i=0; i<data.length; i++){
            const img = $("<img>");
            img.attr("src", data[i].embed_url);    
            giphDis.append(img);    
        }
    });
}

// function to generate buttons
function generateButtons() {
    $("#buttons-display").empty();
    const btnDis = $("#buttons-display");
    for (let index = 0; index < animals.length; index++) {
        const element = animals[index];
        const btn = $("<button>");
        btn.text(element);
        btn.addClass("giphy btn btn-outline-secondary mr-2");
        btnDis.append(btn);
    }
}

generateButtons();
getGiphy("cat");

});
