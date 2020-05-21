<template>
    <v-container fill-height fluid class="align-content-start ma-0 pa-0">
        <v-toolbar dense class="elevation-0 secondary mb-1">
            <v-icon left>mdi-hammer-wrench</v-icon>
            <v-toolbar-title class="body-1">Toolbox</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon>
                <v-icon>mdi-delete</v-icon>
            </v-btn>-->
        </v-toolbar>
        <div class="col-12">
            <v-btn @click="onAddElement(tool.LABEL)" title="Simple Label" fab small color="teal">
                <v-icon>mdi-format-text</v-icon>
            </v-btn>
        </div>
    </v-container>
</template>

<script>
import $ from "../../store/types";
import { ToolElements } from "../../enums/ToolElements";

export default {
    name: "toolbox",
    data: () => ({
        tool: ToolElements
    }),
    methods: {
        onAddElement(toolName) {
            this.$store.dispatch($.actions.DESIGNER_ADD_TOOLELEMENT, toolName);
        }
    },
    mounted() {
    }
}
</script>
