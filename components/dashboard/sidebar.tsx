import Link from "next/link"
import { Home, FileText, PieChart, MessageCircle, LogOut } from "lucide-react"

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: PieChart, label: "Analytics", href: "/dashboard/analytics" },
  { icon: MessageCircle, label: "Q&A", href: "/dashboard/qa" },
]

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-full shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">PatientPal</h2>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-6">
        <Link href="/auth/signout" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Link>
      </div>
    </div>
  )
}

