import { Console } from "@woowacourse/mission-utils";
import { messageConstant } from "../constant/messageConstant";
const OutputView = {
  printWelcomeMessage() {
    Console.print(messageConstant.WELCOME);
  },
  printOrderMessage() {
    Console.print(messageConstant.ORDER);
  },
  printMenu(menu) {
    Console.print(messageConstant.MENU);
    for (let item in menu) {
      Console.print(`${item} ${menu[item]}개`);
    }
  },
  printTotalPriceBeforeDiscount(totalPriceBeforeDiscount) {
    Console.print(
      `${messageConstant.BEFORE_DISCOUNT}\n${totalPriceBeforeDiscount}원`
    );
  },
  printGift(gift) {
    Console.print(`${messageConstant.GIFT}\n${gift}`);
  },

  printDiscountDetail(discountDetail) {
    Console.print(`${messageConstant.DISCOUNT_DETAIL}\n${discountDetail}`);
  },

  printTotalDiscountAmount(totalDiscountAmount) {
    Console.print(
      `${messageConstant.TOTAL_DISCOUNT}\n${totalDiscountAmount}원`
    );
  },

  printTotalPriceAfterDiscount(totalPriceAfterDiscount) {
    Console.print(
      `${messageConstant.AFTER_DISCOUNT}\n${totalPriceAfterDiscount}원`
    );
  },

  printBadge(badge) {
    Console.print(`${messageConstant.BADGE}\n${badge}`);
  },
};
export default OutputView;
