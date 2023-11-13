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
}
export default EventDomain;
