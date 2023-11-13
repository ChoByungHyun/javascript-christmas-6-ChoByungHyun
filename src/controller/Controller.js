import EventDomain from "../model/EventDomain.js";
import createDateObject from "../model/createDateObject.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class Contorller {
  constructor() {
    this.eventModel = new EventDomain();
    this.createDateObject = new createDateObject();
  }
  async run() {
    const eventCalendar = this.createDateObject.getDiscountDays();
    OutputView.printWelcomeMessage();
    const visitDate = await InputView.readDate();
    const orderMenu = await this.getMenu();

    const totalPrice = this.eventModel.calculateTotalPrice(orderMenu);
    const totalDiscountAmount = this.eventModel.calculateDiscount(
      eventCalendar,
      visitDate,
      orderMenu
    );

    const finalPrice = totalPrice - totalDiscountAmount;

    OutputView.printOrderMessage();
    OutputView.printMenu(orderMenu);
    OutputView.printTotalPriceBeforeDiscount(totalPrice);
    OutputView.printGift();
    OutputView.printDiscountDetail();
    OutputView.printTotalDiscountAmount(totalDiscountAmount);
    OutputView.printTotalPriceAfterDiscount(finalPrice);
    OutputView.printBadge();
  }
  async getMenu() {
    const orderMenuInput = await InputView.readMenu();
    const orderMenu = this.eventModel.parseOrderMenu(orderMenuInput);

    return orderMenu;
  }
}
export default Contorller;
