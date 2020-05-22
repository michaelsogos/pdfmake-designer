/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "[context,state]" }]*/

import Vue from "vue";
import Vuex from "vuex";
import $ from "./types";
import { Designer } from "../models/Designer";
import { DesignerService } from "../services/DesignerService";
import { Report } from "../models/Report";

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
	},
	actions: {
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
		async [$.actions.DESIGNER_RESTORE_TOOLELEMENT](context, savedState) {
			context.commit($.mutations.APP_RESTORE_SAVEDSTATE, savedState);
			for (let x = 0; x < savedState.elements.length; x++) {
				DesignerService.RestoreElement(x);
			}
		},
	},
	getters: {
		[$.getters.APP_GET_TRANSLATION]: (state) => (key) => {},
	},
});

if (Object.keys(localStorage).some((element) => element == "reportDesigner")) {
	let savedState = JSON.parse(localStorage.getItem("reportDesigner"));
	setTimeout(() => {
		store.dispatch($.actions.DESIGNER_RESTORE_TOOLELEMENT, savedState);
	}, 0);
}

export default store;
