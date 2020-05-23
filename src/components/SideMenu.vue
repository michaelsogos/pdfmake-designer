<template>
    <v-list class="primary lighten-3">
        <v-list-item @click="onShowOption(option.DESIGNER_OPTIONS )">
            <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Designer Options</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onShowOption(option.DOCUMENT_OPTIONS )">
            <v-list-item-icon>
                <v-icon>mdi-file-document</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Document Options</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onShowOption(option.TOOLBOX)">
            <v-list-item-icon>
                <v-icon>mdi-hammer-wrench</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Toolbox</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onShowOption(option.GOOGE_FONTS)">
            <v-list-item-icon>
                <v-icon>mdi-format-size</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Google Fonts</v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<script>
import $ from "../store/types";
import $opt from "../components/options/index";

export default {
    name: "sidemenu",
    data: () => ({
        option: $opt,
    }),
    methods: {
        onChangeDesignerGrid() {
            this.$store.dispatch($.actions.DESIGNER_CHANGE_GRIDSIZE, "10mm");
        },
        onShowOption(optionComponentName) {
            this.$store.commit($.mutations.APP_SET_OPTIONCOMPONENT, optionComponentName);
        }
    }
}
</script>