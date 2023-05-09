let canvas = document.getElementById('game'),
    context = canvas.getContext('2d'),
    radball = 9,
    x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
    y = canvas.height - 40,
    dx = 2,
    dy = -2;

let padh = 12,
    padw = 72;

let padx = (canvas.width - padw) / 2;


let row = 5,
    column = 9,
    brickw = 54,
    brickh = 18,
    brickpad= 12,
    topOffset = 40,
    leftOffset = 33,
    score = 0;


let bricks = [];
for (let i = 0; i < column; i++) {
    bricks[i] = [];
    for (let j = 0; j < row; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
}


document.addEventListener("mousemove", movemouse, false);


function movemouse(m) {
    var relatx = m.clientX - canvas.offsetLeft;
    if (relatx > 0 && relatx < canvas.width) {
        padx = relatx - padw / 2;
    }
}


function drawpad() {
    context.beginPath();
    context.roundRect(padx, canvas.height - padh, padw, padh, 30);
    context.fillStyle = '#333';
    context.fill();
    context.closePath();
}


function drawball() {
    context.beginPath();
    context.arc(x, y, radball, 0, Math.PI * 2);
    context.fillStyle = '#333';
    context.fill();
    context.closePath();
}


function drawbrick() {
    for (let i = 0; i < column; i++) {
        for (let j = 0; j < row; j++) {
            if (bricks[i][j].status === 1) {
                let brickx = (i * (brickw + brickpad)) + leftOffset;
                let bricky = (j * (brickh + brickpad)) + topOffset;
                bricks[i][j].x = brickx;
                bricks[i][j].y = bricky;
                context.beginPath();
                context.roundRect(brickx, bricky, brickw, brickh, 30);
                context.fillStyle = '#333';
                context.fill();
                context.closePath();
            }
        }
    }
}


function tscore() {
    context.font = 'bold 16px sans-serif';
    context.fillStyle = '#333';
    context.fillText('Score : ' + score, 8, 24);
}

function hit() {
    for (let i = 0; i < column; i++) {
        for (let j = 0; j < row; j++) {
            let b = bricks[i][j];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickw && y > b.y && y < b.y + brickh) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    
                    if (score === row * column) {
                        alert('winner');
                        document.location.reload();
                    }
                }
            }
        }
    }
}


function main() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    tscore();
    drawbrick();
    drawball();
    drawpad();
    hit();

    
    if (x + dx > canvas.width - radball || x + dx < radball) {
        dx = -dx;
    }

    
    if (y + dy < radball) {
        dy = -dy;
    } else if (y + dy > canvas.height - radball) {
        
        if (x > padx && x < padx + padw) {
            dy = -dy;
        } else {
            
            alert('you lose ;-;');
            document.location.reload();
        }
    }

    
    if (y + dy > canvas.height - radball || y + dy < radball) {
        dy = -dy;
    }

    
    x += dx;
    y += dy;
}

setInterval(main, 10);