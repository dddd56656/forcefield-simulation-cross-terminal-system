// src/api/asteroidApi.ts
// Asteroids - NeoWs API 封装：feed, lookup, browse

import axios from "axios";

/** 近地小行星单体对象主结构（部分字段） */
export interface Asteroid {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: { estimated_diameter_min: number; estimated_diameter_max: number };
    meters: { estimated_diameter_min: number; estimated_diameter_max: number };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    miss_distance: { kilometers: string };
    orbiting_body: string;
    relative_velocity: { kilometers_per_hour: string };
  }>;
}

/** NeoFeed API 返回主结构 */
export interface AsteroidFeedResult {
  element_count: number;
  near_earth_objects: Record<string, Asteroid[]>; // key 为日期字符串
}

/** Browse API 主结构（部分字段） */
export interface AsteroidBrowseResult {
  page: { number: number; size: number; total_elements: number; total_pages: number };
  near_earth_objects: Asteroid[];
}

/** Lookup API 主结构 */
export type AsteroidLookupResult = Asteroid;

const API_KEY = "eTbSn8D7bpJt9HeuzPrJYVE1kPKDCsw1zJh6vOsP";
const BASE_URL = "https://api.nasa.gov/neo/rest/v1";

/**
 * 查询区间内的所有近地小行星（Feed接口）
 */
export async function fetchAsteroidsFeed(
  startDate: string,
  endDate: string
): Promise<AsteroidFeedResult> {
  const res = await axios.get(`${BASE_URL}/feed`, {
    params: { start_date: startDate, end_date: endDate, api_key: API_KEY }
  });
  return res.data;
}

/**
 * 分页浏览全体小行星数据（Browse接口）
 */
export async function browseAsteroids(page: number = 0): Promise<AsteroidBrowseResult> {
  const res = await axios.get(`${BASE_URL}/neo/browse`, {
    params: { page, api_key: API_KEY }
  });
  return res.data;
}

/**
 * 通过 JPL id 查询单个小行星详细信息（Lookup接口）
 */
export async function lookupAsteroidById(id: string): Promise<AsteroidLookupResult> {
  const res = await axios.get(`${BASE_URL}/neo/${id}`, {
    params: { api_key: API_KEY }
  });
  return res.data;
}
