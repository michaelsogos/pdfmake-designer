import { PropertySetter } from "./PropertySetter";

export class ToolPropertySetter extends PropertySetter {
	/**
	 *
	 * @param {Number} toolElementIndex
	 * @param {String} propertyName
	 * @param {Any} value
	 */
	constructor(toolElementIndex, propertyName, value) {
		super(propertyName, value);
		this.toolElementIndex = toolElementIndex;
	}
}
