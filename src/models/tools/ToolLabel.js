import { ToolBase } from "./ToolBase";
import $opt from "../../components/options/index";
import { ToolElements } from "../../enums/ToolElements";
import { FontFace } from "../../enums/FontFace";

export class ToolLabel extends ToolBase {
	/**
	 *
	 * @param {String} id
	 * @param {String} label
	 */
	constructor(id, label) {
		super(id, $opt.TOOL_LABEL_PROPERTIES, ToolElements.LABEL);
		this.label = label || "Label Text";
		this.fontFamily = "Roboto";
		this.fontFace = FontFace.NORMAL;
	}
}
