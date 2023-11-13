export function formatCurrency(num) {
  // 금액 콤마(,) 넣는 함수
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
