<template>
    <vue-draggable-resizable
        :w="getPixel(element.width)"
        :h="getPixel(element.height)"
        :x="getPixel(element.positionX)"
        :y="getPixel(element.positionY)"
        :parent="true"
        :grid="getElementGrid()"
        class-name-dragging="dragging-element elevation-1"
        class-name-resizing="resizing-element elevation-1"
        @activated="onActivated"
        @dragstop="onDragStop"
        @resizestop="onResizeStop"
    >
        <p :style="getFontStyle()">{{element.label}}</p>
    </vue-draggable-resizable>
</template>

<script>
import { DesignerService } from "../../services/DesignerService";
import $ from "../../store/types";
import { ToolPropertySetter } from '../../models/ToolPropertySetter';

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
        onDragStop(x, y) {
            this.$store.commit($.mutations.DESIGNER_SET_TOOLELEMENTPROPERTY, new ToolPropertySetter(this.elementIndex, "positionX", DesignerService.ConvertPixelsToCentimeter(x)));
            this.$store.commit($.mutations.DESIGNER_SET_TOOLELEMENTPROPERTY, new ToolPropertySetter(this.elementIndex, "positionY", DesignerService.ConvertPixelsToCentimeter(y)));
        },
        onResizeStop(x, y, width, height) {
            this.$store.commit($.mutations.DESIGNER_SET_TOOLELEMENTPROPERTY, new ToolPropertySetter(this.elementIndex, "positionX", DesignerService.ConvertPixelsToCentimeter(x)));
            this.$store.commit($.mutations.DESIGNER_SET_TOOLELEMENTPROPERTY, new ToolPropertySetter(this.elementIndex, "positionY", DesignerService.ConvertPixelsToCentimeter(y)));
            this.$store.commit($.mutations.DESIGNER_SET_TOOLELEMENTPROPERTY, new ToolPropertySetter(this.elementIndex, "width", DesignerService.ConvertPixelsToCentimeter(width)));
            this.$store.commit($.mutations.DESIGNER_SET_TOOLELEMENTPROPERTY, new ToolPropertySetter(this.elementIndex, "height", DesignerService.ConvertPixelsToCentimeter(height)));
        },
        getPixel(value) {
            return DesignerService.ConvertCentimetersToPixels(value);
        },
        getElementGrid() {
            let gridSizePixel = DesignerService.GetGridSizeInPixel(this.$store.state.designer.gridSize);
            return [gridSizePixel, gridSizePixel];
        },
        getFontStyle() {
            let style = `font-family: "${this.element.fontFamily}"; `;
            let fontVariant = this.$store.getters[$.getters.REPORT_GET_FONTVARIANT](this.element.fontFamily, this.element.fontFace);

            if (fontVariant.includes("italic"))
                style += "font-style: italic; ";
            else
                style += "font-style: normal; ";

            let fontWeight = fontVariant.match(/\b100|\b200|\b300|\b400|\b500|\b600|\b700|\b800|\b900|\bbold|\bbolder|\blighter/g);
            if (fontWeight)
                style += `font-weight: ${fontWeight}; `;
            else
                style += "font-weight: normal; ";

            return style;
        },
    },
    mounted() {
    }
}
</script>