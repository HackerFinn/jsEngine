var GameEngine = function (debug) {
    var self = GameEngine.prototype;
    self.debug = debug;
};

GameEngine.prototype.addGameObjects = function (gameObjects) {
    GameEngine.prototype.gameObjects = gameObjects;
}

GameEngine.prototype.setup = function () {
    var self = GameEngine.prototype;
    self.c_canvas = document.getElementById("viewPort");
    self.mousePosition = { x: 0, y: 0 };
    self.context = self.c_canvas.getContext("2d");
    self.zoom = 5;
    self.c_canvas.width=window.innerWidth;
    self.c_canvas.height=window.innerHeight;
    document.addEventListener("keyup", self.quitGame, false);
    self.c_canvas.addEventListener('mousemove', self.mouseMove, false);
    window.addEventListener('resize', self.windowResize, false);
}

GameEngine.prototype.quitGame = function (e) {
    var keyCode = e.keyCode;
    if(keyCode==27) {
        running = false;
    }
}

GameEngine.prototype.sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

GameEngine.prototype.run = function () {
    var self = GameEngine.prototype;
    setInterval(self.draw, 1);
}

GameEngine.prototype.render = function () {
    //Do custom rendering here.
}

GameEngine.prototype.draw = function () {
    var self = GameEngine.prototype;
    if(!self.lastFrameTime) {
        self.lastFrameTime = performance.now();
        self.fps = 0;
        return;
    }
    self.clearCanvas();
    // main game loop.
    // Renderer start.
    for (var x = 0.5; x < window.innerWidth+1; x += 10) {
        self.context.moveTo(x, 0);
        self.context.lineTo(x, window.innerHeight);
    }
    
    for (var y = 0.5; y < window.innerHeight+1; y += 10) {
        self.context.moveTo(0, y);
        self.context.lineTo(window.innerWidth, y);
    }
    
    self.context.strokeStyle = "#ddd";
    self.context.stroke();
    self.context.closePath();
    
    for (let i = 0; i < GameEngine.prototype.gameObjects.length; i++) {
        var gameObject = GameEngine.prototype.gameObjects[i];
        self.context.beginPath();
        self.context.strokeStyle = "blue";
        self.context.drawImage(gameObject.sprite, gameObject.position.x*10, gameObject.position.y*10, 20, 20);
        if (self.debug) {
            self.context.strokeText("GO: "+gameObject.name, gameObject.position.x*10, (gameObject.position.y*10)+10);
        }
        self.context.closePath();
    }

    self.context.beginPath();
    self.context.rect(Math.floor(self.mousePosition.x / 10) * 10, Math.floor(self.mousePosition.y / 10) * 10,10,10);
    self.context.strokeStyle = "red";
    self.context.stroke();
    self.context.closePath();

    self.context.beginPath();
    self.context.strokeStyle = "green";
    self.context.strokeText("FPS: "+self.fps.toFixed(2), 6, 12);
    self.context.closePath();
    
    self.context.beginPath();
    self.context.arc(50, 50, 10, 0, Math.PI*2);
    self.context.fillStyle = "#0095DD";
    self.context.fill();
    self.context.closePath();
    self.context.beginPath();
    self.render();
    // Renderer end.
    
    self.delta = (performance.now() - self.lastFrameTime)/1000;
    self.lastFrameTime = performance.now();
    self.fps = 1/self.delta;
}

GameEngine.prototype.mouseMove = function (e) {
    var self = GameEngine.prototype;
    self.mousePosition.x = e.clientX;
    self.mousePosition.y = e.clientY;
}

GameEngine.prototype.windowResize = function (e) {
    var self = GameEngine.prototype;
    self.c_canvas.width=window.innerWidth;
    self.c_canvas.height=window.innerHeight;
}

GameEngine.prototype.clearCanvas = function () {
    var self = GameEngine.prototype;
    self.context.clearRect(0, 0, self.c_canvas.width, self.c_canvas.height);
}

// Position Class
var Position = function (x, y) {
    Position.prototype.x = x;
    Position.prototype.y = y;
};