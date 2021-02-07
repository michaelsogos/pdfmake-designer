<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title class="ml-0 pl-4">
                <span class="font-weight-thin">pdf</span>
                <span class="font-weight-light">make</span>
                <span>&nbsp;Report Designer&nbsp;</span>
                <code class="overline secondary black--text elevation-0">{{getAppVersion()}}</code>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div>
                <v-btn rounded color="secondary" class="mx-2" @click="onSaveReport">
                    <v-icon class="mx-2">mdi-download</v-icon>Save Report
                </v-btn>
                <!-- <v-btn rounded color="info" class="mx-2">
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
        <a id="downloadReport" style="display:none"></a>
        <v-dialog v-model="showExpressionDialog" scrollable max-width="500px">
            <v-card color="primary">
                <v-card-title class="white--text">Expression Builder</v-card-title>
                <v-card-text class="primary lighten-4">asd</v-card-text>
              <v-divider></v-divider>
                <v-card-actions class="primary lighten-4">
                    <v-btn color="secondary" text>Close</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" text>Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
import Sidemenu from "./components/SideMenu";
import Designer from "./components/Designer";

export default {
    name: 'App',
    data: () => ({
        showExpressionDialog: false,
    }),
    components: {
        Sidemenu,
        Designer
    },
    methods: {
        onSaveReport() {
            var data = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem("reportDesigner"));
            var anchorElement = document.getElementById('downloadReport');
            anchorElement.setAttribute("href", data);
            anchorElement.setAttribute("download", `${this.$store.state.report.title}.json`);
            anchorElement.click();
        },
        getAppVersion() {
            return `v${this.APP_VERSION}`;
        }
    },
    mounted() {
        let self = this;
        this.$root.$on("show-expression-dialog", function () {
            console.log("df");
            self.showExpressionDialog = true;
        });        
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
