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

type InflationTooltipProps = Partial<TooltipContentProps<number, string>> & {
  color: string;
};

const InflationTooltip = ({ active, payload, color }: InflationTooltipProps) => {
  if (!active || !payload?.length) return null;

  const { year, month } = payload[0].payload as { year: number; month: number };
  const label = `${MONTHS[month - 1]} ${year}`;

  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-xl font-semibold tabular-nums" style={{ color }}>
          {Number(payload[0].value).toFixed(1)}%
        </span>
      </p>
    </div>
  );
};

export default InflationTooltip;
