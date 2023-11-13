import { Console } from "@woowacourse/mission-utils";
import { ERROR_MESSAGE, OUTPUT_MESSAGE } from "../constant/messageConstant.js";
import { formatCurrency } from "../util/formatCurrency.js";
const OutputView = {
  printWelcomeMessage() {
    Console.print(OUTPUT_MESSAGE.WELCOME);
  },
  printOrderMessage(date) {
    Console.print(`12월 ${date}${OUTPUT_MESSAGE.ORDER}`);
  },
  printMenu(menu) {
    Console.print(OUTPUT_MESSAGE.MENU);
    for (let item in menu) {
      Console.print(`${item} ${menu[item]}개`);
    }
  },
  printTotalPriceBeforeDiscount(totalPriceBeforeDiscount) {
    Console.print(
      `${OUTPUT_MESSAGE.BEFORE_DISCOUNT}\n${formatCurrency(
        totalPriceBeforeDiscount
      )}원`
    );
  },
  printGift(gift) {
    Console.print(
      `${OUTPUT_MESSAGE.GIFT_MENU}\n${
        gift ? OUTPUT_MESSAGE.GIFT : OUTPUT_MESSAGE.NOTHING
      }`
    );
  },

  printDiscountDetail(discountDetails) {
    Console.print(OUTPUT_MESSAGE.DISCOUNT_DETAIL);
    if (!discountDetails || Object.keys(discountDetails).length === 0) {
      Console.print(OUTPUT_MESSAGE.NOTHING);
      return;
    }
    for (let discountType in discountDetails) {
      Console.print(
        `${discountType}: ${formatCurrency(discountDetails[discountType])}원`
      );
    }
  },

  printTotalDiscountAmount(totalDiscountAmount) {
    Console.print(
      `${OUTPUT_MESSAGE.TOTAL_DISCOUNT}\n${
        totalDiscountAmount && formatCurrency(totalDiscountAmount)
      }원`
    );
  },

  printTotalPriceAfterDiscount(totalPriceAfterDiscount) {
    Console.print(
      `${OUTPUT_MESSAGE.AFTER_DISCOUNT}\n${formatCurrency(
        totalPriceAfterDiscount
      )}원`
    );
  },

  printBadge(badge) {
    Console.print(
      `${OUTPUT_MESSAGE.BADGE}\n${badge ? badge : OUTPUT_MESSAGE.NOTHING}`
    );
  },
  printError(error) {
    Console.print(error);
  },
  printDateError() {
    Console.print(ERROR_MESSAGE.DATE_TYPE);
  },
  printMenuError() {
    Console.print(ERROR_MESSAGE.MENU_TYPE);
  },
};
export default OutputView;
