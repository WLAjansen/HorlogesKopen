


// function die van een mount-string een nummer maakTabelKop
// waarbij januari een 0 geeft
// en december een 11
const geeftMaandNummer = (maand) => {
  let nummer;
  switch (maand) {
    case "januari": nummer = 0; break;
    case "februari": nummer = 1; break;
    case "maart": nummer = 2; break;
    case "april": nummer = 3; break;
    case "mei": nummer = 4; break;
    case "juni": nummer = 5; break;
    case "juli": nummer = 6; break;
    case "augustus": nummer = 7; break;
    case "september": nummer = 8; break;
    case "october": nummer = 9; break;
    case "november": nummer = 10; break;
    case "december": nummer = 11; break;
    default: nummer = 0

  }
  return nummer;
}


// een winkelwagen object
let winkelwagen = {
  items: [],

  haalItemsOp: function() {
    let bestelling;
    if ( localStorage.getItem('BesteldeHorloges') == null ) {
      bestelling = [];
    } else {
      bestelling = JSON.parse(localStorage.getItem('BesteldeHorloges'));
      document.querySelector('.winkelwagen__aantal').innerHTML = bestelling.length;
    }
    bestelling.forEach( item => {
      this.items.push(item);
    })
    return bestelling;
  },



  // de data in een tabel uitvoeren
  uitvoeren: function() {
    // eerst de uitvoer leegmaken
    document.getElementById('uitvoer').innerHTML = "";
    this.items.forEach( horloge => {
      let sectie = document.createElement('section');
      sectie.className = 'besteldHorloge';
      // main element met alle info behalve prijs en afbeelding
      let main = document.createElement('main');
      main.className = 'besteldHorloge__main';

      // cover maken
      let afbeelding = document.createElement('img');
      afbeelding.className = 'besteldHorloge__cover';
      afbeelding.setAttribute('src', horloge.cover);
      afbeelding.setAttribute('alt', horloge.model);

      // model naam maken voor het horloge
      let model = document.createElement('h3');
      model.className = 'besteldHorloge__model';
      model.textContent = horloge.model;

      // prijs toevoegen
      let prijs = document.createElement('div');
      prijs.className = 'besteldHorloge__prijs';
      prijs.textContent = horloge.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});

      // verwijderknop toevoegen

      // de element toevoegen
      sectie.appendChild(afbeelding);
      main.appendChild(model);
      sectie.appendChild(main);
      sectie.appendChild(prijs);
      document.getElementById('uitvoer').appendChild(sectie);
    });
  }
}

winkelwagen.haalItemsOp();
winkelwagen.uitvoeren();
