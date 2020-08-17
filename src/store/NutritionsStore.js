import { store } from '@risingstack/react-easy-state'

const nutritions = store({
    all: [],
    create: (nutrition) => {
        if (nutritions.all.length === 0) {
            nutrition.id = 0;    
        } else {
            nutrition.id = nutritions.all[nutritions.all.length-1].id + 1;
        }
        nutritions.all.push(nutrition);
    },
    update: (id, nutrition) => {
        nutritions.all[id] = nutrition;
    },
    delete: (id) => {
        index = nutritions.all.findIndex(obj => obj.id === id);
        nutritions.all.splice(index, 1);
    },
    reset: () => {
        nutritions.all = [];
    },
});

export default nutritions;