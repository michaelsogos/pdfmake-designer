<template>
    <v-container fill-height fluid class="align-content-start ma-0 pa-0">
        <v-toolbar dense class="elevation-0 secondary mb-1">
            <v-icon left>mdi-cog</v-icon>
            <v-toolbar-title class="body-1">Designer Options</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon>
                <v-icon>mdi-delete</v-icon>
            </v-btn>-->
        </v-toolbar>
        <div class="col-12">
            <v-select
                :items="gridSizes"
                label="Grid Size"
                dense
                outlined
                color="secondary"
                prepend-inner-icon="mdi-blur"
                :value="$store.state.designer.gridSize"
                @change="onChangeGridSize"
            ></v-select>
        </div>
    </v-container>
</template>

<script>
import { DesignerGridSize } from "../../enums/DesginerGridSize";
import $ from "../../store/types";

export default {
    name: "designer-options",
    data: () => ({
        gridSizes: [],
    }),
    methods: {
        onChangeGridSize(value) {
            this.$store.dispatch($.actions.DESIGNER_CHANGE_GRIDSIZE, value);
        },
        loadGridSize() {
            for (let gridSize in DesignerGridSize) {
                this.gridSizes.push({ text: gridSize, value: DesignerGridSize[gridSize] });
            }
        }
    },
    mounted() {
        this.loadGridSize();
    }
}
</script>
