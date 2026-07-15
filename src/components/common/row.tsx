interface RowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function Row({ icon, label, value }: RowProps) {
  return (
    <div className="grid gap-1">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
