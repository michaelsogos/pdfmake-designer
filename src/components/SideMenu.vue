<template>
    <v-list class="primary lighten-3">
        <v-list-item @click="onShowOption(option.DESIGNER_OPTIONS )">
            <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Designer Options</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onShowOption(option.TOOLBOX)">
            <v-list-item-icon>
                <v-icon>mdi-hammer-wrench</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Toolbox</v-list-item-title>
        </v-list-item>

        <v-list-group prepend-icon="mdi-circle" value="true">
            <template v-slot:activator>
                <v-list-item-title>Users</v-list-item-title>
            </template>

            <v-list-group no-action sub-group value="true">
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>Admin</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item v-for="(admin, i) in admins" :key="i" link>
                    <v-list-item-title v-text="admin[0]"></v-list-item-title>
                    <v-list-item-icon>
                        <v-icon v-text="admin[1]"></v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list-group>

            <v-list-group sub-group>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>Actions</v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item v-for="(crud, i) in cruds" :key="i" @click="onChangeDesignerGrid">
                    <v-list-item-title v-text="crud[0]"></v-list-item-title>
                    <v-list-item-action>
                        <v-icon v-text="crud[1]"></v-icon>
                    </v-list-item-action>
                </v-list-item>
            </v-list-group>
        </v-list-group>
    </v-list>
</template>

<script>
import $ from "../store/types";
import $opt from "../components/options/index";

export default {
    name: "sidemenu",
    data: () => ({
        option: $opt,
        admins: [
            ['Management', 'mdi-circle'],
            ['Settings', 'mdi-circle'],
        ],
        cruds: [
            ['Create', 'mdi-circle'],
            ['Read', 'mdi-circle'],
            ['Update', 'mdi-circle'],
            ['Delete', 'mdi-circle'],
        ],
    }),
    methods: {
        onChangeDesignerGrid() {
            this.$store.dispatch($.actions.DESIGNER_CHANGE_GRIDSIZE, "10mm");
        },
        onShowOption(optionComponentName) {
            this.$store.commit($.mutations.APP_SET_OPTIONCOMPONENT, optionComponentName);
        }
    }
}
</script>