import Vue from "vue";
import store from "../store/index";
import $ from "../store/types";
import $opt from "../components/options/index";
import { ToolElements } from "../enums/ToolElements";
import { ToolLabel } from "../models/tools/ToolLabel";
import ToolLabelComponent from "../components/tools/ToolLabel.vue";
import { DesignerGridSize } from "../enums/DesginerGridSize";
const toolLabelComponent = Vue.extend(ToolLabelComponent);

export class DesignerService {
	/**
	 *
	 * @param {String} toolName
	 * @returns {ToolDefinition}
	 */
	static CreateNewElement(toolName) {
		const elementMounterId = `${toolName}-${Date.now()}`;
		const elementMounter = document.createElement("div");
		elementMounter.id = elementMounterId;
		document.querySelector("#page-body").appendChild(elementMounter);

		switch (toolName) {
			case ToolElements.LABEL:
				{
					let toolElement = new ToolLabel(elementMounterId, "BLABA");
					store.commit($.mutations.DESIGNER_ADD_TOOLELEMENT, toolElement);

					let toolComponent = new toolLabelComponent({
						propsData: {
							elementIndex: store.state.elements.length - 1,
						},
						store,
					});

					store.commit($.mutations.APP_SET_OPTIONCOMPONENT, $opt.TOOL_LABEL_PROPERTIES);
					toolComponent.$mount(`#${elementMounterId}`);
				}
				break;
			default:
				throw new Error(`The tool ${toolName} is not implemented yet!`);
		}
	}

	/**
	 *
	 * @param {Number} pixels
	 */
	static ConvertPixelsToCentimeter(pixels) {
		const dpi = 96 * window.devicePixelRatio;
		return (pixels * 2.54) / dpi;
	}

	/**
	 *
	 * @param {Number} centimeters
	 */
	static ConvertCentimetersToPixels(centimeters) {
		const dpi = 96 * window.devicePixelRatio;
		return (centimeters * dpi) / 2.54;
	}

	static GetGridSizeInPixel(gridSize) {
		switch (gridSize) {
			case DesignerGridSize["4MM"]:
				return this.ConvertCentimetersToPixels(0.4);
			case DesignerGridSize["5MM"]:
				return this.ConvertCentimetersToPixels(0.5);
			case DesignerGridSize["10MM"]:
				return this.ConvertCentimetersToPixels(1);
			default:
				throw new Error(`The grid size [${gridSize}] is not implemented yet!`);
		}
	}
}
