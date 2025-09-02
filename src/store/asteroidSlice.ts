// src/store/asteroidSlice.ts
// 负责全局状态：feed/browse/lookup 的结果与查询参数
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAsteroidsFeed,
  browseAsteroids,
  lookupAsteroidById,
  AsteroidFeedResult,
  AsteroidBrowseResult,
  Asteroid
} from "../api/asteroidApi";

type AsteroidState = {
  // 查询参数
  feedParams: { startDate: string; endDate: string };
  browsePage: number;
  lookupId: string | null;
  // 数据
  feedResult: AsteroidFeedResult | null;
  browseResult: AsteroidBrowseResult | null;
  lookupResult: Asteroid | null;
  // 状态
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: AsteroidState = {
  feedParams: { startDate: "", endDate: "" },
  browsePage: 0,
  lookupId: null,
  feedResult: null,
  browseResult: null,
  lookupResult: null,
  status: "idle",
  error: null,
};

// Feed查询
export const getAsteroidsFeed = createAsyncThunk(
  "asteroid/getFeed",
  async (params: { startDate: string; endDate: string }) => {
    return await fetchAsteroidsFeed(params.startDate, params.endDate);
  }
);

// Browse分页
export const getAsteroidsBrowse = createAsyncThunk(
  "asteroid/getBrowse",
  async (page: number) => {
    return await browseAsteroids(page);
  }
);

// Lookup
export const getAsteroidLookup = createAsyncThunk(
  "asteroid/getLookup",
  async (id: string) => {
    return await lookupAsteroidById(id);
  }
);

const asteroidSlice = createSlice({
  name: "asteroid",
  initialState,
  reducers: {
    setFeedParams(state, action) {
      state.feedParams = action.payload;
    },
    setBrowsePage(state, action) {
      state.browsePage = action.payload;
    },
    setLookupId(state, action) {
      state.lookupId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Feed
      .addCase(getAsteroidsFeed.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsteroidsFeed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feedResult = action.payload;
      })
      .addCase(getAsteroidsFeed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Feed查询失败";
      })
      // Browse
      .addCase(getAsteroidsBrowse.fulfilled, (state, action) => {
        state.browseResult = action.payload;
      })
      // Lookup
      .addCase(getAsteroidLookup.fulfilled, (state, action) => {
        state.lookupResult = action.payload;
      });
  }
});

export const { setFeedParams, setBrowsePage, setLookupId } = asteroidSlice.actions;
export default asteroidSlice.reducer;
