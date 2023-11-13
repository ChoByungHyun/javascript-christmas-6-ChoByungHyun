import { MENU } from "../constant/menuConstant.js";
import { DISCOUNT_MESSAGE } from "../constant/messageConstant.js";

class EventDomain {
  parseOrderMenu(orderMenuString) {
    const menuItems = orderMenuString.split(",");
    const menu = {};
    for (let item of menuItems) {
      const [name, quantity] = item.split("-");
      menu[name.trim()] = parseInt(quantity);
    }
    return menu;
  }

  calculateChristmasDDayDiscount(visitDate) {
    if (visitDate < 1 || visitDate > 25) {
      return 0;
    }
    return 1000 + (visitDate - 1) * 100;
  }

  calculateDiscount(eventCalendar, visitDate, orderMenu) {
    const discountType = eventCalendar[visitDate];
    let totalDiscountAmount = 0;
    let discountDetails = {};

    const christmasDiscount = this.calculateChristmasDDayDiscount(visitDate);
    totalDiscountAmount += christmasDiscount;
    discountDetails[DISCOUNT_MESSAGE.D_DAY] = -christmasDiscount;

    for (let item in orderMenu) {
      const price = this.getPrice(item);
      const quantity = orderMenu[item];

      if (discountType.weekdayDiscount && this.isDessert(item)) {
        const weekdayDiscount = quantity * 2023; // 평일 할인액 2,023원 (디저트 메뉴)
        totalDiscountAmount += weekdayDiscount;
        discountDetails[DISCOUNT_MESSAGE.WEEK] = -weekdayDiscount;
      } else if (discountType.weekendDiscount && this.isMain(item)) {
        const weekendDiscount = quantity * 2023; // 주말 할인액 2,023원 (메인 메뉴)
        totalDiscountAmount += weekendDiscount;
        discountDetails[DISCOUNT_MESSAGE.WEEKEND] = -weekendDiscount;
      }
    }

    if (discountType.specialDiscount) {
      totalDiscountAmount += 1000; // 특별 할인액 1,000원
      discountDetails[DISCOUNT_MESSAGE.SPECIAL] = -1000;
    }

    return { totalDiscountAmount, discountDetails };
  }

  isDessert(item) {
    return item in MENU["DESSERT"];
  }

  isMain(item) {
    return item in MENU["MAIN"];
  }

  getPrice(itemName) {
    for (let category in MENU) {
      if (itemName in MENU[category]) {
        return MENU[category][itemName];
      }
    }
    return 0; // 메뉴에 없는 아이템인 경우 0 반환
  }

  calculateTotalPrice(orderMenu) {
    let totalPrice = 0;

    for (let item in orderMenu) {
      const price = this.getPrice(item);
      const quantity = orderMenu[item];
      totalPrice += price * quantity;
    }

    return totalPrice;
  }

  isGift(totalPrice) {
    if (totalPrice >= 120000) {
      return true;
    }
    return false;
  }
  getBadge(totalDiscountAmount) {
    totalDiscountAmount = totalDiscountAmount * -1;
    if (totalDiscountAmount >= 20000) {
      return "산타";
    } else if (totalDiscountAmount >= 10000) {
      return "트리";
    } else if (totalDiscountAmount >= 5000) {
      return "별";
    } else {
      return "";
    }
  }
}
export default EventDomain;
