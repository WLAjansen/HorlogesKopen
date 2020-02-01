


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
    return bestelling;
  },

  toevoegen: function(el) {
    this.items = this.haalItemsOp()
    this.items.push(el);
    localStorage.
    document.querySelector('.winkelwagen__aantal').innerHTML = this.items.length;
  },

  // de data in een tabel uitvoeren
  uitvoeren: function() {
    // eerst de uitvoer leegmaken
    document.getElementById('uitvoer').innerHTML = "";
    this.items.forEach( horloge => {
      let sectie = document.createElement('section');
      sectie.className = 'horlogeSelectie';
      // main element met alle info behalve prijs en afbeelding
      let main = document.createElement('main');
      main.className = 'horlogeSelectie__main';

      // cover maken
      let afbeelding = document.createElement('img');
      afbeelding.className = 'horlogeSelectie__cover';
      afbeelding.setAttribute('src', horloge.cover);
      afbeelding.setAttribute('alt', horloge.model);

      // model naam maken voor het horloge
      let model = document.createElement('h3');
      model.className = 'horlogeSelectie__model';
      model.textContent = horloge.model;

      // merk toevoegen
      let merk = document.createElement('p');
      merk.className = 'horlogeSelectie__merken';
      merk.textContent = horloge.merk;

      // overige info toevoegen
      let overig = document.createElement('p');
      overig.className = 'horlogeSelectie__overig';
      overig.textContent = 'datum: '+horloge.uitgave+' | maat: '+horloge.maat+' | kleur: '+horloge.kleur+' | serienummer: '+horloge.ean;

      // prijs toevoegen
      let prijs = document.createElement('div');
      prijs.className = 'horlogeSelectie__prijs';
      prijs.textContent = horloge.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});

      // knop toevoegen bij de Prijs
      let knop = document.createElement('button');
      knop.className = 'horlogeSelectie__knop';
      knop.innerHTML = 'Koop';
      knop.addEventListener('click', () => {
        winkelwagen.toevoegen(horloge);
      })

      // de element toevoegen
      sectie.appendChild(afbeelding);
      main.appendChild(model);
      main.appendChild(merk);
      main.appendChild(overig);
      sectie.appendChild(main);
      sectie.appendChild(prijs);
      prijs.appendChild(knop);
      document.getElementById('uitvoer').appendChild(sectie);
    });
  }
}

winkelwagen.haalItemsOp();
winkelwagen.uitvoeren();
