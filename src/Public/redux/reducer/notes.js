
const initialState = {
    results             : [],
    page                : '',
    nextPage            : '',
    sort                : '',
    search              : '',
    selectedCategory    : '',
    isLoading           : false,
    isError             : false,
    data                : [],
    dataCategory        : [],
}

// create a reducer for getting network from RESTful API
export default notes = (state = initialState, action) => {
    let tempData = state;
    switch(action.type){

       /*=========================================*
        *=============== N O T E S ===============*
        *=========================================*/

        case 'GET_NOTES_PENDING': // in case when loading get data
            return {
                ...state,
                isLoading   : true
            }
        case 'GET_NOTES_REJECTED': // in case error network/else
            return {
                ...state,
                isLoading   : false,
                isError     : true,
            }
        case 'GET_NOTES_FULFILLED': // in case successfuly get data
            return {
                ...state,
                isLoading        : false,
                isError          : false,
                page             : action.payload.data.page,
                nextPage         : parseInt(action.payload.data.page)+1,
                sort             : action.payload.data.sort,
                search           : action.payload.data.search,
                selectedCategory : action.payload.data.category,
                data             : action.payload.data.value
            }

        // case 'GET_MORE_NOTES_PENDING': // in case when loading get data
        //     return {
        //         ...state,
        //         isLoading   : true
        //     }
        // case 'GET_MORE_NOTES_REJECTED': // in case error network/else
        //     return {
        //         ...state,
        //         isLoading   : false,
        //         isError     : true,
        //     }

        case 'GET_MORE_NOTES_FULFILLED': // in case successfuly get data
            return {
                ...state,
                isLoading        : false,
                isError          : false,
                page             : action.payload.data.page,
                nextPage         : parseInt(action.payload.data.page)+1,
                sort             : action.payload.data.sort,
                search           : action.payload.data.search,
                selectedCategory : action.payload.data.category,
                data             : [...state.data, ...action.payload.data.value]
            }

        //INSERT NOTES
        case 'INSERT_NOTES_PENDING':
            return {
                ...state,
                isLoading   : true,
            };
        case 'INSERT_NOTES_REJECTED':
            return {
                ...state,
                isLoading   : false,
                isError     : true,
            };
        case 'INSERT_NOTES_FULFILLED':
            return {
                ...state,
                isLoading   : false,
                data        : [ ...action.payload.data.value,...state.data]
            };

        //UPDATE NOTES
        case 'UPDATE_NOTES_PENDING':
            return {
                ...state,
                isLoading   : true,
            };
        case 'UPDATE_NOTES_REJECTED':
            return {
                ...state,
                isLoading   : false,
                isError     : true,
            };
        case 'UPDATE_NOTES_FULFILLED':
                for (let i = 0; i < tempData.data.length; i++) {
                    if (tempData.data[i].id == action.payload.data.value[0].id) {
                        tempData.data[i].title          = action.payload.data.value[0].title;
                        tempData.data[i].note           = action.payload.data.value[0].note;
                        tempData.data[i].category       = action.payload.data.value[0].category;
                        tempData.data[i].category_id    = action.payload.data.value[0].category_id;
                        tempData.data[i].created_at     = action.payload.data.value[0].created_at;
                        tempData.data[i].updated_at     = action.payload.data.value[0].updated_at;
                    }
                }
            return {
                ...state,
                isLoading   : false,
            };    


            //DELETE NOTES
        case 'DELETE_NOTES_PENDING':
            return {
                ...state,
                isLoading   : true,
            };
        case 'DELETE_NOTES_REJECTED':
            return {
                ...state,
                isLoading   : false,
                isError     : true,
            };
        case 'DELETE_NOTES_FULFILLED':
            return {
                ...state,
                isLoading   : false,
                data        : [...state.data.filter(data => data.id != action.payload.data.id)]
            };


       /*===================================================*
        *=============== C A T E G O R I E S ===============*
        *===================================================*/

        //GET CATEGORIES
        /**/
        case 'GET_CATEGORIES_PENDING': // in case when loading get data
            return {
                ...state,
                isLoading   : true
            }
        case 'GET_CATEGORIES_REJECTED': // in case error network/else
            return {
                ...state,
                isLoading   : false,
                isError     : true,
            }
        case 'GET_CATEGORIES_FULFILLED': // in case successfuly get data
            return {
                ...state,
                isLoading   : false,
                isError     : false,
                dataCategory: action.payload.data.value
            }


        //INSERT CATEGORIES
        case 'INSERT_CATEGORIES_PENDING':
            return {
                ...state,
                isLoading   : true,
            };
        case 'INSERT_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading   : false,
                isError     : true,
            };
        case 'INSERT_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading       : false,
                dataCategory    : [ ...action.payload.data.value, ...state.dataCategory]
            };

        //DELETE CATEGORIES
        case 'DELETE_CATEGORIES_PENDING':
            return {
                ...state,
                isLoading   : true,
            };
        case 'DELETE_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading   : false,
                isError     : true,
            };
        case 'DELETE_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading       : false,
                dataCategory    : [...state.dataCategory.filter(data => data.id != action.payload.data.id)]
            };

        default:
            return state;
    }
}