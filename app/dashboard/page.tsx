import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/dashboard/file-upload"
import { ReportSummary } from "@/components/dashboard/report-summary"
import { QASection } from "@/components/dashboard/qa-section"
import { TimelineGraph } from "@/components/dashboard/timeline-graph"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Report Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportSummary />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ask Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <QASection />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Health Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <TimelineGraph />
        </CardContent>
      </Card>
    </div>
  )
}

