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
            <v-text-field
                v-model="toolElement.label"
                outlined
                dense
                label="Label"
                color="secondary"
                prepend-inner-icon="mdi-face"
            ></v-text-field>
        </div>
    </v-container>
</template>
<script>

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

    },
    mounted() {
    }
}
</script>
