import InterestRateTooltip from '@/components/InterestRateTooltip';

import hufInterestRate from '@/data/huf-interest-rate.json';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CHART_COLOR = '#2563eb';

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

const data = hufInterestRate;

const maxPoint = data.reduce((a, b) => (b.rate > a.rate ? b : a));
const minPoint = data.reduce((a, b) => (b.rate < a.rate ? b : a));

const formatWhen = (point: { date: string }) => {
  const [year, month, day] = point.date.split('-');
  return `${Number(day)} ${MONTHS_SHORT[Number(month) - 1]} ${year}`;
};

const InterestRatePage = () => {
  return (
    <section>
      <h1>HUF Interest Rate</h1>
      <p>Hungarian central bank interest rate (1990-2026)</p>
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
                return `${MONTHS_SHORT[Number(month) - 1]} ${year}`;
              }}
            />
            <YAxis unit="%" domain={[0, 30]} />
            <Tooltip
              content={<InterestRateTooltip color={CHART_COLOR} />}
              cursor={{ stroke: CHART_COLOR, strokeOpacity: 0.35 }}
              isAnimationActive={false}
              animationDuration={0}
            />
            <Line
              type="stepAfter"
              dataKey="rate"
              name="Interest rate"
              stroke={CHART_COLOR}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <dl className="flex gap-10">
        <div className="flex flex-col gap-1">
          <dt className="text-xs text-muted-foreground">Highest</dt>
          <dd className="font-semibold text-foreground">
            {maxPoint.rate.toFixed(2)}%{' '}
            <span className="font-normal text-muted-foreground">({formatWhen(maxPoint)})</span>
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-xs text-muted-foreground">Lowest</dt>
          <dd className="font-semibold text-foreground">
            {minPoint.rate.toFixed(2)}%{' '}
            <span className="font-normal text-muted-foreground">({formatWhen(minPoint)})</span>
          </dd>
        </div>
      </dl>
    </section>
  );
};

export default InterestRatePage;
