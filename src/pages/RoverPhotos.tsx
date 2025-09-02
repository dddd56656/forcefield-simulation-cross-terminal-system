// src/pages/MarsRoverPage.tsx
// 火星探测车照片主页面 - Ant Design 版本
// 该页面负责整个“火星照片浏览”业务的入口展示、参数查询、筛选控制、分页、manifest 信息与主图片网格的渲染。
// 所有布局及交互元素均采用 antd 组件，整体科技感、炫酷渐变风格。

import React, { useState } from "react";
import { useMarsRover } from "../features/marsRover/useMarsRover"; // 业务 hooks，统一管理数据状态和操作方法
import MarsRoverPhotoGrid from "../components/MarsRoverPhotoGrid"; // 火星照片网格组件
import { CAMERA_OPTIONS } from "../api/marsRoverApi"; // 相机选项列表

// Ant Design 主要控件（表单、布局、按钮、图标、文字等）
import {
  Card,        // 卡片容器，承担主要分块、半透明背景
  Select,      // 下拉选择
  InputNumber, // 数字输入框
  DatePicker,  // 日期选择器
  Button,      // 按钮
  Row, Col,    // 布局系统
  Typography,  // 大标题、字体样式
  Space,       // 间隔/对齐
  Tag          // 标签
} from "antd";
import {
  ReloadOutlined,     // 刷新（重置）图标
  LeftOutlined,       // 左翻页
  RightOutlined       // 右翻页
} from "@ant-design/icons";
import dayjs from "dayjs"; // 日期处理

const { Option } = Select;
const { Title } = Typography;

// 支持的火星探测车列表（中英文显示，便于后续扩展）
const roverList = [
  { value: "curiosity", label: "好奇号 Curiosity" },
  { value: "opportunity", label: "机会号 Opportunity" },
  { value: "spirit", label: "勇气号 Spirit" }
];

// 页面渐变背景，提升整体科技感
const bgGradient = {
  background: "linear-gradient(135deg, #1f1c2c 0%, #232526 100%)",
  minHeight: "100vh",
  paddingBottom: 40
};

// 霓虹文字风格，用于主标题
const neonText = {
  color: "#39c5bb",
  textShadow: "0 0 8px #39c5bb,0 0 32px #004E92,0 0 2px #fff"
};

/**
 * MarsRoverPage
 * 火星车照片业务主页面
 * 1. 参数筛选区（查询、重置）—— 使用 antd Card+Row+Col 布局
 * 2. 任务（manifest）基本信息区
 * 3. 图片网格展示区
 * 4. 分页按钮
 * 5. 状态与异常提示
 */
const MarsRoverPage: React.FC = () => {
  // 解构出业务状态及所有操作函数（自定义hooks封装，保证组件瘦、易测、易维护）
  const {
    rover,          // 当前火星车
    sol,            // 当前 Sol（日）
    earth_date,     // 当前地球日期
    camera,         // 当前相机类型
    page,           // 当前页码
    photos,         // 当前照片数组
    manifest,       // 当前火星车任务 manifest
    status,         // 当前数据加载状态
    error,          // 当前异常信息
    setRover,       // 设置火星车
    setSol,         // 设置 Sol
    setEarthDate,   // 设置地球日期
    setCamera,      // 设置相机类型
    setPage,        // 设置分页
    resetFilters    // 重置所有筛选
  } = useMarsRover();

  // 本地 state，用于暂存 Sol 输入（避免输入和提交瞬时不同步）
  const [inputSol, setInputSol] = useState<number | undefined>(sol ?? undefined);

  // 处理 sol 输入和业务同步
  const handleSolChange = (v: number | null) => {
    setInputSol(v ?? undefined);
    setSol(v === null ? null : v);
  };

  /**
   * 渲染参数筛选区
   * - 卡片化/半透明/阴影背景，视觉隔离，便于专注
   * - 每个参数都有 label + 控件，支持全部组合筛选
   */
  const renderFilters = (
    <Card
      bordered={false}
      style={{
        borderRadius: 24,
        boxShadow: "0 8px 40px #003b4a40",
        backdropFilter: "blur(8px)",    // 毛玻璃背景，提升科技感
        background: "rgba(26,29,50,0.70)"
      }}
      bodyStyle={{ padding: 24 }}
    >
      <Row gutter={24} align="middle" wrap>
        {/* 1. 火星车选择 */}
        <Col>
          <span style={{ color: "#a8cfff", fontWeight: 600 }}>探测车</span>
          <Select
            value={rover}
            onChange={setRover}
            style={{ width: 140, marginLeft: 12 }}
            dropdownStyle={{
              background: "rgba(255,255,255,0.90)",        // 半透明白，玻璃感
              backdropFilter: "blur(12px)",                // 毛玻璃效果（现代浏览器支持）
              boxShadow: "0 6px 24px 2px #60e6ff55",       // 气氛蓝色阴影，提升科技感
              border: "1.5px solid #39c5bb",               // 高亮蓝绿色描边
              color: "#181c2c",                            // 菜单项文字深色，清晰可读
            }}
          >
            {roverList.map(r => (
              <Option value={r.value} key={r.value}>{r.label}</Option>
            ))}
          </Select>
        </Col>
        {/* 2. Sol（日）输入 */}
        <Col>
          <span style={{ color: "#a8cfff", fontWeight: 600 }}>Sol（日）</span>
          <InputNumber
            min={0}
            max={manifest?.photo_manifest.max_sol}
            value={inputSol}
            onChange={handleSolChange}
            style={{ width: 100, marginLeft: 12 }}
            placeholder="Sol"
          />
        </Col>
        {/* 3. 地球日期 */}
        <Col>
          <span style={{ color: "#a8cfff", fontWeight: 600 }}>地球日期</span>
          <DatePicker
            allowClear
            format="YYYY-MM-DD"
            value={earth_date ? dayjs(earth_date) : undefined}
            maxDate={manifest?.photo_manifest.max_date ? dayjs(manifest.photo_manifest.max_date) : undefined}
            onChange={d => setEarthDate(d ? d.format("YYYY-MM-DD") : null)}
            style={{ width: 140, marginLeft: 12 }}
            inputReadOnly
          />
        </Col>
        {/* 4. 相机选择 */}
        <Col>
          <span style={{ color: "#a8cfff", fontWeight: 600 }}>相机</span>
          <Select
            allowClear
            placeholder="全部"
            value={camera || undefined}
            onChange={v => setCamera(v || null)}
            style={{ width: 140, marginLeft: 12 }}
            dropdownStyle={{
              background: "rgba(255,255,255,0.90)",        // 半透明白，玻璃感
              backdropFilter: "blur(12px)",                // 毛玻璃效果（现代浏览器支持）
              boxShadow: "0 6px 24px 2px #60e6ff55",       // 气氛蓝色阴影，提升科技感
              border: "1.5px solid #39c5bb",               // 高亮蓝绿色描边
              color: "#181c2c",                            // 菜单项文字深色，清晰可读
            }}          >
            {CAMERA_OPTIONS.map(cam => (
              <Option key={cam.value} value={cam.value}>{cam.label}</Option>
            ))}
          </Select>
        </Col>
        {/* 5. 重置筛选按钮 */}
        <Col>
          <Button
            icon={<ReloadOutlined />}
            onClick={resetFilters}
            style={{
              background: "rgba(57,197,187,0.16)",
              color: "#39c5bb",
              fontWeight: 600,
              border: "none"
            }}
            size="middle"
          >
            重置
          </Button>
        </Col>
      </Row>
    </Card>
  );

  /**
   * 渲染任务 manifest 基本信息
   * - 每次切换火星车后同步更新
   * - 使用 Tag 和高亮色突出关键信息
   */
  const renderManifest = manifest && (
    <Card
      style={{
        margin: "32px 0 16px 0",
        borderRadius: 20,
        boxShadow: "0 4px 18px #003b4a36",
        background: "rgba(37,43,61,0.85)"
      }}
      bodyStyle={{ padding: 18, color: "#aafcff" }}
      size="small"
    >
      <Space wrap size={16}>
        <Tag color="cyan">Rover: {manifest.photo_manifest.name}</Tag>
        <Tag color="blue">状态: {manifest.photo_manifest.status}</Tag>
        <span>着陆: <b>{manifest.photo_manifest.landing_date}</b></span>
        <span>最新 Sol: <b>{manifest.photo_manifest.max_sol}</b></span>
        <span>照片总数: <b>{manifest.photo_manifest.total_photos}</b></span>
      </Space>
    </Card>
  );

  /**
   * 渲染加载状态和异常提示
   * - 仅在 loading 或 error 时显示
   * - 颜色风格高对比、易于用户察觉
   */
  const renderStatus = (
    <>
      {status === "loading" && (
        <div style={{
          color: "#39c5bb", marginBottom: 16, fontWeight: 600
        }}>
          🚀 加载中...
        </div>
      )}
      {error && (
        <div style={{
          color: "#ff5555", marginBottom: 16, fontWeight: 600
        }}>
          加载失败: {error}
        </div>
      )}
    </>
  );

  /**
   * 渲染分页控制
   * - 左右按钮+当前页高亮
   * - 采用大圆角科技风格
   */
  const renderPagination = (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
      {/* 上一页 */}
      <Button
        icon={<LeftOutlined />}
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page <= 1}
        size="large"
        style={{ borderRadius: "999px 0 0 999px" }}
      >上一页</Button>
      {/* 当前页码 */}
      <span style={{
        background: "#23253a",
        color: "#39c5bb",
        fontSize: 20,
        minWidth: 52,
        lineHeight: "48px",
        display: "inline-block",
        borderTop: "1px solid #39c5bb33",
        borderBottom: "1px solid #39c5bb33"
      }}>{page}</span>
      {/* 下一页 */}
      <Button
        icon={<RightOutlined />}
        onClick={() => setPage(page + 1)}
        size="large"
        style={{ borderRadius: "0 999px 999px 0", marginLeft: -1 }}
      >下一页</Button>
    </div>
  );

  /**
   * 页面主结构
   * - 背景为深色渐变（仿星空、科技感）
   * - 标题带霓虹发光
   * - 查询/信息区均为半透明玻璃态，主要内容居中
   * - 各区块留白合理，响应式布局适配大屏
   */
  return (
    <div style={bgGradient}>
      {/* 页面主标题 */}
      <div style={{ textAlign: "center", marginBottom: 42, marginTop: 16 }}>
        <Title level={2} style={neonText}>🚀 NASA 火星探测车照片库</Title>
        <div style={{
          color: "#aafcff",
          letterSpacing: 1,
          marginTop: 6,
          fontWeight: 400,
          opacity: 0.82
        }}>
          “AI 火星探索体验站 · 超高分辨率图片实时浏览”
        </div>
      </div>
      {/* 参数查询与筛选区 */}
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>{renderFilters}</div>
      {/* Manifest 任务信息区 */}
      <div style={{ maxWidth: 1020, margin: "0 auto" }}>{renderManifest}</div>
      {/* 加载/异常状态区 */}
      <div style={{ maxWidth: 960, margin: "0 auto" }}>{renderStatus}</div>
      {/* 照片网格区（建议内部也升级为科技风格卡片，支持 hover 放大/发光） */}
      <div style={{ maxWidth: 1240, margin: "0 auto", marginTop: 24 }}>
        <MarsRoverPhotoGrid photos={photos} />
      </div>
      {/* 分页控制区 */}
      <div style={{ maxWidth: 760, margin: "0 auto" }}>{renderPagination}</div>
    </div>
  );
};

export default MarsRoverPage;
