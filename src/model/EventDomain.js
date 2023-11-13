import { DATE_CONFIG } from "../constant/dateConstant.js";
import { DISCOUNT_CONFIG } from "../constant/discountConstant.js";
import { BADGE, MENU, MENU_TYPE } from "../constant/menuConstant.js";
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
    if (
      visitDate < DATE_CONFIG.D_DAY_START ||
      visitDate > DATE_CONFIG.D_DAY_END
    ) {
      return 0;
    }
    return (
      DISCOUNT_CONFIG.BASE_DAY_ACCOUNT +
      (visitDate - 1) * DISCOUNT_CONFIG.TERM_DAY_ACCOUNT
    );
  }

  calculateDiscount(eventCalendar, visitDate, orderMenu) {
    const discountType = eventCalendar[visitDate];
    let totalDiscountAmount = 0;
    let discountDetails = {};
    const totalPrice = this.calculateTotalPrice(orderMenu);

    if (totalPrice >= DISCOUNT_CONFIG.MIN_AMOUNT) {
      totalDiscountAmount += this.calculateChristmasDiscount(
        visitDate,
        discountDetails
      );
      totalDiscountAmount += this.calculateMenuDiscount(
        discountType,
        orderMenu,
        discountDetails
      );
      totalDiscountAmount += this.calculateSpecialDiscount(
        discountType,
        discountDetails
      );
    }

    return { totalDiscountAmount, discountDetails };
  }
  calculateChristmasDiscount(visitDate, discountDetails) {
    const christmasDiscount = this.calculateChristmasDDayDiscount(visitDate);
    if (christmasDiscount !== 0) {
      discountDetails[DISCOUNT_MESSAGE.D_DAY] = -christmasDiscount;
    }
    return christmasDiscount;
  }

  calculateMenuDiscount(discountType, orderMenu, discountDetails) {
    let menuDiscount = 0;

    for (let item in orderMenu) {
      const quantity = orderMenu[item];

      if (discountType.weekdayDiscount && this.isDessert(item)) {
        const weekdayDiscount = quantity * DISCOUNT_CONFIG.DAY_DISCOUNT;
        menuDiscount += weekdayDiscount;
        discountDetails[DISCOUNT_MESSAGE.WEEK] = -weekdayDiscount;
      } else if (discountType.weekendDiscount && this.isMain(item)) {
        const weekendDiscount = quantity * DISCOUNT_CONFIG.DAY_DISCOUNT;
        menuDiscount += weekendDiscount;
        discountDetails[DISCOUNT_MESSAGE.WEEKEND] = -weekendDiscount;
      }
    }

    return menuDiscount;
  }

  calculateSpecialDiscount(discountType, discountDetails) {
    if (discountType.specialDiscount) {
      discountDetails[DISCOUNT_MESSAGE.SPECIAL] =
        -DISCOUNT_CONFIG.SPECIAL_DISCOUNT;
      return DISCOUNT_CONFIG.SPECIAL_DISCOUNT;
    }
    return 0;
  }

  isDessert(item) {
    return item in MENU[MENU_TYPE.DESSERT];
  }

  isMain(item) {
    return item in MENU[MENU_TYPE.MAIN];
  }

  getPrice(itemName) {
    for (let category in MENU) {
      if (itemName in MENU[category]) {
        return MENU[category][itemName];
      }
    }
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
    if (totalPrice >= DISCOUNT_CONFIG.GIFT_AMOUNT) {
      return true;
    }
    return false;
  }
  getBadge(totalDiscountAmount) {
    totalDiscountAmount = totalDiscountAmount * -1;
    if (totalDiscountAmount >= BADGE.GOLD_AMOUNT) {
      return BADGE.GOLD;
    } else if (totalDiscountAmount >= BADGE.SILVER_AMOUNT) {
      return BADGE.SILVER;
    } else if (totalDiscountAmount >= BADGE.BRONZE_AMOUNT) {
      return BADGE.BRONZE;
    } else {
      return "";
    }
  }
}
export default EventDomain;
