"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import type { ResultLineChart as LineChartData } from "@/lib/types";

const DEFAULT_COLORS = ["#0d9488", "#6366f1", "#f43f5e", "#f59e0b", "#06b6d4"];

export function ResultLineChartView({
  data,
  variant = "line",
}: {
  data: LineChartData;
  variant?: "line" | "area";
}) {
  if (!data.points?.length || !data.series?.length) return null;

  const Chart = variant === "area" ? AreaChart : LineChart;

  return (
    <div className="mt-3 w-full min-w-0" data-chart>
      <p className="mb-1 text-[10px] text-muted sm:hidden">Swipe chart horizontally if needed →</p>
      <div className="h-48 sm:h-56 w-full min-w-0 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
        <div className="h-full w-full min-w-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <Chart
              data={data.points}
              margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey={data.xKey}
                tick={{ fontSize: 10, fill: "var(--muted)" }}
                stroke="var(--border)"
                interval="preserveStartEnd"
                minTickGap={16}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--muted)" }}
                stroke="var(--border)"
                width={40}
                tickFormatter={(v) =>
                  typeof v === "number" && Math.abs(v) >= 1000
                    ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k`
                    : String(v)
                }
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {data.series.map((s, i) => {
                const color = s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
                if (variant === "area") {
                  return (
                    <Area
                      key={s.key}
                      type="monotone"
                      dataKey={s.key}
                      name={s.label}
                      stroke={color}
                      fill={color}
                      fillOpacity={0.15}
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  );
                }
                return (
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.label}
                    stroke={color}
                    strokeWidth={2.25}
                    dot={false}
                    isAnimationActive={false}
                  />
                );
              })}
            </Chart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
