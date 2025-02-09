import { MovieTicket } from "./MovieTicket";
import { TicketExportFormat } from "./TicketExportFormat";

export class Order {
  private tickets: MovieTicket[] = [];

  constructor(private orderNr: number, private isStudentOrder: boolean) {}

  public getOrderNr(): number {
    return this.orderNr;
  }

  public addSeatReservation(ticket: MovieTicket): void {
    this.tickets.push(ticket);
  }

  public calculatePrice(): number {
    let total = 0;
    let ticketCount = this.tickets.length;

    this.tickets.forEach((ticket, index) => {
      let price = ticket.getPrice(this.isStudentOrder);

      if (this.isStudentOrder || ticket.screening.dateAndTime.getDay() < 5) {
        if (index % 2 !== 0) price = 0; // Elke 2e ticket gratis
      } else {
        if (ticketCount >= 6) {
          price *= 0.9; // 10% korting bij 6+ tickets
        }
      }

      total += price;
    });

    return total;
  }

  public export(exportFormat: TicketExportFormat): string {
    if (exportFormat === TicketExportFormat.JSON) {
      return JSON.stringify(
        {
          orderNr: this.orderNr,
          tickets: this.tickets.map((t) => ({
            movie: t.screening.movie.title,
            date: t.screening.dateAndTime.toLocaleString(),
            price: t.getPrice(),
            seatRow: t.seatRow,
            seatNr: t.seatNr,
            premium: t.isPremium,
          })),
          studentOrder: this.isStudentOrder,
        },
        null,
        2
      );
    } else {
      return `Bestelling #${this.orderNr}:\n` + 
        this.tickets.map((t) => t.toString()).join("\n");
    }
  }
}
