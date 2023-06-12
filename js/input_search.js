let search_input = document.getElementById("search_input");

// EVENT LISTENER POUR RECUPERER LA VALEUR DE L'INPUT DE RECHERCHE
search_input.addEventListener("change", filtrer_les_elements);

// FUNCTION RECUPERE LA VALEUR DE L'INPUT ET BOUCLE LA LISTE DES RECETTE POUR TROUVER UN MATCH
let filtered_recipes = [];

function filtrer_les_elements() {
  let value = search_input.value.toLowerCase();
  section_card.innerHTML = "";

  for (let i = 0; i < recipes.length; i++) {
    let name = recipes[i].name.toLowerCase();
    let description = recipes[i].description.toLowerCase();
    let ingredient = recipes[i].ingredients
      .toLowerCase()
      .map((ingr) => ingr.ingredient, []);

    if (
      name.includes(value) ||
      description.includes(value) ||
      ingredient.includes(value)
    ) {
      filtered_recipes.push(recipes[i]);
    }
  }
  filtered_recipes.forEach((recipe) => {
    displayCard(recipe);
  });
}

// DISPLAY LES CARTES DE RECETTES FILTRÉS AVEC LA VALEUR DE L'INPUT
function displayCard(objet) {
  let liste = "";

  objet.ingredients.forEach((ingredient) => {
    liste += `<li><span class="bold">${ingredient.ingredient}</span>${
      ingredient.quantity ? ":" + ingredient.quantity : ""
    }${ingredient.unit ? ingredient.unit : ""} </li>`;
  });

  section_card.innerHTML += `<div class="carte">
          <div class="card-image"></div>
          <div class="card_info">
            <div class="titre">
              <h4>${objet.name}</h4>
              <span id="time"
                ><span class="material-symbols-outlined"> schedule </span>
                <span id="minutes">${objet.time} min</span>
              </span>
            </div>
            <div class="card_details">
              <div class="list_ingredients">
                <ul> ${liste}</ul>
                           </div>
              <p id="card_recipe">${objet.description}</p>
            </div>
          </div>
        </div>`;
}
