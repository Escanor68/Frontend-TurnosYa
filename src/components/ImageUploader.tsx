"use client"

import type React from "react"
import { useState } from "react"
import { Upload, X } from "lucide-react"

interface ImageUploaderProps {
  initialImage?: string
  onImageChange: (imageUrl: string) => void
  className?: string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ initialImage, onImageChange, className = "" }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage || null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    // Verificar que sea una imagen
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido")
      return
    }

    // En una implementación real, aquí subirías el archivo a un servidor
    // Por ahora, creamos una URL temporal
    const imageUrl = URL.createObjectURL(file)
    setPreviewUrl(imageUrl)
    onImageChange(imageUrl)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onImageChange("")
  }

  return (
    <div className={`w-full ${className}`}>
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Vista previa"
            className="w-full h-48 object-cover rounded-md"
            onError={() => {
              setPreviewUrl("/placeholder.svg?height=192&width=384")
            }}
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center h-48 transition-colors ${
            isDragging ? "border-emerald-500 bg-emerald-50" : "border-gray-300 hover:border-emerald-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 text-center mb-2">Arrastra y suelta una imagen aquí o</p>
          <label className="cursor-pointer px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
            <span>Seleccionar archivo</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
