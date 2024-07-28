const pokemonID = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const spriteContainer = document.getElementById("sprite-container");
const types = document.getElementById("types");
const weight = document.getElementById("weight");
const weightTitle = document.getElementById("weight-title");
const height = document.getElementById("height");
const heightTitle = document.getElementById("height-title");
const health = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");

const spritesArr = ['front_default', 'back_default', 'front_shiny', 'back_shiny']

const findAndDisplay = async () => {
    try {
        const inputValue = searchInput.value.toLowerCase();
        let spriteIndex = 0;

        const response = await fetch(
            `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputValue}`
        );
        const data = await response.json();
        pokemonName.textContent = `${data.name.toUpperCase()}`;
        pokemonID.textContent = `#${data.id}`;
        weight.textContent = data.weight;
        weightTitle.textContent = "Weight:";
        height.textContent = data.height;
        heightTitle.textContent = "Height:";
        spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites[spritesArr[spriteIndex]]}" alt="${data.name} front default sprite">
    `;
        health.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;
        types.innerHTML = data.types
            .map(
                (obj) =>
                    `<span class="type ${obj.type.name}">${obj.type.name}</span>`
            )
            .join("");
        
        arrowRight.addEventListener("click", () => {
            if(spriteIndex < 3){
                spriteIndex++;
            } else {
                spriteIndex = 0;
            }
            
            spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites[spritesArr[spriteIndex]]}" alt="${data.name} front default sprite">
    `;

        });

        arrowLeft.addEventListener("click", () => {
            if(spriteIndex > 0){
                spriteIndex--;
            } else {
                spriteIndex = 3;
            }
            
            spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites[spritesArr[spriteIndex]]}" alt="${data.name} front default sprite">
    `;

        })
    } catch (err) {
        reset();
        alert("Pokémon not found");
    }
};

function reset() {
    const sprite = document.getElementById("sprite");
    if (sprite) sprite.remove();
    pokemonName.textContent = "";
    pokemonID.textContent = "";
    types.innerHTML = "";
    height.textContent = "";
    weight.textContent = "";
    health.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialAttack.textContent = "";
    specialDefense.textContent = "";
    speed.textContent = "";
    searchInput.value = "";
    weightTitle.textContent = "";
    heightTitle.textContent = "";
}

searchButton.addEventListener("click", findAndDisplay);
