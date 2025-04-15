export default {
    computed:{
        userActive:{
            get() {
                const data = localStorage.getItem('auth-profile');
                return data ? JSON.parse(data) : null;
            },
            set(value) {
                localStorage.setItem("auth-profile", JSON.stringify(value));
            }
        }
    },
    methods: {
        clearSession() {
            localStorage.clear();
        },
    }
}