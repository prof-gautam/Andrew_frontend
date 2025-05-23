import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getSingleCourse = createAsyncThunk(
  'courseDetail/getSingleCourse',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/courses/${courseId}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Failed to fetch course');
      }

      const data = await response.json();
      console.log(data);    
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete course
export const deleteCourse = createAsyncThunk(
  'courseDetail/deleteSingleCourse',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/courses/${courseId}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Failed to fetch course');
      }

      const data = await response.json();
      console.log(data);    
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markCompleted = createAsyncThunk(
  'courseDetail/markCompleted',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/courses/${courseId}/mark-completed`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Failed to fetch course');
      }

      const data = await response.json();
      console.log(data);    
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const courseDetailSlice = createSlice({
  name: 'course',
  initialState: {
    course: {},    // Will all courses
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // You can add synchronous reducers if needed
    resetCourseDetailStatus: (state) => {
      state.status = 'reset';
      state.error = null;
    }

  },
  extraReducers: (builder) => {
    builder
     // Pending
     .addCase(deleteCourse.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    // Fulfilled
    .addCase(deleteCourse.fulfilled, (state, action) => {
      state.status = 'success';
      state.course = action.payload; // e.g. { token, userData } 
    })
    // Rejected
    .addCase(deleteCourse.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Unable to get courses';
    })
      // Pending
      .addCase(getSingleCourse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Fulfilled
      .addCase(getSingleCourse.fulfilled, (state, action) => {
        state.status = 'success';
        state.course = action.payload; // e.g. { token, userData } 
      })
      // Rejected
      .addCase(getSingleCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to get courses';
      })
      .addCase(markCompleted.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Fulfilled
      .addCase(markCompleted.fulfilled, (state, action) => {
        state.status = 'success';
        state.course = action.payload; // e.g. { token, userData } 
      })
      // Rejected
      .addCase(markCompleted.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to get courses';
      });
  },
});


// Export the reducer to add to your store
export const { resetCourseDetailStatus } = courseDetailSlice.actions;
export default courseDetailSlice.reducer;