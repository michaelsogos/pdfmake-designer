<template>
    <v-container fill-height fluid class="align-content-start ma-0 pa-0">
        <div class="h-panel-container">
            <div class="h-panel-header">
                <slot name="header">
                    <v-toolbar dense class="elevation-0 secondary mb-1">
                        <v-icon left>mdi-format-size</v-icon>
                        <v-toolbar-title class="body-1">Google Fonts</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <div class="col-12">
                        <v-autocomplete
                            v-model="selectedFont"
                            :items="googleFonts"
                            outlined
                            dense
                            label="Families"
                            color="secondary"
                            clearable
                            :filter="onFilterFontSelector"
                            @change="onChangeFontSelector"
                            item-text="family"
                            :item-value="getItemValue"
                            hide-details
                        >
                            <template v-slot:item="data">
                                <v-list-item-content>
                                    <v-list-item-title>{{data.item.family}}</v-list-item-title>
                                    <v-list-item-subtitle>
                                        <v-row no-gutters>
                                            <v-col>{{data.item.category}}</v-col>
                                            <v-col
                                                class="text-right"
                                            >{{data.item.version}} | {{data.item.lastModified}}</v-col>
                                        </v-row>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </v-autocomplete>
                    </div>
                </slot>
            </div>
            <div class="h-panel-body">
                <slot>
                    <div class="col-12">
                        <v-list v-if="selectedFont" color="secondary lighten-3">
                            <v-list-item
                                v-for="item in selectedFont.variants"
                                :key="item"
                                :input-value="getFontDownloadStatus(item)"
                                active-class="primary lighten-3"
                            >
                                <v-list-item-content>
                                    <v-list-item-title :style="getFontStyle(item)">
                                        {{selectedFont.family}}
                                        <v-icon
                                            v-if="item=='regular' || item=='italic' || item=='700' || item=='700italic'"
                                            color="primary"
                                        >mdi-star</v-icon>
                                    </v-list-item-title>
                                    <v-list-item-subtitle>{{getFontStyleDescription(item)}}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn
                                        icon
                                        color="primary"
                                        @click="onShowVariantDialog(item)"
                                        v-if="getFontDownloadStatus(item) == false"
                                    >
                                        <v-icon>mdi-plus-circle</v-icon>
                                    </v-btn>
                                    <v-btn
                                        icon
                                        color="error darken-3"
                                        @click="onRemoveFontVariant(item)"
                                        v-else
                                    >
                                        <v-icon>mdi-minus-circle</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </div>
                </slot>
            </div>
            <div class="h-panel-footer">
                <slot name="footer">
                    <div></div>
                </slot>
            </div>
        </div>
        <v-dialog v-model="fontFaceSelector">
            <v-card>
                <v-card-title>Select target font face</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-radio-group v-model="selectedFontFace" column>
                        <v-radio
                            v-for="fontFace in fontFaces"
                            :key="fontFace.value"
                            :label="fontFace.text"
                            :value="fontFace.value"
                        ></v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue darken-1" text @click="fontFaceSelector = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="onAddFontVariant">Continue</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import $ from "../../store/types";
import axios from "axios";
import { FontFile } from '../../models/FontFile';
import { FontFace } from '../../enums/FontFace';

export default {
    name: "google-fonts",
    data: () => ({
        fontsFilter: null,
        googleFonts: [],
        selectedFont: null,
        fontFaceSelector: false,
        selectedFontFace: null,
        fontFaces: [],
        selectedFontVariant: null
    }),
    methods: {
        onChangeFontSelector() {
            let fontResourceURL = `http://fonts.googleapis.com/css?family=${this.selectedFont.family}:${this.selectedFont.variants.join(",")}`;
            var fontLink = document.createElement('link');
            fontLink.href = fontResourceURL;
            fontLink.rel = 'stylesheet';
            fontLink.type = 'text/css';
            (document.head || document.documentElement).appendChild(fontLink);
        },
        onFilterFontSelector(item, queryText) {
            return item.family.toLowerCase().includes(queryText.toLowerCase());
        },
        onAddFontVariant() {
            let self = this;
            let fontURL = this.selectedFont.files[this.selectedFontVariant];
            this.fontFaceSelector = false;
            axios.get(fontURL, { responseType: "blob" })
                .then(function (response) {
                    var reader = new window.FileReader();
                    reader.readAsDataURL(response.data);
                    reader.onload = function () {
                        let fontBase64 = reader.result;
                        let fontFile = new FontFile(self.selectedFont.family, self.selectedFontVariant, self.selectedFontFace, fontBase64);
                        self.$store.commit($.mutations.REPORT_ADD_FONT, fontFile);
                    };
                }).catch(err => {
                    console.error(err);
                });
        },
        onShowVariantDialog(variant) {
            this.selectedFontVariant = variant;
            this.fontFaceSelector = true;
        },
        onRemoveFontVariant(variant) {
            let fontFile = new FontFile(this.selectedFont.family, variant);
            this.$store.commit($.mutations.REPORT_REMOVE_FONT, fontFile);
        },
        loadGoogleFonts() {
            axios.get("https://www.googleapis.com/webfonts/v1/webfonts", { params: { key: this.GOOGLE_API_SECRET } }).then(response => {
                this.googleFonts = response.data.items;
            }).catch(err => {
                console.error(err);
            });
        },
        loadFontFaces() {
            for (let fontFace in FontFace) {
                this.fontFaces.push({ text: fontFace, value: FontFace[fontFace] });
            }
        },
        /**
         * @param {String} variant
         */
        getFontStyle(variant) {
            let style = `font-family: "${this.selectedFont.family}"; `;

            if (variant.includes("italic"))
                style += "font-style: italic; ";
            else
                style += "font-style: normal; ";

            let fontWeight = variant.match(/\b100|\b200|\b300|\b400|\b500|\b600|\b700|\b800|\b900|\bbold|\bbolder|\blighter/g);
            if (fontWeight)
                style += `font-weight: ${fontWeight}; `;
            else
                style += "font-weight: normal; ";

            return style;
        },
        getFontStyleDescription(variant) {
            let description = "";

            if (variant.includes("italic"))
                description += "italic";
            else
                description += "regular";

            let fontWeight = variant.match(/\b100|\b200|\b300|\b400|\b500|\b600|\b700|\b800|\b900|\bbold|\bbolder|\blighter/g);
            switch (fontWeight ? fontWeight[0] : null) {
                case "100":
                    description += `, Thin`;
                    break;
                case "200":
                    description += `, Ultra Light`;
                    break;
                case "300":
                    description += `, Light`;
                    break;
                case "500":
                    description += `, Medium`;
                    break;
                case "600":
                    description += `, Demi Bold`;
                    break;
                case "700":
                    description += `, Bold`;
                    break;
                case "800":
                    description += `, Ultra Bold`;
                    break;
                case "900":
                    description += `, Heavy`;
                    break;
            }

            return description;
        },
        getItemValue(item) {
            return item;
        },
        getFontDownloadStatus(variant) {
            /** @type {import("../../models/FontDescriptor").FontDescriptor} */
            let fontDescriptor = this.$store.state.report.fonts.find((item) => {
                return item.name == this.selectedFont.family;
            });

            if (fontDescriptor)
                if (fontDescriptor.normalVariant == variant || fontDescriptor.boldVariant == variant || fontDescriptor.italicsVariant == variant || fontDescriptor.bolditalicsVariant == variant)
                    return true;
                else
                    return false;
            else
                return false;
        }
    },
    mounted() {
        this.loadGoogleFonts();
        this.loadFontFaces();
    }
}
</script>
