<template>
    <v-container fill-height class="designer ma-0 pa-0" fluid>
        <div class="h-panel-container">
            <div class="h-panel-header">
                <slot name="header">
                    <v-toolbar dense class="elevation-0 grey lighten-1">
                        <v-btn-toggle
                            dense
                            multiple
                            class="mr-5"
                            active-class="elevation-0 primary lighten-2"
                        >
                            <v-btn class="elevation-2">
                                <v-icon>mdi-format-bold</v-icon>
                            </v-btn>
                            <v-btn class="elevation-2">
                                <v-icon>mdi-format-italic</v-icon>
                            </v-btn>
                            <v-btn class="elevation-2">
                                <v-icon>mdi-format-underline</v-icon>
                            </v-btn>
                        </v-btn-toggle>

                        <v-btn class="elevation-2">
                            <v-row align="center" class="flex-column" justify="center">
                                <v-icon class="cols 12">mdi-format-color-text</v-icon>
                                <v-sheet
                                    tile
                                    style="margin-top: -4px;"
                                    height="4"
                                    width="26"
                                    color="purple"
                                ></v-sheet>
                            </v-row>
                        </v-btn>
                    </v-toolbar>
                </slot>
            </div>
            <div class="h-panel-body">
                <slot>
                    <div class="page A4">
                        <div class="header">h</div>
                        <div class="body" id="page-body"></div>
                        <div class="footer">f</div>
                    </div>
                </slot>
            </div>
            <div class="h-panel-footer">
                <slot name="footer">
                    <h3>Panel Footer</h3>
                </slot>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "designer",
    watch: {
        "$store.state.designer.gridSize": function () {
            let root = document.documentElement;
            root.style.setProperty("--designer-grid-dot-space", this.$store.state.designer.gridSize);
        }
    }
}
</script>

<style lang="css">
:root {
    /* Desginer */
    --designer-grid-bg-color: white;
    --designer-grid-dot-color: black;
    --designer-grid-dot-size: 1px;
    --designer-grid-dot-space: 5mm;
}

.designer {
    background-color: #e0e0e0;
}

.h-panel-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.h-panel-header {
    flex-shrink: 0;
}

.h-panel-body {
    flex: 1;
    overflow: auto;
    min-height: 2em;
}

.h-panel-footer {
    flex-shrink: 0;
    width: 100%;
}

.page {
    box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
    margin: 5mm auto;
    display: flex;
    flex-direction: column;
    background: linear-gradient(
                90deg,
                var(--designer-grid-bg-color)
                    calc(
                        var(--designer-grid-dot-space) -
                            var(--designer-grid-dot-size)
                    ),
                transparent 1%
            )
            left,
        linear-gradient(
                var(--designer-grid-bg-color)
                    calc(
                        var(--designer-grid-dot-space) -
                            var(--designer-grid-dot-size)
                    ),
                transparent 1%
            )
            top,
        var(--designer-grid-dot-color);
    background-size: var(--designer-grid-dot-space)
        var(--designer-grid-dot-space);
}

.page.A4 {
    width: 21cm;
    height: 29.7cm;
}

.page > .header {
    border-bottom: 1px black dashed;
    display: block;
    width: 100%;
    flex-grow: 0;
    height: 120px;
    position: relative;
}

.page > .body::before {
    content: "header";
    margin-top: -10px;
    margin-left: 10px;
    padding: 1px 5px;
    font-size: 10px;
    position: absolute;
    background: #666;
    color: white;
    border-radius: 5px;
}

.page > .body {
    display: block;
    width: 100%;
    flex-grow: 1;
    position: relative;
}

.page > .footer {
    border-top: 1px black dashed;
    display: block;
    width: 100%;
    flex-grow: 0;
    height: 120px;
    position: relative;
}

.page > .footer::before {
    content: "footer";
    margin-top: -10px;
    margin-left: 10px;
    padding: 1px 5px;
    font-size: 10px;
    position: absolute;
    background: #666;
    color: white;
    border-radius: 5px;
}
</style>