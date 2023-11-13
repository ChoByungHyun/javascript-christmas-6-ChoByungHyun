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
    Console.print(`${OUTPUT_MESSAGE.GIFT}\n${gift}`);
  },

  printDiscountDetail(discountDetail) {
    Console.print(`${OUTPUT_MESSAGE.DISCOUNT_DETAIL}\n${discountDetail}`);
  },

  printTotalDiscountAmount(totalDiscountAmount) {
    Console.print(`${OUTPUT_MESSAGE.TOTAL_DISCOUNT}\n${totalDiscountAmount}원`);
  },

  printTotalPriceAfterDiscount(totalPriceAfterDiscount) {
    Console.print(
      `${OUTPUT_MESSAGE.AFTER_DISCOUNT}\n${totalPriceAfterDiscount}원`
    );
  },

  printBadge(badge) {
    Console.print(`${OUTPUT_MESSAGE.BADGE}\n${badge}`);
  },
};
export default OutputView;
