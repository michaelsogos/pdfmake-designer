import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: colors.indigo,
				secondary: colors.teal,
				accent: colors.indigo.accent1,
				error: colors.red,
				warning: colors.orange,
				info: colors.blue,
				success: colors.green,
			},
			// dark: {
			// 	primary: colors.grey.darken3,
			// 	secondary: colors.red,
			// 	accent: colors.grey.accent1,
			// 	error: colors.red,
			// 	warning: colors.orange,
			// 	info: colors.blue,
			// 	success: colors.green,
			// },
		},
		options: {
			customProperties: true,
		},
	},
});
