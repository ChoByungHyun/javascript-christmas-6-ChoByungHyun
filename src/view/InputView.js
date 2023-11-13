import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGE } from "../constant/messageConstant";
const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.DATE);
    return input;
  },

  async readMenu() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.ORDER);
    return input;
  },
};
export default InputView;
