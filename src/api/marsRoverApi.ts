// src/api/marsRoverApi.ts
// 统一封装火星探测车（Mars Rover）照片与任务 API 请求，便于其他模块直接调用
import axios from "axios";

/**
 * 相机选项映射表
 * value: 相机缩写，用于接口参数
 * label: 中文全称，用于前端下拉菜单显示
 */
export const CAMERA_OPTIONS = [
  { value: "FHAZ", label: "前置危险规避相机" },           // Front Hazard Avoidance Camera
  { value: "RHAZ", label: "后置危险规避相机" },           // Rear Hazard Avoidance Camera
  { value: "MAST", label: "桅杆相机" },                   // Mast Camera
  { value: "CHEMCAM", label: "化学与相机综合仪" },        // Chemistry and Camera Complex
  { value: "MAHLI", label: "火星手持透镜成像仪" },        // Mars Hand Lens Imager
  { value: "MARDI", label: "火星降落成像仪" },            // Mars Descent Imager
  { value: "NAVCAM", label: "导航相机" },                 // Navigation Camera
  { value: "PANCAM", label: "全景相机" },                 // Panoramic Camera
  { value: "MINITES", label: "微型热辐射光谱仪" }         // Miniature Thermal Emission Spectrometer
];

/**
 * 火星照片数据结构定义
 * 用于类型约束和 IDE 自动补全
 */
export interface MarsPhoto {
  id: number;                    // 照片唯一标识
  sol: number;                   // 拍摄火星日
  camera: {
    id: number;                  // 相机ID
    name: string;                // 相机缩写
    full_name: string;           // 相机英文全称
  };
  img_src: string;               // 图片URL
  earth_date: string;            // 拍摄地球日期
  rover: {
    id: number;                  // 探测车ID
    name: string;                // 探测车名称
    landing_date: string;        // 着陆日期
    launch_date: string;         // 发射日期
    status: string;              // 探测车状态
  };
}

/**
 * 单日任务清单结构体（manifest 某一天）
 */
export interface RoverManifestPhotoEntry {
  sol: number;           // 火星日
  total_photos: number;  // 当日总照片数
  cameras: string[];     // 当天使用过的相机缩写
}

/**
 * 探测车任务元数据结构（manifest 响应结构）
 */
export interface RoverManifest {
  photo_manifest: {
    name: string;                 // 探测车名称
    landing_date: string;         // 着陆日期
    launch_date: string;          // 发射日期
    status: string;               // 当前状态
    max_sol: number;              // 最大火星日
    max_date: string;             // 最晚地球日期
    total_photos: number;         // 总照片数
    photos: RoverManifestPhotoEntry[]; // 按火星日分组照片信息
  };
}

/**
 * 获取火星探测车照片列表（主接口）
 * @param rover 探测车名称 'curiosity' | 'opportunity' | 'spirit'
 * @param params 查询参数对象
 *        sol        指定火星日（可选）
 *        earth_date 指定地球日期（可选）
 *        camera     指定相机缩写（可选）
 *        page       分页页码（可选）
 * @returns Promise<MarsPhoto[]> 照片数组
 */
export async function fetchMarsPhotos(
  rover: string,
  params: {
    sol?: number;         // 火星日
    earth_date?: string;  // 地球日期（YYYY-MM-DD）
    camera?: string;      // 相机缩写
    page?: number;        // 页码
  }
): Promise<MarsPhoto[]> {
  const apiKey = "eTbSn8D7bpJt9HeuzPrJYVE1kPKDCsw1zJh6vOsP"; // NASA API Key
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;
  const { sol, earth_date, camera, page } = params;
  // 构造 API 查询参数，自动过滤 undefined 字段
  const query: Record<string, any> = { api_key: apiKey };
  if (sol !== undefined) query.sol = sol;
  if (earth_date) query.earth_date = earth_date;
  if (camera) query.camera = camera;
  if (page) query.page = page;
  // 发送 GET 请求，返回照片列表
  const res = await axios.get(url, { params: query });
  // 返回照片数组，供前端渲染
  return res.data.photos;
}

/**
 * 获取指定探测车的全部任务清单（manifest，含每一天照片数）
 * @param rover 探测车名称 'curiosity' | 'opportunity' | 'spirit'
 * @returns Promise<RoverManifest> 任务元数据对象
 */
export async function fetchRoverManifest(rover: string): Promise<RoverManifest> {
  const apiKey = "eTbSn8D7bpJt9HeuzPrJYVE1kPKDCsw1zJh6vOsP"; // NASA API Key
  const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}`;
  // 发送 GET 请求，获取探测车任务清单
  const res = await axios.get(url, { params: { api_key: apiKey } });
  // 返回任务 manifest 结构体
  return res.data;
}

