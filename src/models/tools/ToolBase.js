export class ToolBase {
	/**
	 *
	 * @param {String} id
	 * @param {String} optionsPanel
	 */
	constructor(id, optionsPanel) {
		/** @type{String} */
		this.id = id;
		/** @type {String} */
		this.optionsPanel = optionsPanel;
		/** @type {Number} Width in centimeters*/
		this.width = 10;
		/** @type {Number} Height in centimeters*/
		this.height = 1;
	}
}
