class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(p) {
        this.x += p.x;
        this.y += p.y;
    }

    add(x, y) {
        this.x += x;
        this.y += y;
    }

    sub(p) {
        this.x -= p.x;
        this.y -= p.y;
    }

    sub(x, y) {
        this.x -= x;
        this.y -= y;
    }

    abs() {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }

    static add(p0, p1) {
        return new Vector2(p0.x+p1.x, p0.y+p1.y);
    }

    static sub(p0, p1) {
        return new Vector2(p0.x-p1.x, p0.y-p1.y);
    }

    static abs(p) {
        return new Vector2(Math.abs(p.x), Math.abs(p.y));
    }

    static dist(p0, p1) {
        const dist = Vector2.sub(p1, p0);
        return Math.sqrt(dist.x*dist.x + dist.y*dist.y);
    }

    static a(p0, p1) {
        let dx = p1.x-p0.x;
        let dy = p1.y-p0.y;
        return Math.atan2(dy, dx);
    }

    static random(min, max) {
        max++;
        return new Vector2(Math.floor(Math.random()*(max-min))+min, Math.floor(Math.random()*(max-min))+min);
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}