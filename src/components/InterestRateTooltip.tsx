import { type TooltipContentProps } from 'recharts';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split('-');
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
};

type InterestRateTooltipProps = Partial<TooltipContentProps<number, string>> & {
  color: string;
};

const InterestRateTooltip = ({ active, payload, color }: InterestRateTooltipProps) => {
  if (!active || !payload?.length) return null;

  const { date } = payload[0].payload as { date: string };

  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">{formatDate(date)}</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-xl font-semibold tabular-nums" style={{ color }}>
          {Number(payload[0].value).toFixed(2)}%
        </span>
      </p>
    </div>
  );
};

export default InterestRateTooltip;
