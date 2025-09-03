// src/pages/AsteroidsPage.tsx
// 近地小行星主页面：Ant Design 科技感重构 + 最大化注释
// 含 Feed区间查询、Browse分页、Lookup ID精查，代码完全类型安全、UI分区强烈、业务体验极佳

import React, { useState } from "react";
import { useAsteroid } from "../features/asteroid/useAsteroid";
import AsteroidList from "../components/AsteroidList";
import {
  Card, Input, DatePicker, Button, Space, Typography, message, Row, Col
} from "antd";
import { SearchOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

// ======================== 样式常量 ============================
const mainBg = {
  background: "linear-gradient(120deg, #0a153a 0%, #22153a 80%)",
  minHeight: "100vh",
  paddingBottom: 40
};
const cardBg = "rgba(255,255,255,0.98)";
const neonCyan = "#1effea";
const neonBlue = "#3289ff";
const neonYellow = "#ffe359";
const neonPurple = "#8f6fff";

// ======================= 主组件实现 ==========================
const AsteroidsPage: React.FC = () => {
  // Feed区间查询控件状态
  const [feedRange, setFeedRange] = useState<[string, string] | null>(null);
  // Lookup输入控件状态
  const [lookupInput, setLookupInput] = useState<string>("");

  // 业务 hooks（来自自定义hooks，负责全部后端数据交互及分页等业务操作）
  const {
    feedParams, setFeedParams, feedResult,
    browseResult, browsePage, setBrowsePage,
    lookupResult, setLookupId,
    status, error
  } = useAsteroid();

  // ========== 数据安全处理（类型安全 & 业务健壮性） ==========

  // Feed接口：区间内小行星合并为扁平数组，若数据不存在则兜底空数组，保证后续渲染类型安全
  const feedAsteroids: any[] = Array.isArray(feedResult?.near_earth_objects)
    ? feedResult.near_earth_objects
    : feedResult?.near_earth_objects
      ? Object.values(feedResult.near_earth_objects).flat()
      : [];

  // Browse接口：分页结果安全兜底
  const browseAsteroids: any[] = browseResult?.near_earth_objects ?? [];

  // Browse接口：当前是否有下一页（有总页数则严格判断）
  const browseHasNext: boolean =
    typeof browseResult?.page?.total_pages === "number"
      ? browsePage + 1 < browseResult.page.total_pages
      : true;

  // ============ 交互逻辑实现 =============

  // Feed区间查询按钮回调
  const handleFeedQuery = () => {
    if (!feedRange || !feedRange[0] || !feedRange[1]) {
      message.warning("请先选择起止日期");
      return;
    }
    setFeedParams({ startDate: feedRange[0], endDate: feedRange[1] });
  };

  // Lookup按键回调
  const handleLookup = () => {
    if (!lookupInput.trim()) {
      message.warning("请输入 Asteroid JPL id");
      return;
    }
    setLookupId(lookupInput.trim());
  };

  // =============== UI 渲染区块实现（每个业务分区独立注释说明） ===============

  return (
    <div style={mainBg}>
      {/* ==================== 页面主标题区 ==================== */}
      <div style={{ textAlign: "center", padding: "42px 0 8px 0" }}>
        <Title
          level={2}
          style={{
            color: neonCyan,
            fontWeight: 800,
            letterSpacing: 3,
            textShadow: "0 0 18px #6efcff, 0 0 36px #3289ff, 0 0 2px #fff"
          }}
        >
          ☄️ NASA 近地小行星数据库
        </Title>
        <div style={{ color: neonYellow, opacity: 0.90, fontWeight: 500, fontSize: 18 }}>
          区间批量、单ID精查与全量分页
        </div>
      </div>

      {/* ==================== 查询区块 ==================== */}
      <div style={{ maxWidth: 1100, margin: "42px auto 22px auto" }}>
        <Card
          style={{
            background: cardBg,
            borderRadius: 26,
            boxShadow: `0 8px 44px ${neonCyan}26, 0 0 2px ${neonBlue}22`,
            border: `2.5px solid ${neonCyan}`,
            marginBottom: 8
          }}
          bodyStyle={{ padding: 28 }}
        >
          <Row gutter={[40, 24]} align="middle" wrap>
            {/* Feed区间批量查询控件 */}
            <Col flex="340px">
              <div style={{ color: "#222", fontWeight: 800, fontSize: 17 }}>区间批量查询</div>
              {/* 日期区间选择控件：AntD RangePicker，禁用未来 */}
              <RangePicker
                allowClear
                style={{
                  width: 230,
                  marginTop: 12,
                  background: "#f5fcff",
                  border: `2px solid ${neonBlue}`
                }}
                format="YYYY-MM-DD"
                placeholder={["起始日期", "终止日期"]}
                value={feedRange ? [dayjs(feedRange[0]), dayjs(feedRange[1])] : undefined}
                onChange={dates => {
                  if (dates && dates[0] && dates[1]) {
                    setFeedRange([dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")]);
                  } else {
                    setFeedRange(null);
                  }
                }}
                disabledDate={d => d && d > dayjs()}
              />
              {/* 查询按钮 */}
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleFeedQuery}
                style={{
                  marginTop: 12,
                  background: neonBlue,
                  border: "none",
                  fontWeight: 800,
                  boxShadow: `0 2px 16px ${neonBlue}44`
                }}
              >查询区间</Button>
            </Col>
            {/* Lookup单ID查询控件 */}
            <Col flex="300px">
              <div style={{ color: "#222", fontWeight: 800, fontSize: 17 }}>ID精确查询</div>
              <Input.Group compact>
                <Input
                  style={{
                    width: 170,
                    marginTop: 12,
                    background: "#fafdff",
                    border: `2px solid ${neonYellow}`
                  }}
                  placeholder="输入 Asteroid JPL id"
                  value={lookupInput}
                  onChange={e => setLookupInput(e.target.value)}
                  maxLength={15}
                  allowClear
                  onPressEnter={handleLookup}
                />
                <Button
                  type="default"
                  icon={<SearchOutlined />}
                  onClick={handleLookup}
                  style={{
                    marginTop: 12,
                    background: neonYellow,
                    fontWeight: 700,
                    color: "#181c2c",
                    border: `2px solid ${neonYellow}`,
                    boxShadow: `0 2px 12px ${neonYellow}77`
                  }}
                >Lookup</Button>
              </Input.Group>
            </Col>
            {/* 区块可扩展，支持添加重置按钮等 */}
          </Row>
        </Card>
      </div>

      {/* =================== 结果区 =================== */}
      <div style={{ maxWidth: 1160, margin: "26px auto 0 auto" }}>
        {/* 状态提示/异常 */}
        {status === "loading" && (
          <Card style={{
            margin: "12px 0 22px 0", textAlign: "center", borderRadius: 14,
            background: "rgba(38,245,238,0.16)", color: neonCyan, fontWeight: 800, fontSize: 19
          }}>
            加载中...
          </Card>
        )}
        {error && (
          <Card style={{
            margin: "12px 0 22px 0", textAlign: "center", borderRadius: 14,
            background: "rgba(255,64,64,0.14)", color: "#e22", fontWeight: 800, fontSize: 19
          }}>
            发生错误: {error}
          </Card>
        )}

        {/* Feed区间结果 */}
        {feedAsteroids.length > 0 && (
          <>
            <Title level={4} style={{ color: neonBlue, fontWeight: 900, margin: "18px 0 8px 0" }}>
              区间内近地小行星（Feed接口）
            </Title>
            <AsteroidList asteroids={feedAsteroids} />
          </>
        )}

        {/* Lookup结果 */}
        {lookupResult && (
          <>
            <Title level={4} style={{ color: neonYellow, fontWeight: 900, margin: "24px 0 8px 0" }}>
              指定ID查询结果（Lookup接口）
            </Title>
            <AsteroidList asteroids={[lookupResult]} />
          </>
        )}

        {/* Browse分页结果 */}
        {browseAsteroids.length > 0 && (
          <>
            <Title level={4} style={{ color: neonPurple, fontWeight: 900, margin: "26px 0 8px 0" }}>
              浏览全体数据（Browse接口）
            </Title>
            <AsteroidList asteroids={browseAsteroids} />
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: 22, marginTop: 18
            }}>
              {/* 上一页按钮，禁用时透明度降低 */}
              <Button
                icon={<LeftOutlined />}
                style={{
                  borderRadius: "999px 0 0 999px",
                  background: neonPurple,
                  color: "#fff",
                  border: "none",
                  fontWeight: 900,
                  opacity: browsePage <= 0 ? 0.45 : 1
                }}
                disabled={browsePage <= 0}
                onClick={() => setBrowsePage(browsePage - 1)}
              >上一页</Button>
              {/* 当前页码高亮 */}
              <span style={{
                background: "#201a35",
                color: neonCyan,
                fontSize: 20,
                fontWeight: 900,
                minWidth: 56,
                height: 48,
                lineHeight: "48px",
                display: "inline-block",
                borderTop: `2.5px solid ${neonYellow}`,
                borderBottom: `2.5px solid ${neonCyan}`
              }}>{browsePage + 1}</span>
              {/* 下一页按钮，禁用时透明度降低 */}
              <Button
                icon={<RightOutlined />}
                style={{
                  borderRadius: "0 999px 999px 0",
                  background: neonPurple,
                  color: "#fff",
                  border: "none",
                  fontWeight: 900,
                  opacity: !browseHasNext ? 0.45 : 1
                }}
                disabled={!browseHasNext}
                onClick={() => setBrowsePage(browsePage + 1)}
              >下一页</Button>
            </div>
          </>
        )}

        {/* 全部无数据时的友好提示 */}
        {status !== "loading"
          && !error
          && !feedAsteroids.length
          && !lookupResult
          && !browseAsteroids.length && (
            <Card style={{
              textAlign: "center", borderRadius: 15, margin: "44px 0",
              background: "rgba(255,255,255,0.84)", color: "#222", fontSize: 18, fontWeight: 700
            }}>
              暂无可展示的小行星数据，请尝试其它区间/ID或切换分页
            </Card>
          )}
      </div>
    </div>
  );
};

export default AsteroidsPage;
