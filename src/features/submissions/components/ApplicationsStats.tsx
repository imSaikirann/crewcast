type Props = {
  totalApplications: number;
  filteredApplications: number;
  views: number;
  averageScore: number;
  topScore: number;
};

export default function ApplicationsStats({
  totalApplications,
  filteredApplications,
  views,
  averageScore,
  topScore,
}: Props) {
  const conversion = views > 0 ? Math.round((totalApplications / views) * 100) : 0;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <Metric label="Views" value={views.toLocaleString()} helper="Job page visits" />
      <Metric
        label="Applications"
        value={totalApplications.toLocaleString()}
        helper={`${filteredApplications} in current view`}
      />
      <Metric label="Conversion" value={`${conversion}%`} helper="Apply rate" />
      <Metric label="Average score" value={`${averageScore}/100`} helper="GitHub signal" />
      <Metric label="Top score" value={`${topScore}/100`} helper="Best candidate" />
    </div>
  );
}

function Metric({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-lg border bg-background px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
    </div>
  );
}

