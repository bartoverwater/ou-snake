# Mijn Spelletjes Site

Hieronder vindt u de uitleg bij onze Snake applicatie.

We hebben zoveel mogelijk methoden en klassen van documentatie voorzien, helaas wordt niet alle documentatie op de JSDoc pagina weergegeven.
We hebben niet kunnen vinden waarom JSDoc niet alle documentatie in de gegenereerde webpagina weergeeft.


## View

De view heeft één verantwoordelijkheid (AH? het weergeven van het spel waarin de speler speelt met bijbehorende functieknoppen AH?), geen afhankelijkheden en geen directe link met de Presenter.

Bij het laden van de code wordt een functie aan de onStartButtonClicked,
onStopButtonClicked en onDirectionChanged functies gegeven. Deze parameterfuncties worden als clicklistener aan de DOM toegevoegd.
(AH? We hebben ervoor gekozen om bij het einde van het spel (door te winnen of door gameover) of bij het drukken op de stop-knop het canvas niet leeg te maken, maar juist de eindtoestand te laten behouden. AH?)

Door de view functies te geven die moeten worden aangeroepen bij een DOM event, heeft de view geen directe communicatie met de Presenter.

Verder heeft de view nog een methode om het Model en 'banners' op het canvas te tekenen.


## Presenter

Wanneer de snake-pagina is geladen wordt de Presenter geïnitialiseerd. De Presenter heeft directe communicatie met de View en het Model.

De Presenter vertelt de View welke functies moeten worden aangeroepen wanneer op de start- of stop-button geklikt wordt.
(AH? We hebben ervoor gekozen om de stop-button een pauzeerfunctie te geven in plaats van het volledig beëindigen van het spel, omdat we dat zelf een handiger functie vonden. AH?)

Bij het klikken op de start-knop wordt de <i>init</i> functie aangeroepen. Deze (AH?) roept functies vanuit het Model aan en (AH?) creëert zo een nieuw SnakeGameModel en start de event loop.

De event loop loopt elke 500 miliseconden (in te stellen in game-settings) en stopt wanneer het spel gameover geeft of gewonnen is.


## Model

Het Model exporteert een GameModel interface, een Point class en een methode om een GameModel instantie te maken.
(AH? Misschien hier ook noemen: Het verloop van het spel en de spelregels zijn grotendeels/volledig(?) in het Model geïmplementeerd, dat wil zeggen de mogelijkheden voor bewegingen, de vervolgacties van het raken van voedsel of van botsingen van de slang met zichzelf en natuurlijk of de speler het spel gewonnen of verloren heeft. AH?)

#### Point

Point is een klasse die een punt op het canvas representeert, met een x- en y-attribuut en een kleur. Instanties hiervan worden in het Model aangemaakt en via de Presenter doorgegeven aan de View om op het canvas te worden getekend.

#### GameModel

De GameModel-interface is een laag over de SnakeGameModel-klasse en laat in één oogopslag zien welke functies er van buitenaf aangeroepen kunnen worden.

Het GameModel bevat een array met voedsel-points, een array met snake-points, een boolean die aangeeft of het spel 'game-over' is en een methode om de slang te laten bewegen.

Geen enkele klasse of methode in het Model heeft een directe communicatie met de Presenter of de View.
We hebben geprobeerd alle 'state' uit de Presenter en View te houden en in het Model te stoppen.


## Game-Settings en Direction

We hebben gekozen om alle 'game-settings' in een apart bestand te zetten zodat deze gemakkelijk op één plek aan te passen zijn.

Voor de Direction(Up, Down, Left, Right) hebben we een enum gemaakt in een apart bestand.

## Site starten en testen

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
