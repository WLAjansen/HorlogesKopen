


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
    }
    bestelling.forEach( item => {
      this.items.push(item);
    })
    return bestelling;
  },


// doorloop van alle items
  verwijderItem: function(ean) {
     this.items.forEach((item,index) => {
       if ( item.ean == ean ) {
         this.items.splice(index,1);
         ean = 20;
       }
     })
     // local storage bijwerken
     localStorage.setItem('BesteldeHorloges', JSON.stringify(this.items));
     if(this.items.length>0) {
     document.querySelector('.winkelwagen__aantal').innerHTML = this.items.length;
   } else {
     document.querySelector('.winkelwagen__aantal').innerHTML = '';
   }
   this.uitvoeren();
  },

  totaalPrijsBerekenen: function() {
    let totaal = 0;
    this.items.forEach( horloge => {
       totaal += horloge.prijs;
    });
    return totaal;
  },



  // de data in een tabel uitvoeren
  uitvoeren: function() {
    // eerst de uitvoer leegmaken
    document.getElementById('bestelling').innerHTML = "";
    this.items.forEach( horloge => {
      let sectie = document.createElement('section');
      sectie.className = 'besteldHorloge';

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
      let verwijder = document.createElement('div');
      verwijder.className = 'besteldHorloge__verwijder';
      verwijder.addEventListener('click', () => {
        this.verwijderItem(horloge.ean);
      })

      // de element toevoegen
      sectie.appendChild(afbeelding);
      sectie.appendChild(model);
      sectie.appendChild(prijs);
      sectie.appendChild(verwijder);
      document.getElementById('bestelling').appendChild(sectie);
    });

    // na de opsomming ook de totaalprijs toevoegen
    let sectie = document.createElement('section');
    sectie.className = 'besteldHorloge';
    // tekst voor totaal Prijs
    let totaalTekst = document.createElement('div');
    totaalTekst.className = 'besteldHorloge__totaal-prijs';
    totaalTekst.innerHTML = 'Totaal: ';

    let totaalPrijs = document.createElement('div');
    totaalPrijs.textContent = this.totaalPrijsBerekenen().toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});

    sectie.appendChild(totaalTekst);
    sectie.appendChild(totaalPrijs);
    document.getElementById('bestelling').appendChild(sectie);
    // winkelwagen aantal uitvoeren
    if (this.items.length > 0) {
      document.querySelector('.winkelwagen__aantal').innerHTML = this.items.length;
    } else {
      document.querySelector('.winkelwagen__aantal').innerHTML = '';
    }
  }
}

winkelwagen.haalItemsOp();
winkelwagen.uitvoeren();
