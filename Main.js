let canvas, ctx,
    width = 400, height = 400,
    genTime = 50, time = 0,
    pauseTime = 100, inPause = false

    entities = [], ne = 60,
    target = new Vector2(130, 210)

    n_gen = 1, succ_gen = null, succ_last = false, succ_cont = false,
    
    obstacles = [],
    bestPath = null    
;

function start() {
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    init();

    window.requestAnimationFrame(gameLoop);
}

function init() {
    entities = genRandomGeneration(ne);

    obstacles.push([50, 0, 10, 215]);
    obstacles.push([75, 210, 10, 400]);
    obstacles.push([100, 0, 10, 215]);
}

function gameLoop() {
    update();
    render();
    window.requestAnimationFrame(gameLoop);
}

function update() {
    for(i = 0; i < entities.length; i++) {
        entities[i].update();
        for (j = 0; j < obstacles.length; j++) { 
            entities[i].checkCollision(obstacles[j]);
        }
    }

    time++;
    if (time >= genTime) {
        inPause = true;
        calcBestPath();
        for (i = 0; i < entities.length; i++) {
            entities[i].stop = true;
        }
        if (time >= genTime + pauseTime) { 
            inPause = false;
            entities = getGenerationFromLast(entities);
            time = 0;
            n_gen++;
            if (!succ_cont) succ_last = false;
            succ_cont = false;
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fillRect(0, 0, width, height);
        }

    }
}

function render() {
    ctx.fillStyle = "rgba(0, 0, 0, .05)";
    ctx.fillRect(0, 0, width, height);

    if(!succ_last) ctx.fillStyle = "rgba(255, 0, 0, 1)";
    else ctx.fillStyle = "rgba(255, 0, 1)";
    ctx.fillRect(target.x - 3, target.y - 3, 6, 6);
    
    for(i = 0; i < obstacles.length; i++) {
        ctx.fillStyle = "rgba(255, 255, 0, 1)";
        ctx.fillRect(obstacles[i][0], obstacles[i][1], obstacles[i][2], obstacles[i][3]);
    }

    for (i = 0; i < entities.length; i++) {
        entities[i].render();
    }

    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "20px Arial";
    ctx.fillText("Generation: " + n_gen + " | " + succ_gen, 10, 20);

    if (inPause) { 
        renderBestPath();
    }
}

function calcBestPath() { 
    let bestFitness = -1;
    for (i = 0; i < entities.length; i++) {
        let fit = entities[i].calcFitness();
        if (fit > bestFitness) { 
            bestFitness = fit;
            bestPath = entities[i].dna.slice(0, entities[i].time);
        }
    }
}

function renderBestPath() {
    let pos = new Vector2(20, 200);
    for (i = 0; i < bestPath.length; i++) {
        pos.add(bestPath[i].x, bestPath[i].y)
        ctx.fillStyle = "rgba(255, 200, 200, .5)";
        ctx.fillRect(pos.x, pos.y, 5, 5);
    }
}

function genRandomGeneration(n) {
    let gen = [];
    for(i = 0; i < n; i++) {
        let dna = [];
        for(j = 0; j < genTime; j++) {
            dna[j] = Vector2.random(-5, 5);
        }
        gen.push(new Entity(dna));
    }
    return gen;
}

function getGenerationFromLast(last) {
    let new_gen = [];
    const prob_pool = genProbabilityPool(last);
    for(i = 0; i < last.length; i++) {
        let e0 = prob_pool[Math.floor(Math.random()*prob_pool.length)];
        let e1 = prob_pool[Math.floor(Math.random()*prob_pool.length)];
        let dna = mixDna(e0, e1);
        dna = mutateDna(dna, 1);
        new_gen.push(new Entity(dna));
    }
    return new_gen;
}

function mixDna(e0, e1) {
    let res = [];
    for(iii = 0; iii < e0.dna.length; iii++) {
        const n = Math.random();
        if(n < .5) {
            res.push(e0.dna[iii]);
        } else {
            res.push(e1.dna[iii]);
        }
    }
    return res;
}

function mutateDna(base_dna, rate) {
    let res = [];
    for(j = 0; j < base_dna.length; j++) {
        const n = Math.random();
        if(n < rate/100) {
            res.push(Vector2.random(-5, 5));
        } else {
            res.push(base_dna[j]);
        }
    }

    return res;
}

function genProbabilityPool(generation) {
    let sorted_gen = [];

    
    let res = [];
    for(ii = 0; ii < generation.length; ii++) {
        for(jj = 0; jj < Math.floor(generation[ii].calcFitness()*100); jj++) {
            res.push(generation[ii]);
        }
    }
    return res;
}

window.onload = start;