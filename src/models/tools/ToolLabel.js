import { ToolBase } from "./ToolBase";
import $opt from "../../components/options/index";

export class ToolLabel extends ToolBase {
	/**
	 *
	 * @param {String} id
	 * @param {String} label
	 */
	constructor(id, label) {
		super(id, $opt.TOOL_LABEL_PROPERTIES);
		this.label = label || "Label Text";
	}
}
