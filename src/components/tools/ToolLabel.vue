<template>
    <vue-draggable-resizable
        :w="getPixel(element.width)"
        :h="getPixel(element.height)"
        :parent="true"
        :grid="getElementGrid()"
        class-name-dragging="dragging-element elevation-1"
        class-name-resizing="resizing-element elevation-1"
        @activated="onActivated"
    >
        <p>{{element.label}}</p>
    </vue-draggable-resizable>
</template>

<script>
import { DesignerService } from "../../services/DesignerService";
import $ from "../../store/types";

export default {
    name: "tool-label",
    props: {
        elementIndex: {
            type: Number
        }
    },
    data: () => ({

    }),
    computed: {
        /** 
         * @returns {import("../../models/tools/ToolLabel").ToolLabel}          
         */
        element() {
            return this.$store.state.elements[this.elementIndex];
        }
    },
    methods: {
        onActivated() {
            this.$store.dispatch($.actions.DESIGNER_ACTIVATE_TOOLELEMENT, this.elementIndex);
        },
        getPixel(value) {
            return DesignerService.ConvertCentimetersToPixels(value);
        },
        getElementGrid() {
            let gridSizePixel = DesignerService.GetGridSizeInPixel(this.$store.state.designer.gridSize);
            return [gridSizePixel, gridSizePixel];
        }
    },
    mounted() {
    }
}
</script>