import { ActionHandler } from "../actionHandler.js";

export class SplittermondActionHandler extends ActionHandler {
  constructor(filterManager, categoriesManager) {
    super(filterManager, categoriesManager);
  }

  /** @override */
  async doBuildActionList(token, multipleTokens) {
    let result = this.initializeEmptyActionList();

    if (!token) return result;

    let tokenId = token.data._id;

    result.tokenId = tokenId;

    let actor = token.actor;

    if (!actor) return result;

    result.actorId = actor.id;

    this._combineCategoryWithList(result, this.i18n("splittermond.skills"), this._getSkills(actor, tokenId));
    this._combineCategoryWithList(result, this.i18n("splittermond.attack"), this._getAttacks(actor, tokenId));
    

    return result;
  }

  _getSkills(actor, tokenId) {
    let skillCategory = this.initializeEmptyCategory("skills");

    let _skillActionHelper = (skill) => {
      let action = this.initializeEmptyAction();
      action.name = this.i18n("splittermond.skillLabel."+skill);
      action.encodedValue = tokenId+"|skill|"+skill;
      return action;
    }

    let generalSkillsCategory = this.initializeEmptySubcategory("generalSkills");
    generalSkillsCategory.actions = CONFIG.splittermond.skillGroups.general.filter(skill => ["acrobatics", "athletics", "determination", "stealth", "perception", "endurance"].includes(skill) 
    || (parseInt(actor.data.data.skills[skill].points) > 0)).map(_skillActionHelper);
    this._combineSubcategoryWithCategory(
      skillCategory,
      this.i18n("splittermond.generalSkills"),
      generalSkillsCategory
    );

    let magicSkillsCategory = this.initializeEmptySubcategory("generalSkills");
    magicSkillsCategory.actions = CONFIG.splittermond.skillGroups.magic.filter(skill => parseInt(actor.data.data.skills[skill].points) > 0).map(_skillActionHelper);
    this._combineSubcategoryWithCategory(
      skillCategory,
      this.i18n("splittermond.magicSkills"),
      magicSkillsCategory
    );

    return skillCategory;
  }

  _getAttacks(actor, tokenId) {
    let attackCategory = this.initializeEmptyCategory("attack");

    let attackSubCategory = this.initializeEmptySubcategory("attack_dummy");
    attackSubCategory.actions = actor.data.data.attacks.map(attack => {
      let action = this.initializeEmptyAction();
      action.name = attack.name;
      action.encodedValue = tokenId+"|attack|"+attack._id;
      return action;
    });
    this._combineSubcategoryWithCategory(
      attackCategory,
      "",
      attackSubCategory
    );


    return attackCategory;
  }

}
