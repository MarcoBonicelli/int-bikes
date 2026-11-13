import { describe, expect, test, beforeEach } from "vitest";
import { Rental } from "../Rental.ts";
import { RentalList } from "../RentalList.ts";

describe("RentalList", () => {
  let list: RentalList;
  let rental: Rental;

  beforeEach(() => {
    list = new RentalList();
    rental = new Rental({
      customer: "Juan Gómez",
      bikeCode: "B-123",
      bikeType: "urban",
      hours: 3,
      pricePerHour: 100,
    });
  });

  test("Create an empty rental list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a rental", () => {
    list.add(rental);
    expect(list.getItems()).toEqual([rental]);
  });

  test("remove a rental by bike code", () => {
    list.add(rental);

    list.remove("B-123");

    expect(list.getItems()).toEqual([]);
  });

  test("throw an error when removing an unknown bike code", () => {
    list.add(rental);

    expect(() => list.remove("B-999")).toThrow(
      "No existe un alquiler para esa bicicleta.",
    );

    expect(list.getItems()).toEqual([rental]);
  });

  test("reject a bike that is already rented", () => {
    list.add(rental);
    expect(() => list.add(rental)).toThrow();
  });

  test("filter rentals by type", () => {
    list.add(rental);
    expect(list.getByType("urban")).toEqual([rental]);
    expect(list.getByType("electric")).toEqual([]);
  });

  test("total income", () => {
    list.add(rental);
    expect(list.totalIncome()).toBe(300);
  });

  test("late hours do not change rental cost", () => {
    rental.hoursUsed = 5;

    expect(rental.lateHours).toBe(2);
    expect(rental.cost()).toBe(300);
  });

  test("late fees do not change total income", () => {
    rental.hoursUsed = 5;
    list.add(rental);

    expect(list.totalLateFees()).toBe(400);
    expect(list.totalIncome()).toBe(300);
  });
});
