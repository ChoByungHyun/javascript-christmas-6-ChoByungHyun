import { MENU } from "../src/constant/menuConstant";
import EventDomain from "../src/model/EventDomain";

describe("EventDomain Class", () => {
  let eventDomain;

  beforeEach(() => {
    eventDomain = new EventDomain();
  });

  // 이미 작성한 테스트 코드...

  it("should calculate total price correctly", () => {
    const orderMenu = {
      해산물파스타: 2,
      레드와인: 1,
      초코케이크: 1,
    };

    const expectedResult = 145000;

    expect(eventDomain.calculateTotalPrice(orderMenu)).toBe(expectedResult);
  });
  it("should calculate Christmas DDay discount correctly", () => {
    expect(eventDomain.calculateChristmasDDayDiscount(2)).toBe(1100);
    expect(eventDomain.calculateChristmasDDayDiscount(26)).toBe(0);
  });

  it("should check if total price is eligible for a gift correctly", () => {
    expect(eventDomain.isGift(120000)).toBe(true);
    expect(eventDomain.isGift(119999)).toBe(false);
  });

  it("should get correct badge based on total discount amount", () => {
    expect(eventDomain.getBadge(-20000)).toBe("산타");
    expect(eventDomain.getBadge(-10000)).toBe("트리");
    expect(eventDomain.getBadge(-5000)).toBe("별");
    expect(eventDomain.getBadge(-4999)).toBe("");
  });
});

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

  // Similarly, you can add tests for other methods in the EventDomain class
  // ...

  describe("getPrice", () => {
    test("should get the price of a menu item", () => {
      const itemName = "해산물파스타";
      const expected = MENU.MAIN[itemName];
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
