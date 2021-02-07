/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "[context,state]" }]*/

import Vue from "vue";
import Vuex from "vuex";
import $ from "./types";
import { Designer } from "../models/Designer";
import { DesignerService } from "../services/DesignerService";
import { Report } from "../models/Report";
import { FontDescriptor } from "../models/FontDescriptor";
import { FontFace } from "../enums/FontFace";
import axios from "axios";
import { FontFile } from "../models/FontFile";

Vue.use(Vuex);

const localStoragePersister = (store) => {
	store.subscribe((mutation, state) => {
		localStorage.setItem("reportDesigner", JSON.stringify(state));
	});
};

const initialState = {
	/** @type {String} */
	optionComponent: null,
	/** @type {Designer} */
	designer: new Designer(),
	/** @type {Report} */
	report: new Report(),
	/** @type {Array<import("../models/tools/ToolBase").ToolBase>} */
	elements: [],
	/** @type {Number} */
	selectedElementIndex: null,
	/** @type {import("../models/DataSource").DataSource[]} */
	datasources: [],
};

const store = new Vuex.Store({
	plugins: [localStoragePersister],
	modules: {},
	state: initialState,
	mutations: {
		/**
		 *
		 * @param {initialState} state
		 * @param {String} gridSize
		 */
		[$.mutations.DESIGNER_SET_GRIDSIZE](state, gridSize) {
			state.designer.gridSize = gridSize;
		},
		/**
		 *
		 * @param {initialState} state
		 * @param {String} optionComponentName
		 */
		[$.mutations.APP_SET_OPTIONCOMPONENT](state, optionComponentName) {
			state.optionComponent = optionComponentName;
		},
		/**
		 *
		 * @param {initialState} state
		 * @param {import("../models/tools/ToolBase").ToolBase} toolElement
		 */
		[$.mutations.DESIGNER_ADD_TOOLELEMENT](state, toolElement) {
			let index = state.elements.push(toolElement);
			state.selectedElementIndex = index - 1;
		},
		/**
		 *
		 * @param {initialState} state
		 * @param {Number} selectedElementIndex
		 */
		[$.mutations.DESIGNER_SET_SELECTEDELEMENTINDEX](state, selectedElementIndex) {
			state.selectedElementIndex = selectedElementIndex;
		},
		/**
		 *
		 * @param {initialState} state
		 * @param {import("../models/ToolPropertySetter").ToolPropertySetter} toolPropertySetter
		 */
		[$.mutations.DESIGNER_SET_TOOLELEMENTPROPERTY](state, toolPropertySetter) {
			state.elements[toolPropertySetter.toolElementIndex][toolPropertySetter.propertyName] = toolPropertySetter.value;
		},
		/**
		 *
		 * @param {initialState} state
		 * @param {initialState} savedState
		 */
		[$.mutations.APP_RESTORE_SAVEDSTATE](state, savedState) {
			if (Object.prototype.hasOwnProperty.call(savedState, "optionComponent")) state.optionComponent = savedState.optionComponent;
			if (Object.prototype.hasOwnProperty.call(savedState, "designer")) state.designer = savedState.designer;
			if (Object.prototype.hasOwnProperty.call(savedState, "report")) state.report = savedState.report;
			if (Object.prototype.hasOwnProperty.call(savedState, "elements")) state.elements.splice(0, state.elements.length, ...savedState.elements);
			if (Object.prototype.hasOwnProperty.call(savedState, "selectedElementIndex"))
				state.selectedElementIndex = savedState.selectedElementIndex;
		},
		/**
		 *
		 * @param {initialState} state
		 * @param {import("../models/PropertySetter").PropertySetter} propertySetter
		 */
		[$.mutations.REPORT_SET_PROPERTY](state, propertySetter) {
			state.report[propertySetter.propertyName] = propertySetter.value;
		},
		/**
		 *
		 * @param {initialState} state
		 * @param {import("../models/FontFile").FontFile} fontFile
		 */
		[$.mutations.REPORT_ADD_FONT](state, fontFile) {
			let fontIndex = state.report.fonts.findIndex((font) => font.name == fontFile.fontName);
			if (fontIndex >= 0) {
				let fontDescriptor = state.report.fonts[fontIndex];
				fontDescriptor[fontFile.face] = fontFile.base64;
				fontDescriptor[`${fontFile.face}Variant`] = fontFile.fontVariant;
				state.report.fonts.splice(fontIndex, 1, ...[fontDescriptor]);
			} else {
				let newFontDescriptor = new FontDescriptor(fontFile.fontName);
				newFontDescriptor[fontFile.face] = fontFile.base64;
				newFontDescriptor[`${fontFile.face}Variant`] = fontFile.fontVariant;
				state.report.fonts.push(newFontDescriptor);
			}
		},
		/**
		 *
		 * @param {initialState} state
		 * @param {import("../models/FontFile").FontFile} fontFile
		 */
		[$.mutations.REPORT_REMOVE_FONT](state, fontFile) {
			let fontIndex = state.report.fonts.findIndex((font) => font.name == fontFile.fontName);
			if (fontIndex >= 0) {
				let fontDescriptor = state.report.fonts[fontIndex];

				switch (fontFile.fontVariant) {
					case fontDescriptor.normalVariant:
						fontDescriptor.normal = null;
						fontDescriptor.normalVariant = null;
						state.report.fonts.splice(fontIndex, 1, ...[fontDescriptor]);
						break;
					case fontDescriptor.boldVariant:
						fontDescriptor.bold = null;
						fontDescriptor.boldVariant = null;
						state.report.fonts.splice(fontIndex, 1, ...[fontDescriptor]);
						break;
					case fontDescriptor.italicsVariant:
						fontDescriptor.italics = null;
						fontDescriptor.italicsVariant = null;
						state.report.fonts.splice(fontIndex, 1, ...[fontDescriptor]);
						break;
					case fontDescriptor.bolditalicsVariant:
						fontDescriptor.bolditalics = null;
						fontDescriptor.bolditalicsVariant = null;
						state.report.fonts.splice(fontIndex, 1, ...[fontDescriptor]);
						break;
				}
			}
		},
		/**
		 *
		 * @param {initialState} state
		 * @param {import("../models/DataSource").DataSource} dataSource
		 */
		[$.mutations.DATASOURCE_ADD_DEFINITION](state, dataSource) {
			state.datasources.push(dataSource);
		},
	},
	actions: {
		/**
		 *
		 * @param {import("vuex").ActionContext<initialState>} context
		 * @param {String} gridSize
		 */
		async [$.actions.APP_INITIALIZE_REPORT](context) {
			let fontDescriptor = context.state.report.fonts.find((item) => {
				return item.name == "Roboto";
			});
			if (!fontDescriptor || !fontDescriptor.normalVariant)
				axios
					.get("https://www.googleapis.com/webfonts/v1/webfonts", { params: { key: this._vm.GOOGLE_API_SECRET } })
					.then((response) => {
						let googleFonts = response.data.items;
						let robotoFont = googleFonts.find((item) => {
							return item.family == "Roboto";
						});

						this.fontFaceSelector = false;
						axios
							.get(robotoFont.files["regular"], { responseType: "blob" })
							.then(function(response) {
								var reader = new window.FileReader();
								reader.readAsDataURL(response.data);
								reader.onload = function() {
									let fontBase64 = reader.result;
									let fontFile = new FontFile("Roboto", "regular", FontFace.NORMAL, fontBase64);
									context.commit($.mutations.REPORT_ADD_FONT, fontFile);
								};
							})
							.catch((err) => {
								console.error(err);
							});
					})
					.catch((err) => {
						console.error(err);
					});
		},
		/**
		 *
		 * @param {import("vuex").ActionContext<initialState>} context
		 * @param {String} gridSize
		 */
		async [$.actions.DESIGNER_CHANGE_GRIDSIZE](context, gridSize) {
			context.commit($.mutations.DESIGNER_SET_GRIDSIZE, gridSize);
		},
		/**
		 *
		 * @param {import("vuex").ActionContext<initialState>} context
		 * @param {String} toolName
		 */
		async [$.actions.DESIGNER_ADD_TOOLELEMENT](context, toolName) {
			DesignerService.CreateNewElement(toolName);
		},
		/**
		 *
		 * @param {import("vuex").ActionContext<initialState>} context
		 * @param {Number} toolElementIndex
		 */
		async [$.actions.DESIGNER_ACTIVATE_TOOLELEMENT](context, toolElementIndex) {
			context.commit($.mutations.DESIGNER_SET_SELECTEDELEMENTINDEX, toolElementIndex);
			context.commit($.mutations.APP_SET_OPTIONCOMPONENT, context.state.elements[toolElementIndex].optionsPanel);
		},
		/**
		 *
		 * @param {import("vuex").ActionContext<initialState>} context
		 * @param {initialState} savedState
		 */
		async [$.actions.APP_RESTORE_SAVEDSTATE](context, savedState) {
			context.commit($.mutations.APP_RESTORE_SAVEDSTATE, savedState);

			//Restore Font Face Style
			for (let fontDescriptor of savedState.report.fonts) {
				let fontVariants = [];
				if (fontDescriptor.normalVariant) fontVariants.push(fontDescriptor.normalVariant);
				if (fontDescriptor.boldVariant) fontVariants.push(fontDescriptor.boldVariant);
				if (fontDescriptor.italicsVariant) fontVariants.push(fontDescriptor.italicsVariant);
				if (fontDescriptor.bolditalicsVariant) fontVariants.push(fontDescriptor.bolditalicsVariant);

				DesignerService.RestoreFontFaceStyle(fontDescriptor.name, fontVariants);
			}

			await context.dispatch($.actions.APP_INITIALIZE_REPORT);

			//Restore Tool Element
			for (let x = 0; x < savedState.elements.length; x++) {
				DesignerService.RestoreElement(x);
			}
		},
	},
	getters: {
		[$.getters.REPORT_GET_FONTVARIANT]: (state) => (fontFamily, fontFace) => {
			let fontDescriptor = state.report.fonts.find((item) => {
				return item.name == fontFamily;
			});

			switch (fontFace) {
				case FontFace.NORMAL:
					return fontDescriptor.normalVariant || "";
				case FontFace.BOLD:
					return fontDescriptor.boldVariant || "";
				case FontFace.ITALIC:
					return fontDescriptor.italicsVariant || "";
				case FontFace.BOLD_ITALIC:
					return fontDescriptor.bolditalicsVariant || "";
				default:
					return "";
			}
		},
	},
});

if (Object.keys(localStorage).some((element) => element == "reportDesigner")) {
	let savedState = JSON.parse(localStorage.getItem("reportDesigner"));
	setTimeout(() => {
		store.dispatch($.actions.APP_RESTORE_SAVEDSTATE, savedState);
	}, 0);
}

export default store;
