import { createSlice, configureStore } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    value: []
  },
  reducers: {
      Add: (state , action) => {
          state.value = [ ...state.value,action.payload];
          console.log(state.value);

      },
      View: (state , action) => {
          state.value = action.payload;
          console.log(state.value);
      },
      Delete: (state , action) => {
          state.value = state.value.filter(task => task.id !== action.payload);
          console.log(state.value);
      },
      Update: (state, action) => {
          state.value = state.value.filter(task => task.id !== action.payload.id);
          state.value = [...state.value, action.payload];
          console.log(state.value);

      }
  }
})

export const { Add, View , Delete ,Update} = taskSlice.actions
export default taskSlice.reducer