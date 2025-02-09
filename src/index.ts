import { Movie } from "./Movie";
import { MovieScreening } from "./MovieScreening";
import { MovieTicket } from "./MovieTicket";
import { Order } from "./Order";
import { TicketExportFormat } from "./TicketExportFormat";

// 🎬 Films aanmaken
const dune = new Movie("Dune");
const oppenheimer = new Movie("Oppenheimer");
const interstellar = new Movie("Interstellar");
const inception = new Movie("Inception");

// 🎥 Filmvoorstellingen aanmaken
const screeningDuneWeekday = new MovieScreening(dune, new Date(2025, 1, 8, 20, 0), 10); // Woensdag
const screeningOppenheimerWeekend = new MovieScreening(oppenheimer, new Date(2025, 1, 10, 21, 0), 12); // Vrijdag
const screeningInterstellarWeekday = new MovieScreening(interstellar, new Date(2025, 1, 6, 19, 0), 11); // Maandag
const screeningInceptionWeekend = new MovieScreening(inception, new Date(2025, 1, 9, 22, 30), 14); // Donderdag

// Films koppelen aan voorstellingen
dune.addScreening(screeningDuneWeekday);
oppenheimer.addScreening(screeningOppenheimerWeekend);
interstellar.addScreening(screeningInterstellarWeekday);
inception.addScreening(screeningInceptionWeekend);

// 🎟️ Tickets aanmaken (met verschillende premium- en gewone zitplaatsen)
const ticket1 = new MovieTicket(screeningDuneWeekday, false, 5, 12);
const ticket2 = new MovieTicket(screeningDuneWeekday, true, 5, 13);
const ticket3 = new MovieTicket(screeningOppenheimerWeekend, false, 6, 8);
const ticket4 = new MovieTicket(screeningOppenheimerWeekend, false, 6, 9);
const ticket5 = new MovieTicket(screeningInterstellarWeekday, true, 7, 15);
const ticket6 = new MovieTicket(screeningInterstellarWeekday, false, 7, 16);
const ticket7 = new MovieTicket(screeningInceptionWeekend, true, 8, 3);
const ticket8 = new MovieTicket(screeningInceptionWeekend, false, 8, 4);

// 🛒 Bestellingen aanmaken
const studentOrder = new Order(1, true); // Studentenkorting
studentOrder.addSeatReservation(ticket1);
studentOrder.addSeatReservation(ticket2);
studentOrder.addSeatReservation(ticket5);
studentOrder.addSeatReservation(ticket6);

const regularOrder = new Order(2, false); // Geen studentenkorting
regularOrder.addSeatReservation(ticket3);
regularOrder.addSeatReservation(ticket4);
regularOrder.addSeatReservation(ticket7);
regularOrder.addSeatReservation(ticket8);

// 📌 Uitvoer tonen
console.log("🎟️ Totaalprijs Student Order: €", studentOrder.calculatePrice());
console.log("\n📝 Export Student Order (JSON):\n", studentOrder.export(TicketExportFormat.JSON));
console.log("\n📄 Export Student Order (Text):\n", studentOrder.export(TicketExportFormat.PLAINTEXT));

console.log("\n====================================\n");

console.log("🎟️ Totaalprijs Regular Order: €", regularOrder.calculatePrice());
console.log("\n📝 Export Regular Order (JSON):\n", regularOrder.export(TicketExportFormat.JSON));
console.log("\n📄 Export Regular Order (Text):\n", regularOrder.export(TicketExportFormat.PLAINTEXT));
