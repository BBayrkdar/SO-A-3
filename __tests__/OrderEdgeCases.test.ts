import { Movie } from "../src/Movie";
import { MovieScreening } from "../src/MovieScreening";
import { MovieTicket } from "../src/MovieTicket";
import { Order } from"../src/Order";
import { TicketExportFormat } from "../src/TicketExportFormat";

describe("Order Edge Cases & Invalid Input Handling", () => {
  let punisher: Movie;
  let screeningPunisher: MovieScreening;

  beforeEach(() => {
    punisher = new Movie("The Punisher");
    screeningPunisher = new MovieScreening(punisher, new Date(2025, 1, 8, 20, 0), 10);
    punisher.addScreening(screeningPunisher);
  });

  test("Creating an order with no tickets should result in zero price", () => {
    const order = new Order(1, false);
    expect(order.calculatePrice()).toBe(0);
  });

  test("Adding a null ticket should throw an error", () => {
    const order = new Order(2, false);
    expect(() => order.addSeatReservation(null as any)).toThrow();
  });

  test("Adding a ticket with a negative seat number should throw an error", () => {
    expect(() => new MovieTicket(screeningPunisher, false, 5, -1)).toThrow();
  });

  test("Adding a ticket with a negative row number should throw an error", () => {
    expect(() => new MovieTicket(screeningPunisher, false, -5, 1)).toThrow();
  });

  test("Group discount should not apply to orders with fewer than 6 tickets", () => {
    const order = new Order(3, false);
    for (let i = 0; i < 5; i++) {
      order.addSeatReservation(new MovieTicket(screeningPunisher, false, 5, i + 1));
    }
    expect(order.calculatePrice()).toBe(50);
  });

  test("Group discount applies correctly to orders with exactly 6 tickets", () => {
    const order = new Order(4, false);
    for (let i = 0; i < 6; i++) {
      order.addSeatReservation(new MovieTicket(screeningPunisher, false, 5, i + 1));
    }
    expect(order.calculatePrice()).toBeCloseTo(54); // 10% discount on 60
  });

  test("Premium seat surcharge should be correctly calculated", () => {
    const order = new Order(5, false);
    order.addSeatReservation(new MovieTicket(screeningPunisher, true, 5, 12));
    expect(order.calculatePrice()).toBe(13);
  });

  test("Student discount applies correctly even when premium tickets are included", () => {
    const order = new Order(6, true);
    order.addSeatReservation(new MovieTicket(screeningPunisher, false, 5, 12));
    order.addSeatReservation(new MovieTicket(screeningPunisher, true, 5, 13));
    expect(order.calculatePrice()).toBe(10); // 2nd ticket (premium) is free
  });

  test("Order number should be retrievable", () => {
    const order = new Order(7, false);
    expect(order.getOrderNr()).toBe(7);
  });

  test("Exporting an empty order should return a valid structure", () => {
    const order = new Order(8, false);
    expect(order.export(TicketExportFormat.JSON)).toContain('"tickets": []');
  });

  test("Invalid export format should throw an error", () => {
    const order = new Order(9, false);
    expect(() => order.export("INVALID_FORMAT" as any)).toThrow();
  });
});
