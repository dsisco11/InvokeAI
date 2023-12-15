import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { roundToMultiple } from 'common/util/roundDownToMultiple';
import { ASPECT_RATIO_MAP } from 'features/imageSize/store/constants';
import { ImageSizeState } from 'features/imageSize/store/types';
import { calculateNewSize } from 'features/imageSize/util/calculateNewSize';

const initialImageSizeState: ImageSizeState = {
  aspectRatioID: '1:1',
  aspectRatio: 1,
  width: 512,
  height: 512,
  isLocked: false,
};

export const imageSizeSlice = createSlice({
  name: 'imageSize',
  initialState: initialImageSizeState,
  reducers: {
    aspectRatioSelected: (
      state,
      action: PayloadAction<ImageSizeState['aspectRatioID']>
    ) => {
      const aspectRatioID = action.payload;
      state.aspectRatioID = aspectRatioID;
      if (aspectRatioID === 'Free') {
        // If the new aspect ratio is free, we only unlock
        state.isLocked = false;
      } else {
        // The new aspect ratio not free, so we need to coerce the size & lock
        state.isLocked = true;
        const aspectRatio = ASPECT_RATIO_MAP[aspectRatioID].ratio;
        state.aspectRatio = aspectRatio;
        const { width, height } = calculateNewSize(
          aspectRatio,
          state.width,
          state.height
        );
        state.width = width;
        state.height = height;
      }
    },
    dimensionsSwapped: (state) => {
      // We always invert the aspect ratio
      const aspectRatio = 1 / state.aspectRatio;
      state.aspectRatio = aspectRatio;
      if (state.aspectRatioID === 'Free') {
        // If the aspect ratio is free, we just swap the dimensions
        const oldWidth = state.width;
        const oldHeight = state.height;
        state.width = oldHeight;
        state.height = oldWidth;
      } else {
        // Else we need to calculate the new size
        const { width, height } = calculateNewSize(
          aspectRatio,
          state.width,
          state.height
        );
        state.width = width;
        state.height = height;
        // Update the aspect ratio ID to match the new aspect ratio
        state.aspectRatioID = ASPECT_RATIO_MAP[state.aspectRatioID].inverseID;
      }
    },
    widthChanged: (state, action: PayloadAction<ImageSizeState['width']>) => {
      const width = action.payload;
      let height = state.height;
      if (state.isLocked) {
        // When locked, we calculate the new height based on the aspect ratio
        height = roundToMultiple(width / state.aspectRatio, 8);
      } else {
        // Else we unlock, set the aspect ratio to free, and update the aspect ratio itself
        state.isLocked = false;
        state.aspectRatioID = 'Free';
        state.aspectRatio = width / height;
      }
      state.width = width;
      state.height = height;
    },
    heightChanged: (state, action: PayloadAction<ImageSizeState['height']>) => {
      const height = action.payload;
      let width = state.width;
      if (state.isLocked) {
        // When locked, we calculate the new width based on the aspect ratio
        width = roundToMultiple(height * state.aspectRatio, 8);
      } else {
        // Else we unlock, set the aspect ratio to free, and update the aspect ratio itself
        state.isLocked = false;
        state.aspectRatioID = 'Free';
        state.aspectRatio = width / height;
      }
      state.height = height;
      state.width = width;
    },
    isLockedToggled: (state) => {
      state.isLocked = !state.isLocked;
    },
    sizeReset: (state, action: PayloadAction<number>) => {
      return {
        ...initialImageSizeState,
        width: action.payload,
        height: action.payload,
      };
    },
  },
});

export const {
  aspectRatioSelected,
  dimensionsSwapped,
  widthChanged,
  heightChanged,
  isLockedToggled,
  sizeReset,
} = imageSizeSlice.actions;

export default imageSizeSlice.reducer;
