class Pokemon {
    constructor(id, name, types) {
        this.id = id
        this.name = name
        this.types = types
    }
}

const newButton = document.querySelector('#newPokemon')
const mainArea = document.querySelector('#main')


async function getAPIData(url){
    try{
      const response = await fetch(url)
      const data = await response.json()
      //const types = await getTypes(data)
      return data
    } catch(error){
      console.error(error)
    }
  }

   const Hollowaymon = new Pokemon(808, '#newPokemon')
   newButton.addEventListener('click', function() {
      let pokeId = prompt("Who's that Pokemon? type in any number.")
       if (pokeId > 0 && pokeId <= 807){
           getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
           .then(result => {
               populateDOM(result)
           })
       } else {
         alert('Pokemon not discovered... yet')
       }
   })


  const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/?limit=25')
  .then(data => {
    for (const pokemon of data.results) {
      getAPIData(pokemon.url)
      .then(pokedata =>{
        populateDOM(pokedata)
      })
    }
  })

//   let pokeScene = document.createElement('div')
//     pokeScene.setAttribute('class', 'scene')
  function populateDOM(single_pokemon){  
        let pokeScene = document.createElement('div')
        let pokeCard = document.createElement('div')
        let pokeFront = document.createElement('div')
        let pokeBack = document.createElement('div')

        fillCardFront(pokeFront, single_pokemon)
        fillCardBack(pokeBack, single_pokemon)
        // let types = document.createElement('p')

        pokeScene.setAttribute('class', 'scene')
        pokeCard.setAttribute('class', 'card')
        pokeCard.appendChild(pokeFront)
        pokeCard.appendChild(pokeBack)
        pokeScene.appendChild(pokeCard)

        // name.textContent = `${single_pokemon.name} type: ${single_pokemon.types}`

        mainArea.appendChild(pokeScene)

        pokeCard.addEventListener('click', function() {
            pokeCard.classList.toggle('is-flipped');
        });
  }

  function fillCardFront(pokeFront, data) {
    pokeFront.setAttribute('class', 'card_face card_face--front')
    let name = document.createElement('p')
    let pic = document.createElement('img')
    pic.setAttribute('class', 'picDivs')
    let pokeNum = getPokeNumber(data.id)
    name.textContent = `${data.name[0].toUpperCase()}${data.name.slice(1)}`
    pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`

    pokeFront.appendChild(pic)
    pokeFront.appendChild(name)
  }

  function fillCardBack(pokeBack, data){
    pokeBack.setAttribute('class', 'card_face card_face--back')
    let name = document.createElement('p')
    let types = document.createElement('p')
    let pokeNum = getPokeNumber(data.id)
    //let pokeType = getPokeTypes(data.id)
    name.textContent = `${data.name[0].toUpperCase()}${data.name.slice(1)}`

    pokeBack.appendChild(name)
    //pokeBack.appendChild(pokeNum)
    //pokeBack.appendChild(pokeType)
  }


  {/*<div class = "scene">
      <div class = "card">
      <div class = "card_face card_face--front">front</div>
      <div class = "card_face card_face--back">back</div>
  </div>
</div> */}
  function getPokeNumber(id){
    if(id < 10) return '00' + id
    if(id > 9 && id < 100){
      return '0' + id
    }
    else return id
  }
