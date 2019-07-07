import axios from 'axios';                  // import axios for getting data from API

const IP = 'http://192.168.6.181:3000';     // IP Backend

/*=========================================*
 *=============== N O T E S ===============*
 *=========================================*/

export const getNotes = (data) => { // data values : sort, search, _selectedCategory
    return {
        type: 'GET_NOTES',
        payload: axios.get(`${IP}/notes?sort=${data.sort}&search=${data.search}&category_id=${data.selectedCategory}`)
    }
}

export const getMore = (data) => { // data values : sort, search, _selectedCategory
    return {
        type: 'GET_NOTES',
        payload: axios.get(`${IP}/notes?sort=${data.sort}&search=${data.search}&category_id=${data.selectedCategory}`)
    }
}

export const getMoreNotes = (data) => { // data values : nextPage, sort, search, _selectedCategory
    return {
        type: 'GET_MORE_NOTES',
        payload: axios.get(`${IP}/notes?sort=${data.sort}&page=${data.nextPage}&search=${data.search}&category_id=${data.selectedCategory}`)
    }
}

export const insertNotes = (data) => {
    return {
        type: 'INSERT_NOTES',
        payload: axios.post(`${IP}/notes`,data)
    }
}

export const updateNotes = (data) => {
    return {
        type: 'UPDATE_NOTES',
        payload: axios.patch(`${IP}/notes/${data.id}`,data)
    }
}

export const deleteNotes = (id) => {
    return {
        type: 'DELETE_NOTES',
        payload: axios.delete(`${IP}/notes/${id}`)
    }
}


/*===================================================*
 *=============== C A T E G O R I E S ===============*
 *===================================================*/

export const getCategories = () => {
    return {
        type: 'GET_CATEGORIES',
        payload: axios.get(`${IP}/categories`)
    }
}

export const insertCategories = (data) => {
    return {
        type: 'INSERT_CATEGORIES',
        payload: axios.post(`${IP}/categories`,data)
    }
}

export const deleteCategories = (id) => {
    return {
        type: 'DELETE_CATEGORIES',
        payload: axios.delete(`${IP}/categories/${id}`)
    }
}