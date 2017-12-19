var engine = new GameEngine();
engine.addGameObjects([new GameObject("Stuff", new Position(10, 10), "./img/tiles/tile1.png")]);
engine.setup();
engine.run();
// engine.draw();