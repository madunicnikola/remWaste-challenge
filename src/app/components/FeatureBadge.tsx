
export default function FeatureBadge({ icon: Icon, label, color }: { icon: any, label: string, color?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium ${color ? color : "bg-zinc-800 text-zinc-200 border-zinc-700"}`}>
      <Icon className="w-4 h-4" />
      {label}
    </span>
  )
} 