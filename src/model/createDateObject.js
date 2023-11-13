import { DATE_CONFIG } from "../constant/dateConstant.js";

class createDateObject {
  // 일요일: 0, 월요일: 1, ..., 토요일: 6
  isSpecialDay(day, dayOfWeek) {
    return dayOfWeek === 0 || day === 25;
  }

  isWeekend(dayOfWeek) {
    return dayOfWeek === 5 || dayOfWeek === 6;
  }

  getDiscountType(day, dayOfWeek) {
    const isWeekend = this.isWeekend(dayOfWeek);
    const isSpecialDay = this.isSpecialDay(day, dayOfWeek);

    return {
      weekdayDiscount: !isWeekend && !isSpecialDay,
      weekendDiscount: isWeekend && !isSpecialDay,
      specialDiscount: isSpecialDay || dayOfWeek === 0,
    };
  }

  getDiscountDays() {
    let discountDays = {};
    for (let day = DATE_CONFIG.START_DAY; day <= DATE_CONFIG.END_DAY; day++) {
      let date = new Date(
        DATE_CONFIG.TARGET_YEAR,
        DATE_CONFIG.TARGET_MONTH - 1, // 0부터 시작하는데 constant에서 +1한 값을 저장함.
        day
      );
      let dayOfWeek = date.getDay();
      discountDays[day] = this.getDiscountType(day, dayOfWeek);
    }
    return discountDays;
  }
}
export default createDateObject;
