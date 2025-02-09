import { MovieScreening } from "./MovieScreening";

export class MovieTicket {
    constructor(
        public screening: MovieScreening,
        public isPremium: boolean,
        public seatRow: number,
        public seatNr: number
      ) {}
    
    public isPremiumTicket(): boolean {
        return this.isPremium;
    }
    
    public getPrice(): number {
        return this.screening.getPricePerSeat() + (this.isPremium ? 3 : 0);
    }
    
    public toString(): string {
        return `${this.screening.toString()} - Stoel: Rij ${this.seatRow}, Nr ${this.seatNr} ${this.isPremium ? "(Premium)" : ""}`;
    }
}
