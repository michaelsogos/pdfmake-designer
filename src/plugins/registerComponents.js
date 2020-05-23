import Vue from "vue";

import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
Vue.component("vue-draggable-resizable", VueDraggableResizable);

//* Register Options Components *//
//------------------//
import DesignerOptions from "../components/options/DesignerOptions.vue";
Vue.component(DesignerOptions.name, DesignerOptions);

import Toolbox from "../components/options/Toolbox.vue";
Vue.component(Toolbox.name, Toolbox);

import ToolLabelProperties from "../components/options/ToolLabelProperties.vue";
Vue.component(ToolLabelProperties.name, ToolLabelProperties);

import DocumentOptions from "../components/options/DocumentOptions.vue";
Vue.component(DocumentOptions.name, DocumentOptions);

import GoogleFonts from "../components/options/GoogleFonts.vue";
Vue.component(GoogleFonts.name, GoogleFonts);
