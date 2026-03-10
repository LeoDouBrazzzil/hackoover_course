import { configureStore as configureRedux } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"

import reducer from "store/reducer"

const store = configureRedux({ reducer })


// window.addEventListener("resetAuth", () => {
//   log.debug("RECEIVED: resetAuth event")
//   store.dispatch(action.auth.resetAuth())
// })

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()
// @ts-ignore
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector
/*
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector
*/
export { store }
