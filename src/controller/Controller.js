import { MENU } from "../constant/menuConstant.js";
import { DISCOUNT_MESSAGE } from "../constant/messageConstant.js";
import EventDomain from "../model/EventDomain.js";
import Validator from "../model/Validator.js";
import createDateObject from "../model/createDateObject.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
class Controller {
  constructor() {
    this.eventModel = new EventDomain();
    this.createDateObject = new createDateObject();
    this.validator = new Validator();
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

    this.printOrderInformation(orderMenu, totalPrice, visitDate);
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
    let visitDate;
    let isValid = false;

    do {
      try {
        visitDate = await InputView.readDate();
        isValid = this.validator.isValidDate(visitDate);
      } catch (error) {
        OutputView.printError(error);
      }
    } while (!isValid);

    return visitDate;
  }

  async getMenu() {
    let orderMenuInput;
    let orderMenu;
    let isValid = false;

    do {
      try {
        orderMenuInput = await InputView.readMenu();
        orderMenu = this.eventModel.parseOrderMenu(orderMenuInput);

        isValid = this.validator.isValidMenu(orderMenu);
      } catch (error) {
        OutputView.printError(error);
      }
    } while (!isValid);

    return orderMenu;
  }

  printOrderInformation(orderMenu, totalPrice, visitDate) {
    OutputView.printOrderMessage(visitDate);
    OutputView.printMenu(orderMenu);
    OutputView.printTotalPriceBeforeDiscount(totalPrice);
  }

  printDiscountDetail(discountDetails) {
    OutputView.printDiscountDetail(discountDetails);
  }

  applyGiftDiscount(isGift, discountDetails, totalDiscountAmount) {
    OutputView.printGift(isGift);
    if (isGift) {
      discountDetails[DISCOUNT_MESSAGE.GIFT] = -MENU.DRINK.샴페인;
      totalDiscountAmount -= MENU.DRINK.샴페인;
    }
    return totalDiscountAmount;
  }

  printFinalPriceInformation(totalDiscountAmount, finalPrice, badge) {
    OutputView.printTotalDiscountAmount(totalDiscountAmount);
    OutputView.printTotalPriceAfterDiscount(finalPrice);
    OutputView.printBadge(badge);
  }

  getTotalDiscountDetail(eventCalendar, visitDate, orderMenu) {
    let { totalDiscountAmount, discountDetails } =
      this.eventModel.calculateDiscount(eventCalendar, visitDate, orderMenu);
    return { totalDiscountAmount: -totalDiscountAmount, discountDetails };
  }
}

export default Controller;
