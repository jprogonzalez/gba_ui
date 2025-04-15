import Api from './api';

export default {
    store(data) {
        return Api.post("/media",data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
}