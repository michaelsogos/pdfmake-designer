<template>
    <v-container fill-height fluid class="align-content-start ma-0 pa-0">
        <v-toolbar dense class="elevation-0 secondary mb-1">
            <v-icon left>mdi-database</v-icon>
            <v-toolbar-title class="body-1">Data Sources</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="onAddNewDataSource">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-toolbar>
        <div class="col-12">
            <v-list color="secondary lighten-3">
                <v-list-item
                    v-for="(item, index) in $store.state.datasources"
                    :key="index"
                    active-class="primary lighten-3"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{item.name}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon color="primary" @click="onShowDataSourceDialog(index)">
                            <v-icon>mdi-table-cog</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </div>
        <v-dialog v-model="showDataSourceDialog" v-if="showDataSourceDialog" fullscreen>
            <v-card>
                <v-card-title>Data Source Configurator</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="selectedDataSource.name"
                                    outlined
                                    dense
                                    label="Name"
                                    color="secondary"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="2"
                            >toolbox or to import dummy data or json example to make dynamically schema</v-col>
                            <v-col cols="2">properties selected branch</v-col>
                            <v-col cols="10" class="secondary lighten-4">
                                <v-treeview
                                    :items="selectedDataSource.definition"
                                    activatable
                                    item-key="id"
                                    item-text="name"
                                    open-on-click
                                    dense
                                >
                                    <template v-slot:prepend="{ item /*, open*/ }">
                                        <v-icon v-if="item.type == 'String'">mdi-alphabetical</v-icon>
                                        <v-icon v-else-if="item.type == 'Object'">mdi-code-json</v-icon>
                                        <v-icon v-else-if="item.type == 'Array'">mdi-code-brackets</v-icon>
                                        <v-icon v-else-if="item.type == 'Array'">mdi-code-brackets</v-icon>
                                        <v-icon v-else-if="item.type == 'Number'">mdi-numeric</v-icon>
                                        <v-icon v-else>mdi-help</v-icon>
                                    </template>

                                    <template v-slot:append="{ item /*, open*/ }">
                                        <v-menu
                                            left
                                            offset-y
                                            :close-on-content-click="false"
                                            v-if="item.type=='Object' || item.type=='Array'"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-btn icon v-on="on">
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-container class="white">
                                                <v-select
                                                    :items="types"
                                                    label="Type"
                                                    outlined
                                                    v-model="newProperty.type"
                                                >
                                                    <template v-slot:prepend-item="{item}">
                                                        <v-icon
                                                            v-if="item.text == 'String'"
                                                        >{{item.icon}}</v-icon>
                                                        <v-icon
                                                            v-else-if="item.text == 'Object'"
                                                        >mdi-code-json</v-icon>
                                                        <v-icon
                                                            v-else-if="item.text == 'Array'"
                                                        >mdi-code-brackets</v-icon>
                                                        <v-icon
                                                            v-else-if="item.text == 'Number'"
                                                        >mdi-numeric</v-icon>
                                                    </template>
                                                </v-select>
                                                <v-switch
                                                    v-model="newProperty.position"
                                                    inset
                                                    label="Before"
                                                ></v-switch>
                                                <v-btn text @click="onAddProperty(item)">Add</v-btn>
                                            </v-container>
                                        </v-menu>

                                        <v-btn icon>
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </template>
                                </v-treeview>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue darken-1" text @click="showDataSourceDialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="onSaveDataSource">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { DataSource } from '../../models/DataSource';
// import $ from "../../store/types";

export default {
    name: "datasources",
    data: () => ({
        /** @type {Boolean} */
        showDataSourceDialog: false,
        /** @type {Number} */
        selectedDataSourceIndex: null,
        /** @type {import("../../models/DataSource").DataSource} */
        selectedDataSource: null,
        types: [
            {
                text: "String",
                icon: "mdi-alphabetical"
            },
            {
                text: "Number",
                icon: "mdi-numeric"
            },
            {
                text: "Object",
                icon: "mdi-code-json"
            },
            {
                text: "Array",
                icon: "mdi-code-brackets"
            }
        ],
        newProperty: {
            type: null,
            position: null
        }
    }),
    methods: {
        onAddNewDataSource() {
            this.selectedDataSourceIndex = -1;
            this.selectedDataSource = new DataSource("dfdff");
            //FIXME: Example
            this.selectedDataSource.definition = [
                {
                    id: 1,
                    name: "StringField",
                    type: "String",
                    example: "hello world!"
                },
                {
                    id: 2,
                    name: "ObjectField",
                    type: "Object",
                    children: [
                        {
                            id: 3,
                            name: "NumberField",
                            type: "Number",
                            example: 1234
                        },
                        {
                            id: 4,
                            name: "ArrayField",
                            type: "Array",
                            children: [
                                {
                                    id: 5,
                                    name: "StringField",
                                    type: "String",
                                    example: "hello world!"
                                },
                                {
                                    id: 6,
                                    name: "ObjectField",
                                    type: "Object",
                                    children: [
                                        {
                                            id: 7,
                                            name: "NumberField",
                                            type: "Number",
                                            example: 1234
                                        },
                                        {
                                            id: 8,
                                            name: "ArrayField",
                                            type: "Array",
                                            children: [

                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                    ]
                }
            ];
            this.showDataSourceDialog = true;
        },
        onShowDataSourceDialog(index) {
            //TODO: Make dialog to configure datasource
            this.selectedDataSourceIndex = index;
            this.selectedDataSource = this.$store.state.datasources[index];
            //FIXME: Example
            this.selectedDataSource.definition = [
                {
                    name: "StringField",
                    type: "String",
                    example: "hello world!"
                },
                {
                    name: "ObjectField",
                    type: "Object",
                    properties: [
                        {
                            name: "NumberField",
                            type: "Number",
                            example: 1234
                        },
                        {
                            name: "ArrayField",
                            type: "Array",
                            items: [

                            ]
                        },
                    ]
                }
            ];
            this.showDataSourceDialog = true;
        },
        onSaveDataSource() {
            this.showDataSourceDialog = false;
            //TODO: Call action to save datasource
        },
        onAddProperty(item) {
            console.log(item);
            // let ff = null;
            // let ss = selectedDataSource.DataSource[0];
            // for (let prop in ss) {
            //     if (ss[prop].id == item.id) {
            //         ff;
            //     }
            // }
            item.children.push(
                {
                    id: 99,
                    name: "CICCIO",
                    type: "Number",
                    example: 1234
                });
        }
    },
    mounted() {

    }
}
</script>
