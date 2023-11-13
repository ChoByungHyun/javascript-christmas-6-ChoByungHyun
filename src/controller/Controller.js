import { GIFT } from "../constant/menuConstant.js";
import { DISCOUNT_MESSAGE } from "../constant/messageConstant.js";
import EventDomain from "../model/EventDomain.js";
import createDateObject from "../model/createDateObject.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
class Controller {
  constructor() {
    this.eventModel = new EventDomain();
    this.createDateObject = new createDateObject();
  }

  async run() {
    const eventCalendar = this.createDateObject.getDiscountDays();
    const visitDate = await this.getVisitDate();
    const orderMenu = await this.getMenu();
    const totalPrice = this.eventModel.calculateTotalPrice(orderMenu);
    let { totalDiscountAmount, discountDetails } = this.getTotalDiscountDetail(
      eventCalendar,
      visitDate,
      orderMenu
    );
    const isGift = this.eventModel.isGift(totalPrice);
    const finalPrice = totalPrice + totalDiscountAmount;

    this.printOrderInformation(orderMenu, totalPrice);
    totalDiscountAmount = this.applyGiftDiscount(
      isGift,
      discountDetails,
      totalDiscountAmount
    );
    this.printDiscountDetail(discountDetails);
    const badge = this.eventModel.getBadge(totalDiscountAmount);
    this.printFinalPriceInformation(totalDiscountAmount, finalPrice, badge);
  }

  async getVisitDate() {
    OutputView.printWelcomeMessage();
    return await InputView.readDate();
  }

  printOrderInformation(orderMenu, totalPrice) {
    OutputView.printOrderMessage();
    OutputView.printMenu(orderMenu);
    OutputView.printTotalPriceBeforeDiscount(totalPrice);
  }

  printDiscountDetail(discountDetails) {
    OutputView.printDiscountDetail(discountDetails);
  }

  applyGiftDiscount(isGift, discountDetails, totalDiscountAmount) {
    OutputView.printGift(isGift);
    if (isGift) {
      discountDetails[DISCOUNT_MESSAGE.GIFT] = -GIFT.CHAMPAGNE;
      totalDiscountAmount -= GIFT.CHAMPAGNE;
    }
    return totalDiscountAmount;
  }

  printFinalPriceInformation(totalDiscountAmount, finalPrice, badge) {
    OutputView.printTotalDiscountAmount(totalDiscountAmount);
    OutputView.printTotalPriceAfterDiscount(finalPrice);
    OutputView.printBadge(badge);
  }

  async getMenu() {
    const orderMenuInput = await InputView.readMenu();
    const orderMenu = this.eventModel.parseOrderMenu(orderMenuInput);
    return orderMenu;
  }

  getTotalDiscountDetail(eventCalendar, visitDate, orderMenu) {
    let { totalDiscountAmount, discountDetails } =
      this.eventModel.calculateDiscount(eventCalendar, visitDate, orderMenu);
    return { totalDiscountAmount: -totalDiscountAmount, discountDetails };
  }
}

export default Controller;
