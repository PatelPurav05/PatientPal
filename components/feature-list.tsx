import { Check } from "lucide-react"

const features = [
  "Learn more about your reports by asking AI to explain everything in your records",
  "Get insights about your health status",
  "Ask our AI team health tips that might be good for you",
]

export function FeatureList() {
  return (
    <ul className="space-y-4">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3">
          <div className="rounded-full bg-green-400/20 p-1">
            <Check className="w-4 h-4 text-green-400" />
          </div>
          <span className="text-white/80">{feature}</span>
        </li>
      ))}
    </ul>
  )
}

