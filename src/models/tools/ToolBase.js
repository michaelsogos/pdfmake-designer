export class ToolBase {
	/**
	 *
	 * @param {String} id
	 * @param {String} optionsPanel
	 * @param {String} toolType
	 */
	constructor(id, optionsPanel, toolType) {
		/** @type{String} */
		this.id = id;
		/** @type {String} */
		this.optionsPanel = optionsPanel;
		/** @type {Number} Width in centimeters*/
		this.width = 10;
		/** @type {Number} Height in centimeters*/
		this.height = 1;
		/** @type {Number} X position in centimeters*/
		this.positionX = 0;
		/** @type {Number} Y position in centimeters*/
		this.positionY = 0;
		/** @type {String} */
		this.toolType = toolType;
	}
}
