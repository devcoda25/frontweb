// Import necessary modules
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { store } from '../store'
import { getCategoriesApi, getNews } from 'src/utils/api'
import moment from 'moment'
import { apiCallBegan } from '../actions/apiActions'

// Initial state with some default data
const initialState = {
    loading: false,
    lastFetch: null,
    categories: [],
    Lang: null,

}

// Create a Redux slice
export const CategoriesDataSlice = createSlice({
    name: 'categoryData',
    initialState,
    reducers: {

        categoriesRequested: (state, action) => {
            state.loading = true;
        },
        categoriesSuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload.data;
            state.lastFetch = Date.now();
            state.Lang = action.request
        },
        categoriesFailed: (state, action) => {
            state.loading = false;
            state.categories = [];
        },
        categoriesUpdateLanguage: (state, action) => {
            if (state.Lang) {
                state.Lang.language_id = action.payload
            }
        },
    }
})

export const {
    setCatNavData,
    categoriesRequested,
    categoriesSuccess,
    categoriesFailed,
    categoriesUpdateLanguage } = CategoriesDataSlice.actions
export default CategoriesDataSlice.reducer


export const loadCatNavData = data => {
    store.dispatch(setCatNavData({ data }))
}


// API CALLS
export const loadCategories = ({
    offset = "",
    limit = "",
    language_id = "",
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { }
}) => {
    const state = store.getState()
    const { currentLanguage } = store.getState().languages
    const { lastFetch, Lang } = store.getState().categoryData ?? {};
    const diffInMinutes = lastFetch ? moment().diff(moment(lastFetch), 'minutes') : process.env.NEXT_PUBLIC_LOAD_MIN + 1
    // If API data is fetched within last 10 minutes then don't call the API again
    if (currentLanguage?.id != Lang?.language_id || diffInMinutes > process.env.NEXT_PUBLIC_LOAD_MIN || isManualRefresh()) {
        store.dispatch(
            apiCallBegan({
                ...getCategoriesApi(offset, limit, language_id),
                displayToast: false,
                onStartDispatch: categoriesRequested.type,
                onSuccessDispatch: categoriesSuccess.type,
                onErrorDispatch: categoriesFailed.type,
                onStart,
                onSuccess,
                onError,
            })
        );
    }
};

// Helper function to check if the page has been manually refreshed
const isManualRefresh = () => {
    const manualRefresh = sessionStorage.getItem("manualRefresh");
    sessionStorage.removeItem("manualRefresh");
    return manualRefresh === "true";
};

// Event listener to set manualRefresh flag when page is manually refreshed
if (typeof window !== 'undefined') {
    window.addEventListener("load", () => {
        if (navigator.userAgent.includes("Mozilla")) {
            // This is likely a manual refresh
            sessionStorage.setItem("manualRefresh", "true");
        } else {
            // This is the initial page load
            sessionStorage.removeItem("manualRefresh");
        }
    });
}

export const categoriesCacheData = createSelector(
    (state) => state.categoryData,
    (categoryData) => categoryData.categories
);