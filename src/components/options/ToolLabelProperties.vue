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
                prepend-inner-icon="mdi-format-text-variant"
                append-icon="mdi-function-variant"
                @change="onChangeProperty('label',$event)"
                @click:append="onShowExpressionDialog"
            ></v-text-field>
            <!-- <v-text-field
                :value="toolElement.width"
                outlined
                dense
                label="Width"
                color="secondary"
                prepend-inner-icon="mdi-face"
                type="number"
                @change="onChangeProperty('width',$event)"
            ></v-text-field>-->
            <v-select
                :items="installedFonts"
                label="Font Family"
                dense
                outlined
                color="secondary"
                prepend-inner-icon="mdi-format-size"
                :value="toolElement.fontFamily"
                @change="onChangeProperty('fontFamily',$event)"
            ></v-select>
            <v-select
                :items="installedFontVariants"
                label="Font Face"
                dense
                outlined
                color="secondary"
                prepend-inner-icon="mdi-format-font"
                :value="toolElement.fontFace"
                @change="onChangeProperty('fontFace',$event)"
            ></v-select>
        </div>
    </v-container>
</template>
<script>
import $ from "../../store/types";
import { ToolPropertySetter } from '../../models/ToolPropertySetter';
import { FontFace } from '../../enums/FontFace';

export default {
    name: "tool-label-properties",
    data: () => ({

    }),
    computed: {
        /** @return {import("../../models/tools/ToolLabel").ToolLabel} */
        toolElement() {
            return this.$store.state.elements[this.$store.state.selectedElementIndex];
        },
        installedFonts() {
            return this.$store.state.report.fonts.map((/** @type {import("../../models/FontDescriptor").FontDescriptor}*/ item) => {
                return item.name;
            });
        },
        installedFontVariants() {
            /** @type {import("../../models/FontDescriptor").FontDescriptor}*/
            let fontDescriptor = this.$store.state.report.fonts.find((item) => item.name == this.toolElement.fontFamily);
            if (fontDescriptor) {
                let variants = [];
                if (fontDescriptor.normalVariant) variants.push({ text: "Regular Font", value: FontFace.NORMAL });
                if (fontDescriptor.boldVariant) variants.push({ text: "Bold Font", value: FontFace.BOLD });
                if (fontDescriptor.italicsVariant) variants.push({ text: "Italic Font", value: FontFace.ITALIC });
                if (fontDescriptor.bolditalicsVariant) variants.push({ text: "Bold-Italic Font", value: FontFace.BOLD_ITALIC });
                return variants;
            }
            else
                return [];
        }
    },
    methods: {
        onChangeProperty(propertyName, value) {
            //Pre-elaboration of property value
            switch (propertyName) {
                case "width":
                    value = parseFloat(value);
                    break;
            }

            this.$store.commit($.mutations.DESIGNER_SET_TOOLELEMENTPROPERTY, new ToolPropertySetter(this.$store.state.selectedElementIndex, propertyName, value));

            //Post-elaboration of property value
            switch (propertyName) {
                case "fontFamily":
                    this.$store.commit($.mutations.DESIGNER_SET_TOOLELEMENTPROPERTY, new ToolPropertySetter(this.$store.state.selectedElementIndex, "fontFace", FontFace.NORMAL));
                    break;
            }
        },
        onShowExpressionDialog() {
            this.$root.$emit("show-expression-dialog");
        }
    },
    mounted() {
    }
}
</script>
