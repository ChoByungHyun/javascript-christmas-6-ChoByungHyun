import { DATE_CONFIG } from "../constant/dateConstant.js";
import { MENU, MENU_CONFIG } from "../constant/menuConstant.js";
import { ERROR_MESSAGE } from "../constant/messageConstant.js";

class Validator {
  isValidDate(date) {
    const numDate = Number(date);

    if (!(numDate >= DATE_CONFIG.START_DAY && numDate <= DATE_CONFIG.END_DAY)) {
      throw ERROR_MESSAGE.DATE_TYPE;
    }

    return true;
  }
  isValidMenu(orderMenu) {
    this.checkIfMenuExists(orderMenu);
    this.checkIfMenuItemsAreValid(orderMenu);
    this.checkIfMenuCountIsValid(orderMenu);
    return true;
  }

  checkIfMenuExists(orderMenu) {
    if (!orderMenu) {
      throw ERROR_MESSAGE.MENU_TYPE;
    }
  }

  checkIfMenuItemsAreValid(orderMenu) {
    const availableMenuItems = Object.values(MENU).flatMap((category) =>
      Object.keys(category)
    );
    const menuItems = Object.keys(orderMenu);
    let drinkCount = 0;
    let totalCount = 0;
    // 중복 메뉴를 입력한 경우
    if (menuItems.length !== new Set(menuItems).size) {
      throw ERROR_MESSAGE.MENU_TYPE;
    }

    for (let item in orderMenu) {
      // 메뉴판에 없는 메뉴를 입력하는 경우
      if (!availableMenuItems.includes(item)) {
        throw ERROR_MESSAGE.MENU_TYPE;
      }

      // 메뉴의 개수가 1 이상의 숫자가 아닌 경우
      if (!Number.isInteger(orderMenu[item]) || orderMenu[item] < 1) {
        throw ERROR_MESSAGE.MENU_TYPE;
      }

      // 음료 메뉴 체크
      if (item in MENU["DRINK"]) {
        drinkCount += orderMenu[item];
      }
      totalCount += orderMenu[item];
    }

    // 주문 메뉴가 음료로만 구성되어 있는 경우
    if (drinkCount === totalCount) {
      throw ERROR_MESSAGE.MENU_DRINK;
    }
  }

  checkIfMenuCountIsValid(orderMenu) {
    const totalCount = Object.values(orderMenu).reduce(
      (acc, cur) => acc + cur,
      0
    );
    // 메뉴의 개수가 20개를 넘는 경우
    if (totalCount > MENU_CONFIG.MAX_MENU_COUNT) {
      throw ERROR_MESSAGE.MENU_COUNT;
    }
  }
}

export default Validator;
