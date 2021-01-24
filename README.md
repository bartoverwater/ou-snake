# Mijn Spelletjes Site

Hieronder vindt u de uitleg bij onze Snake applicatie.


## 1. Verantwoordelijkheden van de modulen/ onderdelen

### View

De view heeft één verantwoordelijkheid, namelijk het weergeven van het spel waarin de speler speelt met bijbehorende functieknoppen.

Bij het laden van de code wordt een functie aan de onStartButtonClicked,
onStopButtonClicked en onDirectionChanged functies gegeven. Deze parameterfuncties worden als clicklistener aan de DOM toegevoegd.
Anders dan de beschrijving in de opdracht hebben we ervoor gekozen om bij het einde van het spel (door te winnen of door gameover) of bij het drukken op de stop-knop het canvas niet leeg te maken, maar juist de eindtoestand te laten behouden. Dit vonden wij een mooier einde.

Verder heeft de view nog een methode om het Model en 'banners' op het canvas te tekenen.


### Presenter

Wanneer de snake-pagina is geladen wordt de Presenter geïnitialiseerd. De Presenter bevat code die reageert op de events in de DOM en code om de DOM aan te passen op basis van elementen uit het Model.

De Presenter vertelt de View welke functies moeten worden aangeroepen wanneer op de start- of stop-button geklikt wordt.

Bij het klikken op de start-knop wordt de <i>init</i> functie aangeroepen. Deze roept functies vanuit het Model aan en creëert zo een nieuw SnakeGameModel en start de event loop.
De event loop loopt elke 500 milliseconden (in te stellen in game-settings) en stopt wanneer het spel gameover geeft of gewonnen is.

We hebben ervoor gekozen om de stop-button een pauzeerfunctie te geven in plaats van het volledig beëindigen van het spel, omdat we dat zelf een handiger functie vonden.


### Model

Het verloop van het spel en de spelregels zijn grotendeels in het Model geïmplementeerd, dat wil zeggen de mogelijkheden voor bewegingen, de vervolgacties van het raken van voedsel of van botsingen van de slang met zichzelf en natuurlijk of de speler het spel gewonnen of verloren heeft.

Het Model exporteert een GameModel interface, een Point class en een methode om een GameModel instantie te maken.


#### Point

Point is een klasse die een punt op het canvas representeert, met een x- en y-attribuut en een kleur. Instanties hiervan worden in het Model aangemaakt en via de Presenter doorgegeven aan de View om op het canvas te worden getekend.

We hebben hier gekozen voor een klasse in plaats van een interface zodat we de collidesWith(otherPoint) methode in de klasse konden plaatsen.

#### GameModel

Het GameModel-interface is een laag over de SnakeGameModel-klasse.

Het GameModel bevat een array met voedsel-points, een array met snake-points, een boolean die aangeeft of het spel 'game-over' is en een methode om de slang te laten bewegen.


### Game-Settings en Direction

Het bestand Game-Settings bevat alle basisinstellingen voor het spel. We hebben ervoor gekozen om alle 'game-settings' in een apart bestand te zetten zodat deze gemakkelijk op één plek aan te passen zijn.

Voor de Direction(Up, Down, Left, Right) hebben we een enum gemaakt in een apart bestand.

## 2. Afhankelijkheden

De View heeft geen afhankelijkheden en geen directe link met de Presenter. Door de View functies te geven die moeten worden aangeroepen bij een DOM event, heeft de View immers geen directe communicatie met de Presenter.

De Presenter fungeert als intermediar tussen de View en het Model en heeft dus directe communicatie met beiden.

Het Model bevat geen enkele klasse of methode met een directe communicatie met de Presenter of de View.


## 3. Motivatie voor deze indeling in modules / verdeling van verantwoordelijkheden;

We hebben geprobeerd de diverse verantwoordelijkheden van het spel op een logische manier van elkaar te scheiden. We hebben de diverse functies dus zo verdeeld dat de View echt alleen de communicatie met de gebruiker regelt, in het Model alle 'state' van het spel geregeld wordt en de Presenter fungeert als intermediair tussen View en Model.

In het Model hebben we ervoor gekozen om een interface GameModel te exporteren in plaats van de klasse SnakeGameModel zodat het in één oogopslag duidelijk is wat er van buitenaf aangeroepen kan worden en het makkelijker wordt om andere gamemodels met andere regels te implementeren.

Voor de gamesettings en de diverse mogelijke beweegrichtingen (direction) hebben we voor de duidelijkheid en de onderhoudbaarheid aparte bestanden gemaakt.  

## 4. Overige opmerkingen:

### Problemen met JSDoc
We hebben zoveel mogelijk methoden en klassen van documentatie voorzien, helaas wordt niet alle documentatie op de JSDoc pagina weergegeven.
We hebben niet kunnen vinden waarom JSDoc niet alle documentatie in de gegenereerde webpagina weergeeft.

De methodes die wel documentatie bevatten maar niet in JSDoc te zien zijn, zijn onder andere:
- Presenter.init
- Presenter.load
- Point.collidesWith
- Model.newModel
- Model.getRandomInt
- Model.roundToNearestGridCell

### Competitive Mode

Als extra functie hebben we Competitive Mode toegevoegd. Wanneer je het vinkje naast het canvas aanzet en een nieuw spel begint zal het spel starten in Competitive Mode.

In Competitive Mode speel je voor een zo hoog mogelijke score. De slang zal zich sneller bewegen en wanneer er een voedselelement opgegeten is, zal er een nieuw voedsel element verschijnen. Elk opgegeten voedsel element voegt 10 punten toe aan je score.

Wanneer het spel game-over is zal je score naar de database verzonden worden en wordt de highscore tabel geüpdatet met je verkregen positie.

### Site starten en testen

Download de dependencies:
```
$ npm install
```

Tests draaien:

```
$ npm test
```

Typescript compileren:

```
$ npm run build
```

Http-server starten op localhost:8080:

```
$ npm start
```

Typescript compileren in --watch mode en http server starten:

```
$ npm run dev
```
