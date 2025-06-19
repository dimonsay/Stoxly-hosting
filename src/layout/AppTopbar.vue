<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref } from 'vue';
import AppBreadcrumb from './AppBreadcrumb.vue';
import AppSidebar from './AppSidebar.vue';

const { onMenuToggle, showConfigSidebar, showSidebar } = useLayout();
const searchInput = ref(null);
const searchActive = ref(false);

const onMenuButtonClick = () => {
    onMenuToggle();
};

const activateSearch = () => {
    searchActive.value = true;
    setTimeout(() => {
        searchInput.value.$el.focus();
    }, 100);
};
const deactivateSearch = () => {
    searchActive.value = false;
};
const onConfigButtonClick = () => {
    showConfigSidebar();
};
const onSidebarButtonClick = () => {
    showSidebar();
};
</script>

<template>
    <div class="layout-topbar">
        <div class="topbar-start">
            <Button ref="menubutton" type="button" class="topbar-menubutton p-trigger" @click="onMenuButtonClick">
                <i class="pi pi-bars"></i>
            </Button>

            <div class="topbar-breadcrumb">
                <AppBreadcrumb />
            </div>
        </div>
        <div class="layout-topbar-menu-section">
            <AppSidebar />
        </div>
        <div class="topbar-end">
            <ul class="topbar-menu">
                <li class="!hidden lg:!block">
                    <div class="topbar-search" :class="{ 'topbar-search-active': searchActive }">
                        <Button icon="pi pi-search" class="topbar-searchbutton text-surface-500 dark:text-surface-400 flex-shrink-0" severity="secondary" text rounded type="button" @click="activateSearch"></Button>
                        <div class="search-input-wrapper">
                            <IconField>
                                <InputIcon class="pi pi-search" />
                                <InputText ref="searchInput" type="text" placeholder="Search" @blur="deactivateSearch" @keydown.escape="deactivateSearch" />
                            </IconField>
                        </div>
                    </div>
                </li>

                <li class="profile-item topbar-item">
                    <Button type="button" icon="pi pi-bell" class="text-surface-500 dark:text-surface-400 flex-shrink-0" severity="secondary" text rounded></Button>
                </li>

                <li class="profile-item topbar-item">
                    <Button type="button" icon="pi pi-comment" class="relative text-surface-500 dark:text-surface-400 flex-shrink-0" severity="secondary" text rounded></Button>
                </li>

                <li class="ml-4">
                    <Button type="button" icon="pi pi-cog" class="text-surface-500 dark:text-surface-400 flex-shrink-0" severity="secondary" text rounded @click="onConfigButtonClick"></Button>
                </li>

                <li ref="profile" class="profile-item topbar-item">
                    <a v-styleclass="{ selector: '@next', enterFromClass: '!hidden', enterActiveClass: 'animate-scalein', leaveToClass: '!hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }" class="cursor-pointer">
                        <img class="rounded-full" src="/layout/images/avatar/avatar-m-1.jpg" />
                    </a>

                    <ul class="topbar-menu active-topbar-menu !p-6 w-60 z-50 !hidden rounded">
                        <li role="menuitem" class="!m-0 !mb-4">
                            <a
                                href="#"
                                class="flex items-center hover:text-primary-500 duration-200"
                                v-styleclass="{ selector: '@grandparent', enterFromClass: '!hidden', enterActiveClass: 'animate-scalein', leaveToClass: '!hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                            >
                                <i class="pi pi-fw pi-lock mr-2"></i>
                                <span>Privacy</span>
                            </a>
                        </li>

                        <li role="menuitem" class="!m-0 !mb-4">
                            <a
                                href="#"
                                class="flex items-center hover:text-primary-500 duration-200"
                                v-styleclass="{ selector: '@grandparent', enterFromClass: '!hidden', enterActiveClass: 'animate-scalein', leaveToClass: '!hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                            >
                                <i class="pi pi-fw pi-cog mr-2"></i>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li role="menuitem" class="!m-0">
                            <a
                                href="#"
                                class="flex items-center hover:text-primary-500 duration-200"
                                v-styleclass="{ selector: '@grandparent', enterFromClass: '!hidden', enterActiveClass: 'animate-scalein', leaveToClass: '!hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                            >
                                <i class="pi pi-fw pi-sign-out mr-2"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="right-panel-button relative !hidden lg:!block">
                    <Button type="button" label="Today" style="width: 5.7rem" icon="pi pi-bookmark" class="layout-rightmenu-button !hidden md:!inline-flex font-normal" @click="onSidebarButtonClick"></Button>
                    <Button type="button" icon="pi pi-bookmark" class="layout-rightmenu-button !block md:!hidden font-normal" @click="onSidebarButtonClick"></Button>
                </li>
            </ul>
        </div>
    </div>
</template>
