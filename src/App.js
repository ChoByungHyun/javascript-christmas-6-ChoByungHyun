import Contorller from "./controller/Controller.js";

class App {
  constructor() {
    this.controller = new Contorller();
  }
  async run() {
    await this.controller.run();
  }
}

export default App;
