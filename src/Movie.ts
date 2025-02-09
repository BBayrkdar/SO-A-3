import { MovieScreening } from "./MovieScreening";

export class Movie {
    public screenings: MovieScreening[] = [];
    
    constructor(public title: string) {}

    public addScreening(screening: MovieScreening): void {
        this.screenings.push(screening);
    }

    public toString(): string {
        return `Film: ${this.title}`;
      }

}
