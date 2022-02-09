import { SystemManager } from "./manager.js";
import { SplittermondActionHandler as ActionHandler } from "../actions/splittermond/splittermond-actions.js";
import { SplittermondBaseRollHandler as Core } from "../rollHandlers/splittermond/splittermond-base.js";
import * as settings from "../settings/splittermond-settings.js";

export class SplittermondSystemManager extends SystemManager {
  constructor(appName) {
    super(appName);
    console.log("SplittermondSystemManager");
  }

  /** @override */
  doGetActionHandler(filterManager, categoryManager) {
    let actionHandler = new ActionHandler(filterManager, categoryManager);
    return actionHandler;
  }

  /** @override */
  getAvailableRollHandlers() {
    let choices = { core: "Splittermond" };

    return choices;
  }

  /** @override */
  doGetRollHandler(handlerId) {
    return new Core();
  }

  /** @override */
  doRegisterSettings(appName, updateFunc) {
    settings.register(appName, updateFunc);
  }
}
