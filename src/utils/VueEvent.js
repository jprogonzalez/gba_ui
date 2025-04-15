import Vue from 'vue';
class VueEvent {
    constructor() {
        this.vue = new Vue();
    }
    fire(event, data = null) {
        this.vue.$emit(event, data);
    }
    listen(event, callback) {
        this.vue.$on(event, callback);
    }
    unlisten(event, callback) {
        this.vue.$off(event, callback);
    }
}

export default VueEvent;