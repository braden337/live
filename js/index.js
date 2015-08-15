var lastNames = {
   2: 'Villopoto',
   3: 'Tomac',
   4: 'Baggett',
   5: 'Dungey',
   6: 'Martin',
   7: 'Stewart',
   9: 'Tedesco',
  10: 'Brayton',
  11: 'Chisholm',
  12: 'Weimer',
  14: 'Seely',
  15: 'Wilson',
  16: 'Osborne',
  17: 'Webb',
  18: 'Millsaps',
  19: 'Bogle',
  20: 'Tickle',
  21: 'Anderson',
  22: 'Reed',
  23: 'Peick',
  24: 'Metcalfe',
  25: 'Musquin',
  26: 'Byrne',
  27: 'Wey',
  28: 'Nelson',
  29: 'Short',
  31: 'Martin',
  32: 'Hill',
  33: 'Grant',
  34: 'Stewart',
  35: 'Cunningham',
  36: 'Goerke',
  37: 'Savatgy',
  38: 'Bisceglia',
  39: 'Noren',
  40: 'McElrath',
  41: 'Canard',
  42: 'Lamay',
  43: 'Lemoine',
  44: 'Bell',
  45: 'Friese',
  46: 'Nicoletti',
  47: 'Davalos',
  48: 'Hahn',
  49: 'Decotis',
  50: 'Cianciarulo',
  51: 'Barcia',
  52: 'Oldenburg',
  53: 'Albertson',
  54: 'Sipes',
  55: 'Peters',
  56: 'Thompson',
  57: 'Richardson',
  58: 'Rusk',
  59: 'Tedder',
  60: 'Canada',
  61: 'Leib',
  62: 'Rodriquez',
  63: 'Blose',
  64: 'Catanzaro',
  65: 'Champion',
  66: 'Alldredge',
  67: 'Ferris',
  68: 'Craig',
  69: 'Stewart',
  70: 'Schmidt',
  71: 'Martinez',
  72: 'Wharton',
  73: 'Audette',
  74: 'Williams',
  75: 'Hill',
  76: 'Mikhaylov',
  77: 'Starling',
  78: 'Mull',
  79: 'Owen',
  80: 'Hampshire',
  81: 'Weeck',
  82: 'Baumert',
  83: 'Kilbarger',
  84: 'Wentland',
  85: 'Powell',
  86: 'Freeberg',
  87: 'Gilmore',
  88: 'Alix',
  89: 'Kiesel',
  90: 'Ingalls',
  91: 'Howell',
  92: 'Clason',
  93: 'Epstein',
  94: 'Roczen',
  95: 'Gaines',
  96: 'Collier',
  97: 'Durham',
  98: 'Faith',
  99: 'Coates',
 100: 'Hansen',
 123: 'Rookstool',
 130: 'Hahn',
 131: 'Mcconahy',
 164: 'Ullrich',
 181: 'Pipes',
 187: 'Bauer',
 224: 'Harrison',
 244: 'Zimmer',
 253: 'Short',
 274: 'Simpson',
 285: 'Archer',
 309: 'Smith',
 331: 'Weeck',
 348: 'Brooks',
 356: 'Lippman',
 377: 'Pourcel',
 381: 'Endicott',
 393: 'Herrlein',
 447: 'Raper',
 456: 'Grove',
 476: 'Jurin',
 481: 'Astaykin',
 558: 'Slusser',
 800: 'Alessi',
 801: 'Alessi',
 828: 'Craft',
 894: 'Dillon',
 956: 'Masterpool',
 975: 'Loberg',
 978: 'Nogueras',
 981: 'Politelli',
 993: 'Wagner'
};

var results = document.getElementById('results');
var eventinfo = document.getElementById('eventinfo');
var header = document.getElementsByTagName('h1');
var series = ['mx', 'sx'];
var url = 'http://americanmotocrosslive.com/xml/' + series[0] + '/racelaptimes.json';

function whichChamp(nextRider) {
  // console.log(nextRider);
  if (nextRider < 6) {
    return [lastNames[94], 94];
  }
  else {
    return [lastNames[6], 6];
  }
}

function getSeconds(minuteString) {
  minutes = minuteString.split(':');
  if (minutes.length < 2) {
    return parseFloat(minutes[0]);
  }
  else {
    return parseFloat(minutes[0]) * 60 + parseFloat(minutes[1]);
  }
}

function getResults() {
  $.getJSON(url, function(data) {
    /*json = JSON.parse(data)*/;
    console.log('lol');
    var runningOrder = [];

    data['B'].forEach(function(rider, index, riders){

      var position = rider['C'][0]['P'];
      var number = rider['A'];
      var name = '';
      var gap = rider['C'][0]['LD'] === '--.---' ? '+0.000' : '-' + rider['C'][0]['LD'];

      if (number == 1) {
        champ = whichChamp(riders[1]['A']);
        number = champ[1];
        name = champ[0];
      }
      else {
        bikenumber = number;
        typeof lastNames[number] == 'string' ? name = lastNames[number] : name = '-';
      }

      runningOrder[position] = {'position': position, 'name': name, 'number': number, 'gap': gap};
    });

    var table = '<table class="table table-striped table-condensed"><thead><tr><th class="center">Pos.</th><th class="right">#</td><th>Rider</th><th class="right">Gap</th></tr></thead><tbody>';
    
    runningOrder.forEach(function(rider, position){
      if (parseInt(position) < 41) {
        table += '<tr><td class="center">' + position + '</td><td class="right"><b>' + rider['number'] + '</b></td><td><em>' + rider['name'] + '</em></td><td class="right">' + rider['gap'] + '</td></tr>';
      }
    });
    table += '</tbody></table>';
    results.innerHTML = table;
  });
}

function loadXml(callback) {
  $.ajax({
    type: "GET",
    url: "http://americanmotocrosslive.com/xml/mx/RaceResultsWeb.xml",
    dataType: "xml",
    success: function(data) {
      callback(data);
    }
   });
}





// loadXml(function(xml) {
//   // var x = xml.getElementsByTagName('B');
//   // for (var i = 0; i < x.length; ++i) {
//   //   console.log(x[i].getAttribute('F').substring(3));
//   // }
//   var $race = $(xml).find('A');
//   var $results = $(xml).find('B');

//   var table = '<table class="table table-striped table-condensed"><thead><tr><th class="center">Pos.</th><th class="right">#</td><th>Rider</th><th class="right">Gap</th></tr></thead><tbody>';

//   $.each($results, function(position, result) {
//     table += '<tr><td class="center">' + (position+1).toString() + '</td><td class="right"><b>' + $(result).attr('N') + '</b></td><td><em>' + $(result).attr('F').substring(3) + '</em></td><td class="right">' + $(result).attr('D') + '</td></tr>';
//     // console.log((position+1).toString(), $(result).attr('N'), $(result).attr('F').substring(3), $(result).attr('D'));
//   });

//   table += '</tbody></table>';
//   results.innerHTML = table;
  
// });




function getTheStuff() {
  loadXml(function(xml) {
    // var x = xml.getElementsByTagName('B');
    // for (var i = 0; i < x.length; ++i) {
    //   console.log(x[i].getAttribute('F').substring(3));
    // }
    var $race = $(xml).find('A');
    var $results = $(xml).find('B');

    eventinfo.innerHTML = '<h3>' + $race.attr('E') + '</h2><h4>' + $race.attr('S') + '</h4>';
    var table = '<table class="table table-striped table-condensed"><thead><tr><th class="center">Pos.</th><th class="right">#</td><th>Rider</th><th class="right">Gap</th></tr></thead><tbody>';

    $.each($results, function(position, result) {
      table += '<tr><td class="center">' + (position+1).toString() + '</td><td class="right"><b>' + $(result).attr('N') + '</b></td><td><em>' + $(result).attr('F').substring(3) + '</em></td><td class="right">' + $(result).attr('D') + '</td></tr>';
      // console.log((position+1).toString(), $(result).attr('N'), $(result).attr('F').substring(3), $(result).attr('D'));
    });

    table += '</tbody></table>';
    results.innerHTML = table;

   //  console.log('Hello');
    
  });
}

//Run the stuff and loop
getTheStuff();
setInterval(getTheStuff, 10000);



// getResults();
// setInterval(getResults, 10000);
