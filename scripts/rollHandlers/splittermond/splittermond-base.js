import { RollHandler } from "../rollHandler.js";

export class SplittermondBaseRollHandler extends RollHandler {
  constructor() {
    super();
  }

  /** @override */
  doHandleActionEvent(event, encodedValue) {
    let payload = encodedValue.split("|");
    let tokenId = payload[0];
    let actor = super.getActor(tokenId);

    switch (payload[1]) {
      case "skill":
        actor.rollSkill(payload[2]);
        break;
      case "attack":
        actor.rollAttack(payload[2]);
        break;
      default:
        break;
    }
  }
}
