import { describe, expect, test, beforeEach } from "vitest";
import { Rental } from "../Rental.ts";
import type { BikeType } from "../Rental.ts";

describe("Rental", () => {
  let rental: Rental;

  beforeEach(() => {
    rental = new Rental({
      customer: "Juan Gómez",
      bikeCode: "B-123",
      bikeType: "urban",
      hours: 3,
      pricePerHour: 100,
    });
  });

  test("store customer", () => {
    expect(rental.customer).toBe("Juan Gómez");
  });

  test("store bike code", () => {
    expect(rental.bikeCode).toBe("B-123");
  });

  test("store bike type", () => {
    expect(rental.bikeType).toBe("urban");
  });

  test("store hours", () => {
    expect(rental.hours).toBe(3);
  });

  test("store price per hour", () => {
    expect(rental.pricePerHour).toBe(100);
  });

  test("calculate cost", () => {
    expect(rental.cost()).toBe(300);
  });

  test("reject an empty customer", () => {
    expect(() => (rental.customer = "  ")).toThrow();
  });

  test("reject a bike code with a wrong format", () => {
    expect(() => (rental.bikeCode = "123")).toThrow();
  });

  test("reject more than 24 hours", () => {
    expect(() => (rental.hours = 25)).toThrow();
  });

  test("reject an invalid bike type", () => {
    expect(() => (rental.bikeType = "scooter" as BikeType)).toThrow();
  });

  test("reject hours that are not an integer", () => {
    expect(() => (rental.hours = 1.5)).toThrow();
  });

  test("reject less than 1 hour", () => {
    expect(() => (rental.hours = 0)).toThrow();
  });

  test("reject a price of zero", () => {
    expect(() => (rental.pricePerHour = 0)).toThrow();
  });

  test("reject a price that is not a number", () => {
    expect(() => (rental.pricePerHour = Number.NaN)).toThrow();
  });

  test("show the rental as text", () => {
    expect(rental.toString()).toBe("B-123 (Urbana) - Juan Gómez - 3 h - $300");
  });

  test("omit late hours from text when used within the rental time", () => {
    rental.hoursUsed = 2;

    expect(rental.toString()).toBe("B-123 (Urbana) - Juan Gómez - 3 h - $300");
  });

  test("show late hours in text when overdue", () => {
    rental.hoursUsed = 5;

    expect(rental.toString()).toBe(
      "B-123 (Urbana) - Juan Gómez - 3 h - $300 - Atraso: 2 h",
    );
  });

  test("bicycle hours used", () => {
    rental.hoursUsed = 5;

    expect(rental.hoursUsed).toBe(5);
  });

  test("calculate late hours", () => {
    rental.hoursUsed = 5; // Reservó 3 horas

    expect(rental.lateHours).toBe(2);
  });

  test("return zero late hours when used within the rental time", () => {
    rental.hoursUsed = 2;

    expect(rental.lateHours).toBe(0);
  });

  test("reject negative hours used", () => {
    expect(() => (rental.hoursUsed = -1)).toThrow(
      "Las horas usadas deben ser un entero mayor o igual a 0.",
    );
  });

  test("reject fractional hours used", () => {
    expect(() => (rental.hoursUsed = 1.5)).toThrow(
      "Las horas usadas deben ser un entero mayor o igual a 0.",
    );
  });
});
