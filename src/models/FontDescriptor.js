export class FontDescriptor {
	/**
	 *
	 * @param {String} name
	 */
	constructor(name) {
		/** @type {String} */
		this.name = name;
		/** @type {String} In base64*/
		this.normal = null;
		/** @type {String} In base64*/
		this.bold = null;
		/** @type {String} In base64*/
		this.italics = null;
		/** @type {String} In base64*/
		this.bolditalics = null;
		/** @type {String} */
		this.normalVariant = null;
		/** @type {String} */
		this.boldVariant = null;
		/** @type {String} */
		this.italicsVariant = null;
		/** @type {String} */
		this.bolditalicsVariant = null;
	}
}
