import { 
    ADD_NEW_PRODUCT,
    REMOVE_NEW_PRODUCT,
    UPDATE_PRODUCT_TITLES,
    UPDATE_PRODUCT_FIELDS,
} from "../action";

import MOCK_PRODUCT from "../../mock/product.json";

const initState = { 
    product : [...MOCK_PRODUCT.product]
};


function productReducer(state = initState, action) {
    switch (action.type) {
        case ADD_NEW_PRODUCT:{
            const productList = [...state.product];
            productList.push(action.payload);
            return {
                ...state,
                product : productList
             }
        }
        case REMOVE_NEW_PRODUCT:{
            const { productId } = action.payload || {};
            const productList = [...state.product].filter(li => li?.id !== productId);
            return {
                ...state,
                product : productList
            }
        }
        case UPDATE_PRODUCT_FIELDS :{
            const { productId, fields } = action.payload || {};
            let productClone = [...state.product].map(li => {
                let obj = { ...li};
                if(obj.id === productId){
                    obj.productFields = fields;
                }
                return obj;
            })
            return {
                ...state,
                product : productClone
            }
        }
        case UPDATE_PRODUCT_TITLES :{
            const { productTitle } = action.payload || {};
            let productClone = [...state.product].map(li => {
                let obj = { ...li};
                obj.productTitle = productTitle;
                return obj;
            })
            return {
                ...state,
                product : productClone
            }
        }
        default:
            return state;
    }
}


export default productReducer;