export const userProfile = {
    computed:{
        profile() {
            let profileId      = 'hamptom-user-profile';
            let storageProfile = localStorage.getItem(profileId);
            let profile        = JSON.parse(storageProfile);
            return profile;
        }
    }
}