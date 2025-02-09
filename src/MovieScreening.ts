import { Movie } from "./Movie";

export class MovieScreening {

    constructor(public movie: Movie, public dateAndTime: Date, public pricePerSeat: number) {
        this.movie = movie;
        this.dateAndTime = dateAndTime;
        this.pricePerSeat = pricePerSeat;
    }

    public getPricePerSeat(): number {
        return this.pricePerSeat;
    }
    
    public toString(): string {
        return `${this.movie.toString()} op ${this.dateAndTime.toLocaleString()} - Prijs per stoel: €${this.pricePerSeat}`;
    }
}