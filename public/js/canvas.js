var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    x:width/2-250,
    y:height/2-250
});

var layer = new Konva.Layer();
let gap = 5;
let box_size = 20;
for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
        let box = new Konva.Rect({
            x: (gap + box_size) * j,
            y: (gap + box_size) * i,
            width: box_size,
            height: box_size,
            fill: '#fff',
            stroke: 'black',
            strokeWidth: 1,
            draggable: true,
        });
        box.on('click', () => {
            socket.emit('click', {x: box.getX()/(gap+box_size), y: box.getY()/(gap+box_size)})
            console.log('xd');
        });
        box.on('mouseover', function () {
            this.setFill('#000');
            document.body.style.cursor = 'pointer';
            layer.draw();
        });
        box.on('mouseout', function () {
            this.setFill('#fff');
            document.body.style.cursor = 'default';
            layer.draw();
        });
        layer.add(box);
    }
}
let ship = new Konva.Rect({
    x:0,
    y:550,
    fill: 'red',
    width:20,
    height:20,
    draggable: true
})
layer.add(ship);
stage.add(layer);