module.exports = {
	actions: {
		DESIGNER_CHANGE_GRIDSIZE: "actionDesignerChangeGridSize",
		DESIGNER_ADD_TOOLELEMENT: "actionDesignerAddToolElement",
		DESIGNER_ACTIVATE_TOOLELEMENT: "actionDesignerActivateToolElement",
	},
	getters: {
		APP_GET_TRANSLATION: "getterAppGetTranslation",
	},
	mutations: {
		DESIGNER_SET_GRIDSIZE: "mutationDesignerSetGridSize",
		APP_SET_OPTIONCOMPONENT: "mutationAppSetOptionComponent",
		DESIGNER_ADD_TOOLELEMENT: "mutationDesignerAddToolElement",
		DESIGNER_SET_SELECTEDELEMENTINDEX: "mutationDesignerSetSelectedElementIndex",
	},
};
