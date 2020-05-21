/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "[context,state]" }]*/

import Vue from "vue";
import Vuex from "vuex";
import $ from "./types";
import { Designer } from "../models/Designer";
import { DesignerService } from "../services/DesignerService";

Vue.use(Vuex);

const initialState = {
	/** @type {String} */
	optionComponent: null,
	designer: new Designer(),
	/** @type {Array<import("../models/tools/ToolLabel").ToolLabel>} */
	elements: [],
	/** @type {Number} */
	selectedElementIndex: null,
};

const store = new Vuex.Store({
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
	},
	actions: {
		/**
		 *
		 * @param {import("vuex").ActionContext<initialState>} context
		 * @param {String} gridSize
		 */
		async [$.actions.DESIGNER_CHANGE_GRIDSIZE](context, gridSize) {
			context.commit($.mutations.DESIGNER_SET_GRIDSIZE, gridSize);
			let root = document.documentElement;
			root.style.setProperty("--designer-grid-dot-space", gridSize);
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
	},
	getters: {
		[$.getters.APP_GET_TRANSLATION]: (state) => (key) => {},
	},
});

export default store;
