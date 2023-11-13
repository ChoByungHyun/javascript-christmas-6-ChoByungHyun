import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGE } from "../constant/messageConstant.js";
const OutputView = {
  printWelcomeMessage() {
    Console.print(OUTPUT_MESSAGE.WELCOME);
  },
  printOrderMessage() {
    Console.print(OUTPUT_MESSAGE.ORDER);
  },
  printMenu(menu) {
    Console.print(OUTPUT_MESSAGE.MENU);
    for (let item in menu) {
      Console.print(`${item} ${menu[item]}개`);
    }
  },
  printTotalPriceBeforeDiscount(totalPriceBeforeDiscount) {
    Console.print(
      `${OUTPUT_MESSAGE.BEFORE_DISCOUNT}\n${totalPriceBeforeDiscount}원`
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
    if (!discountDetails) {
      Console.print(OUTPUT_MESSAGE.NOTHING);
      return;
    }
    for (let discountType in discountDetails) {
      Console.print(`${discountType}: ${discountDetails[discountType]}원`);
    }
  },

  printTotalDiscountAmount(totalDiscountAmount) {
    Console.print(
      `${OUTPUT_MESSAGE.TOTAL_DISCOUNT}\n${
        totalDiscountAmount ? totalDiscountAmount : OUTPUT_MESSAGE.NOTHING
      }원`
    );
  },

  printTotalPriceAfterDiscount(totalPriceAfterDiscount) {
    Console.print(
      `${OUTPUT_MESSAGE.AFTER_DISCOUNT}\n${totalPriceAfterDiscount}원`
    );
  },

  printBadge(badge) {
    Console.print(
      `${OUTPUT_MESSAGE.BADGE}\n${badge ? badge : OUTPUT_MESSAGE.NOTHING}`
    );
  },
};
export default OutputView;
