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
        this.time++;
    }

    render() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(this.pos.x, this.pos.y, 5, 5);
    }

    calcFitness() {
        const dist = Vector2.dist(this.pos, target);
        let res =(dist*-1 + this.maxdist)/this.maxdist;
        return res > 0 ? res : 0;
    }
}