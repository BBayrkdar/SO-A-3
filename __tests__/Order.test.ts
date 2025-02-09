import { Movie } from "../src/Movie";
import { MovieScreening } from "../src/MovieScreening";
import { MovieTicket } from "../src/MovieTicket";
import { Order } from "../src/Order";

describe("Order prijsberekening", () => {
  let punisher: Movie;
  let screeningPunisher: MovieScreening;

  beforeEach(() => {
    punisher = new Movie("The Punisher");
    screeningPunisher = new MovieScreening(punisher, new Date(2025, 1, 8, 20, 0), 10);
    punisher.addScreening(screeningPunisher);
  });

  test("Reguliere prijsberekening zonder korting", () => {
    const order = new Order(1, false);
    order.addSeatReservation(new MovieTicket(screeningPunisher, false, 5, 12));
    order.addSeatReservation(new MovieTicket(screeningPunisher, false, 5, 13));

    expect(order.calculatePrice()).toBe(20);
  });

  test("Studentenkorting - tweede ticket gratis", () => {
    const order = new Order(2, true);
    order.addSeatReservation(new MovieTicket(screeningPunisher, false, 5, 12));
    order.addSeatReservation(new MovieTicket(screeningPunisher, false, 5, 13));

    expect(order.calculatePrice()).toBe(10);
  });

  test("Premium tickets hebben toeslag", () => {
    const order = new Order(3, false);
    order.addSeatReservation(new MovieTicket(screeningPunisher, true, 5, 12));

    expect(order.calculatePrice()).toBe(13);
  });

  test("Groepskorting vanaf 6 tickets", () => {
    const order = new Order(4, false);
    for (let i = 0; i < 6; i++) {
      order.addSeatReservation(new MovieTicket(screeningPunisher, false, 5, i + 1));
    }

    expect(order.calculatePrice()).toBeCloseTo(54); // 10% korting op 60
  });

  test("Studentenkorting werkt correct met premium tickets", () => {
    const order = new Order(5, true);
    order.addSeatReservation(new MovieTicket(screeningPunisher, false, 5, 12));
    order.addSeatReservation(new MovieTicket(screeningPunisher, true, 5, 13));

    expect(order.calculatePrice()).toBe(10); // 2e ticket (premium) is gratis
  });
});
