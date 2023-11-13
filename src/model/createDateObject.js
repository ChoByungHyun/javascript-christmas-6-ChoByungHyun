class createDateObject {
  isSpecialDay(day, dayOfWeek) {
    return dayOfWeek === 0 || day === 25;
  }

  isWeekend(dayOfWeek) {
    return dayOfWeek === 5 || dayOfWeek === 6;
  }

  getDiscountType(day, dayOfWeek) {
    if (isSpecialDay(day, dayOfWeek)) {
      return {
        weekdayDiscount: false,
        weekendDiscount: false,
        specialDiscount: true,
      };
    } else if (isWeekend(dayOfWeek)) {
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
    for (let day = 1; day <= 31; day++) {
      let date = new Date(2023, 11, day);
      let dayOfWeek = date.getDay();
      discountDays[day] = getDiscountType(day, dayOfWeek);
    }
    return discountDays;
  }
}
export default createDateObject;
