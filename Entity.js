class Entity {
    constructor(dna) {
        this.start = new Vector2(20, 200);
        this.maxdist = Vector2.dist(this.start, target);
        
        this.pos = new Vector2(this.start.x, this.start.y);
        this.w = 5;

        this.dna = dna;
        this.time = 0;

        this.stop = false;
    }

    update() {
        const g = this.dna[this.time];
        if(!this.stop) this.pos.add(g.x, g.y);
        if (Vector2.dist(this.pos, target) < 5 && succ_gen == null) {
            succ_gen = n_gen;
            succ_last = true;
            succ_cont = true;
        }
        this.time++;
    }

    render() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(this.pos.x, this.pos.y, this.w, this.w);
    }

    checkCollision(obstacle) { 
        if (this.AABBIntersects(obstacle)) this.stop = true;
    }

    AABBIntersects(obstacle) {
        return this.checkPointRectangleCollision(this.pos, obstacle) ||
            this.checkPointRectangleCollision(new Vector2(this.pos.x + this.w, this.pos.y), obstacle) ||
            this.checkPointRectangleCollision(new Vector2(this.pos.x, this.pos.y + this.w), obstacle) ||
            this.checkPointRectangleCollision(new Vector2(this.pos.x + this.w, this.pos.y + this.w), obstacle);
    }

    checkPointRectangleCollision(p, rec) {
        return p.x > rec[0] && p.x < rec[0]+rec[2] && p.y > rec[1] && p.y < rec[1]+rec[3] 
    }

    calcFitness() {
        const dist = Vector2.dist(this.pos, target);
        if(dist < 5) return 1;
        let res =(dist*-1 + this.maxdist)/this.maxdist;
        if(res < 0) res = 0;
        else if (res > 1) res = 1;
        return res*(1+res);
    }
}