import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import {getAllServices , getAllRfq, getAllUserRfq} from '../../graphQl/queries'


// Define a type for the slice state
interface DRfqState {
  services: any,
  isLoadingServices: boolean,
  rfqs:any,
  isLoadingRfqs:boolean,
  userRfqs:any,
  isLoadingUserRfqs:boolean,
}

// Define the initial state using that type
const initialState: DRfqState = {
  services:[],
  isLoadingServices:false,
  rfqs:[],
  userRfqs:[],
  isLoadingRfqs:false,
  isLoadingUserRfqs:false,
}
export const reduxGetAllServices = createAsyncThunk(
  'dRfq/getAllServices',
  async () => {
    const response = await getAllServices();
    // console.log('responseService', response)
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const reduxGetAllRfqs = createAsyncThunk(
  'dRfq/getAllRfqs',
  async () => {
    const response = await getAllRfq();
    // The value we return becomes the `fulfilled` action payload
    // console.log('response', response)
    return response;
  }
);

export const reduxGetAllUserRfqs = createAsyncThunk(
  'dRfq/getAllUserRfqs',
  async (name:string) => {
    const response = await getAllUserRfq(name);
    // The value we return becomes the `fulfilled` action payload
    // console.log('response', response)
    return response;
  }
);


export const dRfqSlice = createSlice({
  name: 'dRfq',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    // Use the PayloadAction type to declare the contents of `action.payload`
    // getAllServicesR: (state, action: PayloadAction<number>) => {
    //   state.services += action.payload
    // }
  },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(reduxGetAllServices.pending, (state) => {
        state.isLoadingServices = true;
      })
      .addCase(reduxGetAllServices.fulfilled, (state, action) => {
        console.log('test', action.payload)
        state.isLoadingServices = false;
        state.services = action.payload;
      })
      .addCase(reduxGetAllServices.rejected, (state) => {
        state.isLoadingServices = false;
      })
     .addCase(reduxGetAllRfqs.pending, (state) => {
        state.isLoadingRfqs = true;
      })
      .addCase(reduxGetAllRfqs.fulfilled, (state, action) => {
        state.isLoadingServices = false;
        state.rfqs = action.payload;
      })
      .addCase(reduxGetAllRfqs.rejected, (state) => {
        state.isLoadingRfqs = false;
      })
     .addCase(reduxGetAllUserRfqs.pending, (state) => {
        state.isLoadingUserRfqs = true;
      })
      .addCase(reduxGetAllUserRfqs.fulfilled, (state, action) => {
        state.isLoadingUserRfqs = false;
        state.userRfqs = action.payload;
      })
      .addCase(reduxGetAllUserRfqs.rejected, (state) => {
        state.isLoadingUserRfqs = false;
      });      
  },
})

// export const { getAllServicesR } = dRfqSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectServices = (state: RootState) => state.drfq.services;
export const selectRfqs = (state: RootState) => state.drfq.rfqs;
export const selectUserRfqs = (state: RootState) => state.drfq.userRfqs;
export const selectLoadingUserRfqs =(state: RootState) => state.drfq.isLoadingUserRfqs;
export const selectLoadingRfqs =(state: RootState) => state.drfq.isLoadingRfqs;
export const selectLoadingServices =(state: RootState) => state.drfq.isLoadingServices;

export default dRfqSlice.reducer