import { Movie } from "./Movie";

export class MovieScreening {

    constructor(public movie: Movie, public dateAndTime: Date, public pricePerSeat: number) {
        if (pricePerSeat < 0) {
            throw new Error("Price per seat cannot be negative");
          }
    }

    public getPricePerSeat(): number {
        return this.pricePerSeat;
    }
    
    public toString(): string {
        return `${this.movie.toString()} op ${this.dateAndTime.toLocaleString()} - Prijs per stoel: €${this.pricePerSeat}`;
    }
}