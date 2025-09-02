// src/features/asteroid/useAsteroid.ts
// hooks 统一业务逻辑（参数控制、自动查询、回调）
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAsteroidsFeed,
  getAsteroidsBrowse,
  getAsteroidLookup,
  setFeedParams,
  setBrowsePage,
  setLookupId
} from "../../store/asteroidSlice";

export function useAsteroid() {
  const dispatch = useAppDispatch();
  const {
    feedParams,
    browsePage,
    lookupId,
    feedResult,
    browseResult,
    lookupResult,
    status,
    error
  } = useAppSelector((state) => state.asteroid);

  // 自动拉取feed
  useEffect(() => {
    if (feedParams.startDate && feedParams.endDate) {
      dispatch(getAsteroidsFeed(feedParams));
    }
  }, [feedParams, dispatch]);

  // 自动拉取browse
  useEffect(() => {
    dispatch(getAsteroidsBrowse(browsePage));
  }, [browsePage, dispatch]);

  // 自动拉取lookup
  useEffect(() => {
    if (lookupId) {
      dispatch(getAsteroidLookup(lookupId));
    }
  }, [lookupId, dispatch]);

  return {
    feedParams,
    browsePage,
    lookupId,
    feedResult,
    browseResult,
    lookupResult,
    status,
    error,
    setFeedParams: (params: { startDate: string; endDate: string }) => dispatch(setFeedParams(params)),
    setBrowsePage: (page: number) => dispatch(setBrowsePage(page)),
    setLookupId: (id: string) => dispatch(setLookupId(id))
  };
}
