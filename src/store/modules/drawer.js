const state = {
    drawers: []
};

const getters = {
    drawers: state => state.drawers
};

const mutations = {
    removeDrawers(state) {
        state.drawers = [];
    },
    addDrawer(state, drawer) {
        state.drawers.push(drawer);
    },
    closeDrawer(state) {
        if (state.drawers[state.drawers.length - 1].props.isSearch) {
            state.drawers.pop();
        }
        state.drawers.pop();
    },
    removeDrawer(state, index) {
        state.drawers = state.drawers.filter((item, itemIndex) => {
            return itemIndex != index;
        });
    }
};

const actions = {
    removeDrawer({ commit }, index) {
        commit('removeDrawer', index);
    }
};

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}