import { createSelector } from 'reselect'

const getLoading = (state) => state.loading

export const getLoadingStatus = createSelector(
  getLoading, getLoading => Object.keys(getLoading).filter(k => getLoading[k]).length > 0
)

const getErrors = (state) => state.errors

export const makeGetErrorMessages = (actions) => {
  return createSelector(
    getErrors, getErrors => {
      return actions.map(a => getErrors[a]).filter(e => e)[0]
    }
  )
}