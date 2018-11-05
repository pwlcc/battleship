var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    x: width / 2 - 250,
    y: height / 2 - 250
});

var gameboardLayer = new Konva.Layer();
let gap = 5;
let boxSize = 20;
let gameSize = 10;
for (let i = 0; i < gameSize; i++) {
    for (let j = 0; j < gameSize; j++) {
        let box = new Konva.Rect({
            x: (gap + boxSize) * j,
            y: (gap + boxSize) * i,
            width: boxSize,
            height: boxSize,
            fill: '#fff',
            stroke: 'black',
            strokeWidth: 1
        });
        box.on('click', () => {
            socket.emit('click', { x: box.getX() / (gap + boxSize), y: box.getY() / (gap + boxSize) })
            console.log('click!');
        });

        box.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });
        box.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });
        gameboardLayer.add(box);
    }
};
let haveIntersection = (r1, r2) => {
    return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
    );
};
var shipsLayer = new Konva.Layer();
let ships = [5, 4, 4, 3, 3, 2, 2];
let getMousePos = (canvas, evt) => {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
};
let generateShips = (ships) => {
    let counter = 0;
    ships.forEach((ship) => {
        let shipRect = new Konva.Rect({
            x: 0,
            y: gameSize * (boxSize + gap) + counter++ * (boxSize + 2 * gap),
            fill: 'blue',
            width: ship * (boxSize + gap) - gap,
            height: 20,
            draggable: true
        });
        shipRect.on('dragmove', (event) => {
            let target = event.target;
            let targetRect = event.target.getClientRect();
            const canvas = gameboardLayer.getCanvas()._canvas;
            let mousePos = getMousePos(canvas, event.evt);
            mousePos.x -= stage.getX();
            mousePos.y -= stage.getY();
            shipRect.setX(mousePos.x - (mousePos.x % (gap + boxSize)));
            shipRect.setY(mousePos.y - (mousePos.y % (gap + boxSize)));

            shipsLayer.children.each(function (ship) {
                // do not check intersection with itself
                if (ship === target) {
                    return;
                }
                if (haveIntersection(ship.getClientRect(), targetRect)) {
                    ship.fill('red');
                } else {
                    ship.fill('blue');
                }
            });
        });
        shipRect.on('dragend', () => {
            console.log('ship moved!');
            console.log(`ship x: ${shipRect.getX()}, ship y: ${shipRect.getY()}`)
        });
        shipsLayer.add(shipRect);
    });
};
generateShips(ships);

stage.add(gameboardLayer);
stage.add(shipsLayer);