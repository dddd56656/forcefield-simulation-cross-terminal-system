// src/api/apodApi.ts
// NASA APOD（Astronomy Picture of the Day）API服务封装
import axios from "axios";

/**
 * NASA APOD API 响应数据结构
 */
export interface ApodResponse {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: "image" | "video";
  service_version: string;
  title: string;
  url: string;
}

/**
 * 获取当天或指定日期的天文每日一图
 * @param date 可选，格式 yyyy-mm-dd
 */
export const fetchApod = async (date?: string): Promise<ApodResponse> => {
  const apiKey = "eTbSn8D7bpJt9HeuzPrJYVE1kPKDCsw1zJh6vOsP";
  const baseUrl = "https://api.nasa.gov/planetary/apod";
  const params: Record<string, string> = { api_key: apiKey };
  if (date) params.date = date;

  // 调用NASA官方接口，返回APOD数据
  const response = await axios.get<ApodResponse>(baseUrl, { params });
  return response.data;
};
