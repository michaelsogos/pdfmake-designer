<template>
    <v-container fill-height class="ma-0 pa-0" fluid>
        <v-btn @click="onAdd">
            <v-icon>mdi-plus</v-icon>Add
        </v-btn>
    </v-container>
</template>

<script>
import Vue from "vue";
import VueDraggableResizable from "vue-draggable-resizable";
const box = Vue.extend(VueDraggableResizable);

export default {
    name: "sidemenu",
    methods: {
        onAdd() {

            const elementMounterId = `box-${Date.now()}`;
            const elementMounter = document.createElement("div");
            elementMounter.id = elementMounterId;
            document.querySelector("#page-body").appendChild(elementMounter);

            new box({
                propsData: {
                    grid: [15, 15],
                    parent: true,
                    w: 150,
                    h: 60
                }
            }).$mount(`#${elementMounterId}`);
            //this.$root.$refs.content.   $refs["page-body"].appendChild(newBox.$el);
            // eslint-disable-next-line no-debugger

        }
    }
}
</script>