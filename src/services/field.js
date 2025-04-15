import Api from './api';

export default {
    index(module,params) {
        return Api.get('/fields/'+module,params);
    }
}