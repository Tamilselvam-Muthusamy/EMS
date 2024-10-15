import { Skeleton } from "@mantine/core";

export const statsColors = {
  primary: "from-sky-400 to-sky-600",
  pink: "from-pink-400 to-pink-600",
  orange: "from-orange-400 to-orange-600",
  indigo: "from-indigo-400 to-indigo-600",
  amber: "from-amber-400 to-amber-600",
  blue: "from-blue-400 to-blue-600",
  green: "from-emerald-400 to-emerald-600",
  violet: "from-violet-400 to-violet-600",
  cyan: "from-cyan-400 to-cyan-600",
  gray: "from-slate-400 to-slate-600",
  red: "from-red-400 to-red-600",
};
export const statsShapes = {
  diamond: "mask is-diamond",
  octagon: "mask is-octagon",
  star: "mask is-star",
  star2: "mask is-star-2",
  hexagon: "mask is-hexagon",
  hexagon2: "mask is-hexagon-2",
  squircle: "mask is-squircle",
  triangle: "mask is-reuleaux-triangle",
};

export type StatsColor = keyof typeof statsColors;
export type StatsShape = keyof typeof statsShapes;

export interface StatsCardProps {
  title: string;
  value: string;
  color: StatsColor;
  shape: StatsShape;
}

export const StatsCard = ({ title, value, color }: StatsCardProps) => {
  return (
    <div
      className={`transition ease-in-out delay-50  duration-200 relative flex flex-col overflow-hidden rounded-md bg-gradient-to-br ${statsColors[color]} p-3.5`}
    >
      <div
        className={`text-sm uppercase text-white font-medium tracking-wider`}
      >
        {title}
      </div>
      <div className="flex items-end justify-between space-x-2">
        <div
          className={
            title.match("Date")
              ? "mt-3 mb-4 text-sm font-semibold text-white"
              : "mt-2 text-4xl font-semibold text-white"
          }
        >
          {value.length > 0 ? (
            value
          ) : (
            <Skeleton height={12} width={50} opacity={10} radius="xl" mb="xl" />
          )}
        </div>
      </div>
    </div>
  );
};
