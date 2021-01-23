# Mijn Spelletjes Site

Hieronder vind u de uitleg bij onze Snake applicatie.

We hebben zoveel mogelijk methode en klassen van documentatie voorzien, helaas
wordt niet alle documentantie op de JSDoc pagina weergegeven. 
We hebben niet kunnen vinden waarom JSDoc niet alle documentatie in de 
gegenereerde webpagina weergeeft. 


## View

De view heeft één verantwoordelijkheid, geen afhankelijkheden en geen directe link
met de Presenter. 

Bij het laden van de code wordt een functie aan de onStartButtonClicked,
onStopButtonClicked en onDirectionChanged functies gegeven. Deze parameter functies
worden als click listener aan de DOM toegevoegd.

Door de view functies te geven die moeten worden aangeroepen bij een DOM event, heeft de 
view geen directe communicatie met de Presenter.

Verder heeft de view nog methode om het Model en 'banners' op het canvas te tekenen.


## Presenter

Wanneer de snake pagina is geladen wordt de Presenter geinitializeerd. De Presenter
verteld de View welke functies moeten worden aangeroepen wanneer op de start of stop button geklikt wordt.

Bij het klikken op de start-knop wordt de <i>init</i> functie aangeroepen.
Deze creeert een nieuw SnakeGameModel, en start de event loop.

De event loop loopt elke 500 miliseconden(in te stellen in game-settings) en stopt wanneer het spel gameover of gewonnen is.

De Presenter heeft directe communicatie met de View en het Model.

## Model

Het model exporteert een GameModel interface, een Point class en een methode om een GameModel instantie te maken.

#### Point

Het Point is een klasse die een punt op het canvas representeerd, met een x en y attribuut en een kleur. Instanties hiervan
worden in het model aangemaakt en via de presenter doorgegeven aan de View om op het canvas te worden getekend.

#### GameModel

Het GameModel interface is een laag over de SnakeGameModel klasse en laat in één oogopslag zien
welke functies er van buitenaf aangeroepen kunnen worden.

Het GameModel bevat een array met voedsel Point's, een array met snake Point's, een boolean die aangeeft of het spel
'game-over' is en een methode om de slang te laten bewegen.

Alle klassen en methodes in het Model hebben geen directe communicatie met de Presenter of View.
We hebben geprobeerd alle 'state' uit de Presenter en View te houden en in het Model te stoppen.


## Game-Settings en Direction

We hebben gekozen om alle spel 'settings' in een apart bestand te zetten zodat deze gemakkelijk
op één plek aan te passen zijn.

Voor de Direction(Up, Down, Left, Right) hebben we een enum gemaakt in een apart bestand.

## Site starten en testen

Download de dependencies:
```
npm install
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

