import { MovieScreening } from "./MovieScreening";

export class MovieTicket {
    constructor(
        public screening: MovieScreening,
        public isPremium: boolean,
        public seatRow: number,
        public seatNr: number
      ) {
        if (seatRow < 0 || seatNr < 0) {
            throw new Error("Seat row and seat number must be non-negative");
          }
      }
    
    public isPremiumTicket(): boolean {
        return this.isPremium;
    }
    
    public getPrice(isStudentOrder: boolean): number {
        return this.screening.getPricePerSeat() + (this.isPremium ? (isStudentOrder ? 2 : 3) : 0);
    }
    
    public toString(): string {
        return `${this.screening.toString()} - Stoel: Rij ${this.seatRow}, Nr ${this.seatNr} ${this.isPremium ? "(Premium)" : ""}`;
    }
}
