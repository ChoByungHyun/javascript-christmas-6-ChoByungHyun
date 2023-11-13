import { MENU } from "../src/constant/menuConstant";
import EventDomain from "../src/model/EventDomain";

describe("EventDomain", () => {
  let domain;

  beforeEach(() => {
    domain = new EventDomain();
  });

  describe("parseOrderMenu", () => {
    test("should parse order menu string into an object", () => {
      const orderMenuString = "해산물파스타-2, 레드와인-1, 초코케이크-1";
      const expected = { 해산물파스타: 2, 레드와인: 1, 초코케이크: 1 };
      const result = domain.parseOrderMenu(orderMenuString);
      expect(result).toEqual(expected);
    });
  });

  describe("calculateChristmasDDayDiscount", () => {
    test("should calculate Christmas D-Day discount", () => {
      const visitDate = 10;
      const expected = 1900;
      const result = domain.calculateChristmasDDayDiscount(visitDate);
      expect(result).toBe(expected);
    });
  });

  describe("getPrice", () => {
    test("should get the price of a menu item", () => {
      const itemName = "해산물파스타";
      const expected = MENU.MAIN[itemName];
      const result = domain.getPrice(itemName);
      expect(result).toBe(expected);
    });

    test("should return 0 for a non-existing menu item", () => {
      const itemName = "NonExistingItem";
      const expected = 0;
      const result = domain.getPrice(itemName);
      expect(result).toBe(expected);
    });
  });

  describe("calculateTotalPrice", () => {
    test("should calculate total price for an order menu", () => {
      const orderMenu = { 해산물파스타: 2, 레드와인: 1, 초코케이크: 1 };
      const expected =
        MENU.MAIN["해산물파스타"] * 2 +
        MENU.DRINK["레드와인"] +
        MENU.DESSERT["초코케이크"];
      const result = domain.calculateTotalPrice(orderMenu);
      expect(result).toBe(expected);
    });
  });
});
