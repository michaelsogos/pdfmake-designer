<template>
    <v-container fill-height fluid class="align-content-start ma-0 pa-0">
        <v-toolbar dense class="elevation-0 secondary mb-1">
            <v-icon left>mdi-format-text</v-icon>
            <v-toolbar-title class="body-1">Label Properties</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-toolbar>
        <div class="col-12">
            <div class="mb-3">ID: {{toolElement.id}}</div>
            <div class="mb-3">X: {{toolElement.positionX}} cm</div>
            <div class="mb-3">Y: {{toolElement.positionY}} cm</div>
            <div class="mb-3">WIDTH: {{toolElement.width}} cm</div>
            <div class="mb-3">HEIGHT: {{toolElement.height}} cm</div>
            <v-text-field
                :value="toolElement.label"
                outlined
                dense
                label="Label"
                color="secondary"
                prepend-inner-icon="mdi-face"
                @change="onChangeProperty('label',$event)"
            ></v-text-field>
            <v-text-field
                :value="toolElement.width"
                outlined
                dense
                label="Width"
                color="secondary"
                prepend-inner-icon="mdi-face"
                type="number"
                @change="onChangeProperty('width',$event)"
            ></v-text-field>
        </div>
    </v-container>
</template>
<script>
import $ from "../../store/types";
import { ToolPropertySetter } from '../../models/ToolPropertySetter';

export default {
    name: "tool-label-properties",
    data: () => ({

    }),
    computed: {
        /** @return {import("../../models/tools/ToolLabel").ToolLabel} */
        toolElement() {
            return this.$store.state.elements[this.$store.state.selectedElementIndex];
        }
    },
    methods: {
        onChangeProperty(propertyName, value) {
            switch (propertyName) {
                case "width":
                    value = parseFloat(value);
            }

            this.$store.commit($.mutations.DESIGNER_SET_TOOLELEMENTPROPERTY, new ToolPropertySetter(this.$store.state.selectedElementIndex, propertyName, value));
        }
    },
    mounted() {
    }
}
</script>
