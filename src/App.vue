<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title class="ml-0 pl-4">
                <span>pdfmake Report Designer</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div>
                <!-- <v-btn rounded color="info" class="mx-2">
                    <v-icon class="mx-2">mdi-refresh</v-icon>Refresh
                </v-btn>
                <v-btn rounded color="info" class="mx-2">
                    <v-icon class="mx-2">mdi-texture-box</v-icon>Add Zone
                </v-btn>
                <v-btn rounded color="info" class="mx-2">
                    <v-icon class="mx-2">mdi-cctv</v-icon>Add Device
                </v-btn>-->
            </div>
        </v-app-bar>

        <v-content class="content-not-scrollable">
            <v-container class="fill-height align-content-start ma-0 pa-0" fluid>
                <v-row no-gutter class="ma-0 pa-0 fill-height">
                    <v-col cols="2" class="ma-0 pa-0 primary lighten-3 fill-height">
                        <sidemenu></sidemenu>
                    </v-col>
                    <v-col cols="2" class="ma-0 pa-0 secondary lighten-4 fill-height">
                        <transition
                            enter-active-class="animated slideInUp faster"
                            leave-active-class="animated slideOutDown faster"
                        >
                            <component :is="$store.state.optionComponent"></component>
                        </transition>
                    </v-col>
                    <v-col cols="8" class="ma-0 pa-0 grey fill-height">
                        <designer></designer>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Sidemenu from "./components/SideMenu";
import Designer from "./components/Designer";

export default {
    name: 'App',
    components: {
        Sidemenu,
        Designer
    }
}
</script>

<style lang="scss">
.content-not-scrollable {
    height: 100vh;
    overflow: hidden;
}

.dragging-element {
    background-color: var(--v-secondary-lighten4);
    opacity: 0.5;
}

.resizing-element {
    background-color: var(--v-secondary-lighten4);
    opacity: 0.5;
}
</style>
