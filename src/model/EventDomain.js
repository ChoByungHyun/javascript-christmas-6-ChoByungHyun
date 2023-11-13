import { MENU } from "../constant/menuConstant.js";

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

    totalDiscountAmount += this.calculateChristmasDDayDiscount(visitDate);

    for (let item in orderMenu) {
      const price = this.getPrice(item);
      const quantity = orderMenu[item];

      if (discountType.weekdayDiscount && this.isDessert(item)) {
        totalDiscountAmount += quantity * 2023; // 평일 할인액 2,023원 (디저트 메뉴)
      } else if (discountType.weekendDiscount && this.isMain(item)) {
        totalDiscountAmount += quantity * 2023; // 주말 할인액 2,023원 (메인 메뉴)
      }
    }

    if (discountType.specialDiscount) {
      totalDiscountAmount += 1000; // 특별 할인액 1,000원
    }

    return totalDiscountAmount;
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
}
export default EventDomain;
