import { cn } from "@/lib/utils"
import { PUBLICATIONS } from "@/lib/constants"

export function PublicationLogos() {
  return (
    <div className="mt-16 flex justify-center items-center max-w-4xl mx-auto">
      {PUBLICATIONS.map((pub, index) => (
        <div
          key={pub.name}
          className={cn(
            "text-white/50 hover:text-white/70 transition-colors text-lg md:text-xl p-2",
            pub.style,
            index !== PUBLICATIONS.length - 1 ? "mr-8 md:mr-12" : "",
          )}
        >
          {pub.name}
        </div>
      ))}
    </div>
  )
}

