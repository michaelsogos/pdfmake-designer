export class FontFile {
	/**
	 *
	 * @param {String} fontName
	 * @param {String} fontVariant
	 * @param {String} face
	 * @param {String} base64
	 */
	constructor(fontName, fontVariant, face, base64) {
		/** @type {String} */
		this.fontName = fontName;
		/** @type {String} */
		this.fontVariant = fontVariant;
		/** @type {String} */
		this.face = face;
		/** @type {String} */
		this.base64 = base64;
	}
}
