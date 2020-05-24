module.exports = {
	actions: {
		DESIGNER_CHANGE_GRIDSIZE: "actionDesignerChangeGridSize",
		DESIGNER_ADD_TOOLELEMENT: "actionDesignerAddToolElement",
		DESIGNER_ACTIVATE_TOOLELEMENT: "actionDesignerActivateToolElement",
		APP_RESTORE_SAVEDSTATE: "actionAppRestoreSavedState",
		APP_INITIALIZE_REPORT: "actionAppInitializeReport",
	},
	getters: {
		REPORT_GET_FONTVARIANT: "getterReportGetFontVariant",
	},
	mutations: {
		DESIGNER_SET_GRIDSIZE: "mutationDesignerSetGridSize",
		APP_SET_OPTIONCOMPONENT: "mutationAppSetOptionComponent",
		DESIGNER_ADD_TOOLELEMENT: "mutationDesignerAddToolElement",
		DESIGNER_SET_SELECTEDELEMENTINDEX: "mutationDesignerSetSelectedElementIndex",
		DESIGNER_SET_TOOLELEMENTPROPERTY: "mutationDesignerSetToolElementProperty",
		APP_RESTORE_SAVEDSTATE: "mutationAppRestoreSavedState",
		REPORT_SET_PROPERTY: "mutationReportSetProperty",
		REPORT_ADD_FONT: "mutationReportAddFont",
		REPORT_REMOVE_FONT: "mutationReportRemoveFont",
	},
};
