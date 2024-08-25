import fs from "fs";

export class LotteryTicket {

    constructor(readonly draw: DrawFlyweight, readonly bet1: string, readonly bet2: string,
         readonly bet3: string, readonly bet4: string, readonly bet5: string, readonly bet6: string
    ) {

    }
}

export class DrawFlyweight {
    constructor(readonly draw: string, readonly date: Date) {

    }
}

export class FlyWeightFactory {
    static cache: {[index: string]: DrawFlyweight } = {};

    static getDrawFlyweight(draw: string, date: string) {
        const index = `${draw}:${date}`;

        if (!FlyWeightFactory.cache[index]) {
            FlyWeightFactory.cache[index] = new DrawFlyweight(draw, new Date(date));
        }

        return FlyWeightFactory.cache[index];
    }
}


const data = fs.readFileSync("./data/bets.csv", "utf-8");
const tickets: LotteryTicket[] = [];
for (const line of data.split("\n")) {
    const [draw, date, bet1, bet2, bet3, bet4, bet5, bet6] = line.split(";");
    const ticket = new LotteryTicket(FlyWeightFactory.getDrawFlyweight(draw, date), bet1, bet2, bet3, bet4, bet5, bet6);

    tickets.push(ticket);
}

console.log(process.memoryUsage().heapUsed/Math.pow(1024, 2));