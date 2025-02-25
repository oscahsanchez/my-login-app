import { useRef, useState } from "react"

interface UseFileInputProps {
  accept?: string
  maxSize?: number // in MB
}

export function useFileInput({ accept, maxSize = 5 }: UseFileInputProps = {}) {
  const [fileName, setFileName] = useState<string>("")
  const [fileSize, setFileSize] = useState<number>(0)
  const [error, setError] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  function validateAndSetFile(file: File) {
    setError("")

    if (accept) {
      const fileType = file.type
      const acceptedTypes = accept.split(",").map((type) => type.trim())
      const isAccepted = acceptedTypes.some((type) => {
        if (type.endsWith("/*")) {
          const baseType = type.split("/")[0]
          return fileType.startsWith(`${baseType}/`)
        }
        return type === fileType
      })

      if (!isAccepted) {
        setError(`File type must be ${accept}`)
        return
      }
    }

    if (maxSize && file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    setFileName(file.name)
    setFileSize(file.size)
  }

  function clearFile() {
    setFileName("")
    setFileSize(0)
    setError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return {
    fileName,
    fileSize,
    error,
    fileInputRef,
    validateAndSetFile,
    clearFile,
  }
} 