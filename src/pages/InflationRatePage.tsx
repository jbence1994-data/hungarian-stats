import InflationTooltip from '@/components/InflationTooltip';

import inflation from '@/data/inflation.json';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CHART_COLOR = '#16a34a';

const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const data = inflation.map((point) => ({
  ...point,
  date: `${point.year}-${String(point.month).padStart(2, '0')}`,
}));

const InflationRatePage = () => {
  return (
    <section>
      <h1>Inflation Rate</h1>
      <p>Monthly consumer price inflation (1961-2026)</p>
      <div className="h-80 w-full overflow-x-auto">
        <ResponsiveContainer width={Math.max(data.length * 26, 640)} height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={56}
              tickMargin={8}
              tick={{ fontSize: 10 }}
              tickFormatter={(value: string) => {
                const [year, month] = value.split('-');
                return month === '01'
                  ? `${MONTHS_SHORT[0]} ${year}`
                  : MONTHS_SHORT[Number(month) - 1];
              }}
            />
            <YAxis unit="%" />
            <Tooltip
              content={<InflationTooltip color={CHART_COLOR} />}
              cursor={{ stroke: CHART_COLOR, strokeOpacity: 0.35 }}
              isAnimationActive={false}
              animationDuration={0}
            />
            <Line
              type="monotone"
              dataKey="sum.prevYear"
              name="Inflation rate"
              stroke={CHART_COLOR}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default InflationRatePage;
