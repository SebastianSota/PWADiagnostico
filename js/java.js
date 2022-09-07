let url = 'https://pokeapi.co/api/v2/pokemon';
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let content = document.getElementById("content");

function starting() {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            let listPokemon = {};
            let card = "<div class='row d-flex justify-content-center'>";
            listPokemon = json.results
            for (let i = 0; i < listPokemon.length; i++) {
                let abilities = "";
                fetch(listPokemon[i].url)
                    .then(response => response.json())
                    .then(json => {
                        for (let j = 0; j < json.abilities.length; j++) {
                            abilities += "<li class='list-group-item'>" + json.abilities[j].ability.name + "</li>"
                        }
                        card += "<div class='card mt-2 me-2 col-1' style='width: 18rem;'>" +
                            "<img class='card-img-top' src='" + json.sprites.other['official-artwork'].front_default + "' alt='Card image cap'>" +
                            "<div class='card-body'>" +
                            "<h5 class='card-title text-center'>" + json.name + "</h5>" +
                            "<ul class='list-group list-group-flush'>" +
                            abilities +
                            "</ul >" +
                            "</div>" +
                            "</div>"
                        content.innerHTML = card;
                    })
            }
            content.innerHTML = "</div>";
            if (json.previous === null) {
                prev.disabled = true;
                prev.hidden = true;
            } else {
                prev.disabled = false;
                prev.hidden = false;
                prev.onclick = () =>{
                    url = json.previous;
                    starting();
                 }
            }
            if (json.next === null) {
                next.disabled = true;
                next.hidden = true;
            } else {
                next.disabled = false;
                next.hidden = false;
                next.onclick = () =>{
                   url = json.next;
                   starting();
                }
            }
        });
}

function sayHi() {
    console.log(listPokemon);
}