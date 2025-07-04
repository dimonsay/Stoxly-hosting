<template>
    <div class="page-title-wrapper">
        <div class="container">
            <div class="pageTitle">
                {{ title }}
            </div>
            <div class="pageDescription">
                {{ description }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.block {
    padding: 1% !important;
}
</style>

<script>
export default {
    name: 'PageTitle',
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
    },
}
</script>