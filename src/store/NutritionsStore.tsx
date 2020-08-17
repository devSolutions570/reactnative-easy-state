import { store } from '@risingstack/react-easy-state'
import { Nutrition } from '../types/types'

let datas: Nutrition[] = [];

const nutritions = store({
    all: datas,
    create: (nutrition: Nutrition) => {
        let nutritionObject: Nutrition = nutritions.all[nutritions.all.length-1];
        if (nutritions.all.length === 0) {
            nutrition.id = 0;    
        } else {
            nutrition.id = nutritionObject.id + 1;
        }
        nutritions.all.push(nutrition);
    },
    update: (id: number, nutrition: Nutrition) => {
        nutritions.all[id] = nutrition;
    },
    delete: (id: number) => {
        let index = nutritions.all.findIndex((obj: Nutrition) => obj.id === id);
        nutritions.all.splice(index, 1);
    },
    reset: () => {
        nutritions.all = [];
    },
});

export default nutritions;