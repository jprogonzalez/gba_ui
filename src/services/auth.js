import Api from './api';

export default {
    logout() {
        return Api.post('logout');
    }
}