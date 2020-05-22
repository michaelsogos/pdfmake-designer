<template>
    <v-container fill-height fluid class="align-content-start ma-0 pa-0">
        <v-toolbar dense class="elevation-0 secondary mb-1">
            <v-icon left>mdi-file-document</v-icon>
            <v-toolbar-title class="body-1">Document Options</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <div class="col-12">
            <div class="mb-3">{{getAppVersion()}}</div>
            <v-text-field
                :value="$store.state.report.title"
                outlined
                dense
                label="Title"
                color="secondary"
                @change="onChangeProperty('title',$event)"
            ></v-text-field>
        </div>
    </v-container>
</template>

<script>
import $ from "../../store/types";
import { PropertySetter } from "../../models/PropertySetter";

export default {
    name: "document-options",
    data: () => ({
    }),
    methods: {
        onChangeProperty(propertyName, value) {
            this.$store.commit($.mutations.REPORT_SET_PROPERTY, new PropertySetter(propertyName, value));
        },
        getAppVersion() {
            return `Version: ${window.APP_VERSION}`;
        }
    },
    mounted() {
    }
}
</script>
