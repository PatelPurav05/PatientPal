"use client"

import { useState } from "react"
import { Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { saveFile } from "@/lib/indexedDB"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function FileUpload({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        })
        return
      }
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        })
        return
      }
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    try {
      await saveFile(file)

      toast({
        title: "Success",
        description: "File uploaded successfully",
      })

      setFile(null)
      if (onUploadSuccess) onUploadSuccess()
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="file">Upload PDF</Label>
        <Input id="file" type="file" accept=".pdf" onChange={handleFileChange} className="cursor-pointer" />
        <p className="text-sm text-muted-foreground">Maximum file size: 5MB</p>
      </div>
      {file && (
        <div className="flex items-center gap-2">
          <Button onClick={handleUpload} disabled={uploading} className="w-full sm:w-auto">
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Report
              </>
            )}
          </Button>
          <p className="text-sm text-muted-foreground">Selected: {file.name}</p>
        </div>
      )}
    </div>
  )
}

