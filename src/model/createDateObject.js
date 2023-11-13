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
    if (dayOfWeek === 0) {
      // 일요일
      return {
        weekdayDiscount: true,
        weekendDiscount: false,
        specialDiscount: true,
      };
    } else if (this.isSpecialDay(day, dayOfWeek)) {
      return {
        weekdayDiscount: false,
        weekendDiscount: false,
        specialDiscount: true,
      };
    } else if (this.isWeekend(dayOfWeek)) {
      return {
        weekdayDiscount: false,
        weekendDiscount: true,
        specialDiscount: false,
      };
    } else {
      return {
        weekdayDiscount: true,
        weekendDiscount: false,
        specialDiscount: false,
      };
    }
  }
  getDiscountDays() {
    let discountDays = {};
    for (let day = DATE_CONFIG.START_DAY; day <= DATE_CONFIG.END_DAY; day++) {
      let date = new Date(
        DATE_CONFIG.TARGET_YEAR,
        DATE_CONFIG.TARGET_MONTH - 1,
        day
      );
      let dayOfWeek = date.getDay();
      discountDays[day] = this.getDiscountType(day, dayOfWeek);
    }
    return discountDays;
  }
}
export default createDateObject;
