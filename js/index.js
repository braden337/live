var lastNames = {
   2: 'R. Villopoto',
   3: 'E. Tomac',
   4: 'B. Baggett',
   5: 'R. Dungey',
   6: 'J. Martin',
   7: 'J. Stewart',
   9: 'I. Tedesco',
  10: 'J. Brayton',
  11: 'K. Chisholm',
  12: 'J. Weimer',
  14: 'C. Seely',
  15: 'D. Wilson',
  16: 'Z. Osborne',
  17: 'C. Webb',
  18: 'D. Millsaps',
  19: 'J. Bogle',
  20: 'B. Tickle',
  21: 'J. Anderson',
  22: 'C. Reed',
  23: 'W. Peick',
  24: 'B. Metcalfe',
  25: 'M. Musquin',
  26: 'M. Byrne',
  27: 'N. Wey',
  28: 'J. Nelson',
  29: 'A. Short',
  31: 'A. Martin',
  32: 'J. Hill',
  33: 'J. Grant',
  34: 'M. Stewart',
  35: 'K. Cunningham',
  36: 'M. Goerke',
  37: 'J. Savatgy',
  38: 'M. Bisceglia',
  39: 'F. Noren',
  40: 'S. McElrath',
  41: 'T. Canard',
  42: 'B. Lamay',
  43: 'M. Lemoine',
  44: 'Z. Bell',
  45: 'V. Friese',
  46: 'P. Nicoletti',
  47: 'M. Davalos',
  48: 'W. Hahn',
  49: 'J. Decotis',
  50: 'A. Cianciarulo',
  51: 'J. Barcia',
  52: 'M. Oldenburg',
  53: 'J. Albertson',
  54: 'R. Sipes',
  55: 'K. Peters',
  56: 'C. Thompson',
  57: 'J. Richardson',
  58: 'K. Rusk',
  59: 'D. Tedder',
  60: 'J. Canada',
  61: 'M. Leib',
  62: 'A. Rodriquez',
  63: 'C. Blose',
  64: 'A. Catanzaro',
  65: 'S. Champion',
  66: 'C. Alldredge',
  67: 'D. Ferris',
  68: 'C. Craig',
  69: 'R. Stewart',
  70: 'N. Schmidt',
  71: 'C. Martinez',
  72: 'B. Wharton',
  73: 'G. Audette',
  74: 'Z. Williams',
  75: 'J. Hill',
  76: 'E. Mikhaylov',
  77: 'J. Starling',
  78: 'P. Mull',
  79: 'J. Owen',
  80: 'R. Hampshire',
  81: 'T. Weeck',
  82: 'J. Baumert',
  83: 'L. Kilbarger',
  84: 'J. Wentland',
  85: 'L. Powell',
  86: 'Z. Freeberg',
  87: 'C. Gilmore',
  88: 'D. Alix',
  89: 'B. Kiesel',
  90: 'T. Ingalls',
  91: 'C. Howell',
  92: 'C. Clason',
  93: 'D. Epstein',
  94: 'K. Roczen',
  95: 'N. Gaines',
  96: 'S. Collier',
  97: 'D. Durham',
  98: 'G. Faith',
  99: 'P. Coates',
 100: 'J. Hansen',
 123: 'K. Rookstool',
 130: 'T. Hahn',
 131: 'N. Mcconahy',
 164: 'A. Ullrich',
 181: 'D. Pipes',
 187: 'D. Bauer',
 253: 'J. Short',
 274: 'S. Simpson',
 331: 'T. Weeck',
 348: 'J. Brooks',
 377: 'C. Pourcel',
 381: 'K. Endicott',
 447: 'D. Raper',
 476: 'C. Jurin',
 481: 'S. Astaykin',
 800: 'M. Alessi',
 801: 'J. Alessi',
 894: 'D. Dillon',
 975: 'J. Loberg',
 981: 'A. Politelli'
};

var results = document.getElementById('results');
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
    header.innerHTML += 'g';
    var runningOrder = [];

    data['B'].forEach(function(rider, index, riders){

      var position = rider['C'][0]['P'];
      var number = rider['A'];
      var name = '';
      var gap = rider['C'][0]['LD'] == '--.---' ? '+0.000' : '-' + rider['C'][0]['LD'];

      if (number == 1) {
        champ = whichChamp(riders[1]['A']);
        name = '<b>#' + champ[1] + '</b> ' + champ[0];
      }
      else {
        typeof lastNames[number] == 'string' ? name = '<b>#' + number + '</b> ' + lastNames[number] : name = '<b>#' + number + '</b>';
      }

      runningOrder[position] = {'position': position, 'name': name, 'number': number, 'gap': gap};
    });

    var table = '<table class="table table-striped table-condensed"><tr><th>Pos.</th><th>Rider</th><th>Gap</th></tr>';

    runningOrder.forEach(function(rider, position){
      if (position < 10) {
        table += '&nbsp;';
      }
      if (parseInt(position) < 41) {
        table += '<tr><td>' + position + '</td><td>' + rider['name'] + '</td><td>' + rider['gap'] + '</td></tr>';
      }
    });
    table += '</table>';
    results.innerHTML = table;
  });
}

getResults();
setInterval(getResults, 10000);