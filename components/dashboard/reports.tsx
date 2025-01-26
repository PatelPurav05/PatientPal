"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllFiles, getFile } from "@/lib/indexedDB"
import { useToast } from "@/components/ui/use-toast"

interface Report {
  id: string
  name: string
  size: number
  uploadedAt: string
}

export function Reports() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const files = await getAllFiles()
        setReports(files)
      } catch (error) {
        console.error("Error fetching reports:", error)
        toast({
          title: "Error",
          description: "Failed to fetch reports. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [toast])

  const handleDownload = async (id: string, fileName: string) => {
    try {
      const file = await getFile(id)
      if (file) {
        const url = URL.createObjectURL(file)
        const a = document.createElement("a")
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        throw new Error("File not found")
      }
    } catch (error) {
      console.error("Error downloading file:", error)
      toast({
        title: "Error",
        description: "Failed to download file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return <div>Loading reports...</div>
  }

  return (
    <div className="space-y-4">
      {reports.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No reports uploaded yet</p>
            <p className="text-sm text-muted-foreground">Upload your first report using the form above</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-start justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate" title={report.name}>
                      {report.name}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2 text-sm">
                  <p className="text-muted-foreground">Size: {formatFileSize(report.size)}</p>
                  <p className="text-muted-foreground">Uploaded: {formatDate(report.uploadedAt)}</p>
                  <Button variant="secondary" className="mt-2" onClick={() => handleDownload(report.id, report.name)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

