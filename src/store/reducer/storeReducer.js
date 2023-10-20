import { 
    UPDATE_CATEGORY_FIELDS,
    ADD_NEW_CATEGORY,
    REMOVE_NEW_CATEGORY,
    UPDATE_CATEGORY_FIELD_TYPE,
    UPDATE_CATEGORY
} from "../action";
import MOCK_DATA from "../../mock/category.json";

const initState = { 
    category : [...MOCK_DATA.category]
};


function categoryReducer(state = initState, action) {
    switch (action.type) {
        case ADD_NEW_CATEGORY:{
            const { categoryItem } = action.payload || {};
            const newCategoryList = [...state.category];
            newCategoryList.push(categoryItem);
            return {
                ...state,
                category : newCategoryList
             }
        }
        case REMOVE_NEW_CATEGORY:{
            const { categoryId } = action.payload || {};
            const newCategoryList = [...state.category].filter(li => li?.id !== categoryId);
            return {
                ...state,
                category : newCategoryList
            }
        }
        case UPDATE_CATEGORY_FIELDS:{
            const { category } = action.payload || {};
            const newCategoryList = state.category.map(list => {
                let payload = {...list };
                if(category?.id === list?.id){
                    payload = { ...list, ...category };
                }
                return payload;
            });
            return {
                ...state,
                category : newCategoryList
            }
        }
        case UPDATE_CATEGORY_FIELD_TYPE :{
            const { categoryId, fieldIndex, updateField } = action.payload || {};

            const newCategoryList = state.category.map(list => {
                let payload = {...list };
                if(categoryId === list?.id){
                    payload.categoryFields = payload?.categoryFields?.map((fields, index) => {
                        let newFields = {...fields};
                        if(index === fieldIndex){
                            newFields = { ...newFields, ...updateField };
                        }
                        return newFields;
                    });                  
                }
                return payload;
            }); 
            return {
                ...state,
                category : newCategoryList
            }
        }
        case UPDATE_CATEGORY :{
            return {
                ...state,
                ...(action.payload || {})
            }
        }
        default:
            return state;
    }
}


export default categoryReducer;