let search_input = document.getElementById("search_input");

// EVENT LISTENER POUR RECUPERER LA VALEUR DE L'INPUT DE RECHERCHE
search_input.addEventListener("change", filtrer_les_elements);

function filtrer_les_elements() {
  let value = search_input.value.toLowerCase();
  section_card.innerHTML = "";

  let recettes_filtres = recipes.filter((element) => {
    return (
      element.name.toLowerCase().includes(value) ||
      element.description.toLowerCase().includes(value) ||
      element.ingredients.some((ing) => {
        return ing.ingredient.toLowerCase().includes(value);
      })
    );
  });

  if (recettes_filtres.length === 0) {
    section_card.innerHTML = `<h6>Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</h6>`;
  } else {
    recettes_filtres.forEach((element) => {
      displayCard(element);
    });
  }
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
