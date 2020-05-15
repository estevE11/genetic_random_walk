class Entity {
    constructor(dna) {
        this.start = new Vector2(20, 200);
        this.maxdist = Vector2.dist(this.start, target);
        
        this.pos = new Vector2(this.start.x, this.start.y);
        
        this.dna = dna;
        this.time = 0;
    }

    update() {
        const g = this.dna[this.time];
        this.pos.add(g.x, g.y);
        if(Vector2.dist(this.pos, target) < 5 && succ_gen == null) succ_gen = n_gen;
        this.time++;
    }

    render() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(this.pos.x, this.pos.y, 5, 5);
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