<template>
    <spinner></spinner>
</template>

<script type="text/babel">
    import {mapMutations} from 'vuex';
    import Spinner from '~/components/Spinner.vue';

    export default {
        components: {
            Spinner
        },
        data() {
            return {
                loading: false
            }
        },
        methods: {
            ...mapMutations(['closeNavMenu', 'busyOn', 'busyOff']),
            start() {
                this.busyOn();
            },
            finish() {
                this.closeNavMenu();
                setTimeout(this.busyOff, 500);
            }
        }
    }
</script>
