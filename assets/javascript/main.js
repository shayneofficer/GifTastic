var topics = ["Pikachu", "Squirtle", "Bulbasaur", "Charmander", "Dragonite", "Gyarados", "Lugia", "Mewtwo", "Gengar", "Eevee", "Jigglypuff", "Cubone", "Kadabra", "Scyther", "Butterfree", "Geodude"];

function renderButtons() {
    $("#button-bar").empty();

    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>").text(topics[i]);
        newButton.addClass("btn btn-secondary pokemon");
        newButton.attr("data-name", topics[i]);
        $("#button-bar").append(newButton);
    }
}

$("#add-pokemon").on("click", function (event) {
    event.preventDefault();

    var userInput = $("#pokemon-input").val().trim();

    if (!topics.includes(userInput) && userInput !== "") {
        topics.push(userInput);
    }

    renderButtons();
    $("#pokemon-input").val("");
});

function displayPokemonGifs() {
    $("#pokemon-view").empty();

    var pokemon = $(this).attr("data-name");
    var apiKey = "H6UznX6xzuCtw7CVVuPgeU6tc98msyqJ";
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${pokemon}&api_key=${apiKey}&limit=10`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var pokemonDiv = $("<div class='pokemon-div'>");

            pokemonDiv.html(`
            <p>Rating: ${results[i].rating}</p>
            <img src='${results[i].images.fixed_height_still.url}' data-still='${results[i].images.fixed_height_still.url}' data-animate='${results[i].images.fixed_height.url}' data-state='still' class='gif'>
            `);

            $("#pokemon-view").append(pokemonDiv);
        }
    });
}

$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".pokemon", displayPokemonGifs);

renderButtons();

