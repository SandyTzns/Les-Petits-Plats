let bottoms = document.getElementsByClassName("bottom_section");
let section_card = document.getElementById("section_card");
let arrows = document.querySelectorAll(".arrow");
let filteredby = document.getElementsByClassName("filteredby")[0];
let input_ingredient = document.getElementById("input_ingredient");
let input_appareils = document.getElementById("input_appareils");
let input_ustensiles = document.getElementById("input_ustensiles");
let filter_btns = document.querySelectorAll(".filter_btn");

// AFFICHER TOUTES LES CARTES DE RECETTES
recipes.forEach((element) => {
  let liste = "";

  for (let i = 0; i < element.ingredients.length; i++) {
    liste += `
      <li><span class="bold">${element.ingredients[i].ingredient}:</span> ${
      element.ingredients[i].quantity == null
        ? ""
        : element.ingredients[i].quantity
    }${
      element.ingredients[i].unit == null ? "" : element.ingredients[i].unit
    }</li>
      `;
  }
  section_card.innerHTML += `<div class="carte">
          <div class="card-image"></div>
          <div class="card_info">
            <div class="titre">
              <h4>${element.name}</h4>
              <span id="time"
                ><span class="material-symbols-outlined"> schedule </span>
                <span id="minutes">${element.time} min</span>
              </span>
            </div>
            <div class="card_details">
              <div class="list_ingredients">
                <ul>${liste}</ul>
              </div>
              <p id="card_recipe">${element.description}</p>
            </div>
          </div>
        </div>`;
});

// EVENT LISTENER ON ARROWS
for (let current_arrow of arrows) {
  current_arrow.addEventListener("click", changeArrow);
}

// FUNCTION TO EXPEND THE FILTER DROPDOWN .GRANDE
function changeArrow(event) {
  let clicked_arrow = event.target;
  let clicked_btn = clicked_arrow.parentElement.parentElement;
  if (clicked_btn.classList.contains("grande")) {
    clicked_btn.classList.remove("grande");
  } else {
    filter_btns.forEach((btn) => btn.classList.remove("grande"));
    clicked_btn.classList.add("grande");
  }

  clicked_arrow.innerText =
    clicked_arrow.innerText == "expand_more" ? "expand_less" : "expand_more";
}

// AFFICHER LA LISTE DES INGREDIENTS DANS .GRANDE
let liste_ingredients = [];
let ingredients_li = "";

recipes.forEach((recette) => {
  recette.ingredients.forEach((objetIngredient) => {
    if (!liste_ingredients.includes(objetIngredient.ingredient.toLowerCase())) {
      liste_ingredients.push(objetIngredient.ingredient.toLowerCase());
    }
  });
});

// Rendre les ingrédients de la liste cliquable
for (let i = 0; i < 30; i++) {
  ingredients_li += `<li class="pointer" onclick="ingredient_cliqué(event)">${liste_ingredients[i]}</li>`;
}
bottoms[0].innerHTML = `<ul>${ingredients_li}</ul>`;

// Fonction pour afficher l'ingredient cliqué au dessus de la liste des filtres
let liste_ingredient_cliqué = [];
function ingredient_cliqué(event) {
  filteredby.innerHTML += `<span class="color btn_ingredient">
                              <span class="pointer element_ajouté ">${event.target.innerHTML}</span>
                              <span class="material-symbols-outlined pointer" onclick="span_supp(event)"> cancel</span>
                          </span> `;

  liste_ingredient_cliqué.push(event.target.innerHTML);
  filtrer_les_elements();
  console.log(liste_ingredient_cliqué);
}

// 1. mettre un event listener sur l'input ingredient
input_ingredient.addEventListener("input", find_ingredient);

function find_ingredient() {
  bottoms[0].innerHTML = "";
  ingredients_li = "";
   liste_ingredients
    .filter((element) => {
      return element
        .toLowerCase()
        .includes(input_ingredient.value.toLowerCase());
    })
    .forEach((ingredient_filtré) => {
      ingredients_li += `<li class="pointer" onclick="ingredient_cliqué(event)">${ingredient_filtré}</li>`;
    });

  bottoms[0].innerHTML = `<ul>${ingredients_li}</ul>`;
}

// AFFICHER LA LISTE DES APPAREILS DANS .GRANDE
let liste_appareils = [];
let appareil_li = "";

recipes.forEach((item) => {
  if (!liste_appareils.includes(item.appliance)) {
    liste_appareils.push(item.appliance);
  }
});

for (let i = 0; i < liste_appareils.length; i++) {
  appareil_li += `<li class="pointer" onclick="appareil_cliqué(event)">${liste_appareils[i]}</li>`;
}
bottoms[1].innerHTML = `<ul>${appareil_li}</ul>`;

// Fonction pour afficher l'appareil cliqué au dessus de la liste des filtres
let liste_appareil_cliqué = [];
function appareil_cliqué(event) {
  filteredby.innerHTML += `<span class="color btn_appareils">
  <span class="pointer element_ajouté">${event.target.innerHTML}</span>
  <span class="material-symbols-outlined pointer" onclick="span_supp(event)"> cancel</span>
  </span> `;

  liste_appareil_cliqué.push(event.target.innerHTML);
  filtrer_les_elements();
  console.log(liste_appareil_cliqué);
}

// 1. mettre un event listener sur l'input appareil
input_appareils.addEventListener("input", find_appareil);

function find_appareil() {
  bottoms[1].innerHTML = "";
  appareil_li = "";

  liste_appareils
    .filter((element) => {
      return element
        .toLowerCase()
        .includes(input_appareils.value.toLowerCase());
    })
    .forEach((appareil_filtré) => {
      appareil_li += `<li class="pointer" onclick="appareil_cliqué(event)">${appareil_filtré}</li>`;
    });

  bottoms[1].innerHTML = `<ul>${appareil_li}</ul>`;
}

// AFFICHER LA LISTE DES USTENSILES DANS .GRANDE
let liste_ustensiles = [];
let ustensiles_li = "";

recipes.forEach((recette) => {
  recette.ustensils.forEach((ustensil) => {
    if (!liste_ustensiles.includes(ustensil.toLowerCase())) {
      liste_ustensiles.push(ustensil.toLowerCase());
    }
  });
});

for (let i = 0; i < liste_ustensiles.length; i++) {
  ustensiles_li += `<li class="pointer" onclick="ustensile_cliqué(event)">${liste_ustensiles[i]}</li>`;
}
bottoms[2].innerHTML = `<ul>${ustensiles_li}</ul>`;

// Fonction pour afficher l'ustensile cliqué au dessus de la liste des filtres
let liste_ustensil_cliqué = [];
function ustensile_cliqué(event) {
  filteredby.innerHTML += `<span class="color btn_ustensiles">
                              <span class='ustensil_name element_ajouté'>${event.target.innerHTML}</span>
                              <span class="material-symbols-outlined pointer" onclick="span_supp(event)"> cancel</span>
                          </span> `;

  liste_ustensil_cliqué.push(event.target.innerHTML);
  filtrer_les_elements();
  console.log(liste_ustensil_cliqué);
}

// 1. mettre un event listener sur l'input appareil
input_ustensiles.addEventListener("input", find_ustensil);

function find_ustensil() {
  bottoms[2].innerHTML = "";
  ustensiles_li = "";

  liste_ustensiles
    .filter((element) => {
      return element
        .toLowerCase()
        .includes(input_ustensiles.value.toLowerCase());
    })
    .forEach((ustensile_filtré) => {
      ustensiles_li += `<li class="pointer" onclick="ustensile_cliqué(event)">${ustensile_filtré}</li>`;
    });

  bottoms[2].innerHTML = `<ul>${ustensiles_li}</ul>`;
}

// Fonction pour supprimé l'element selectionné
function span_supp(event) {
  event.target.parentElement.remove();

  let removable =
    event.target.parentElement.getElementsByClassName("element_ajouté")[0]
      .innerHTML;

  if (liste_ustensil_cliqué.includes(removable)) {
    liste_ustensil_cliqué = liste_ustensil_cliqué.filter((element) => {
      return element != removable;
    });
  } else if (liste_appareil_cliqué.includes(removable)) {
    liste_appareil_cliqué = liste_appareil_cliqué.filter((element) => {
      return element != removable;
    });
  } else if (liste_ingredient_cliqué.includes(removable)) {
    liste_ingredient_cliqué = liste_ingredient_cliqué.filter((element) => {
      return element != removable;
    });
  }
  filtrer_les_elements();
}
