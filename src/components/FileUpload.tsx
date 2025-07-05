'use client'

import { useState, useRef } from 'react'
import { Paperclip, X, Image, FileText } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
  modelSupportsImages: boolean
}

export default function FileUpload({ onFileSelect, selectedFile, modelSupportsImages }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    
    if (file) {
      // Check file type
      const isImage = file.type.startsWith('image/')
      const isText = file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')
      
      if (!modelSupportsImages && isImage) {
        alert('This model does not support image uploads. Please select a text file or switch to a vision-capable model.')
        return
      }
      
      if (!isImage && !isText) {
        alert('Please select an image file or text file.')
        return
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB.')
        return
      }
    }
    
    onFileSelect(file)
  }

  const handleRemoveFile = () => {
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4 text-blue-400" />
    }
    return <FileText className="w-4 h-4 text-green-400" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="flex items-center space-x-2">
      {selectedFile ? (
        <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2 max-w-xs">
          {getFileIcon(selectedFile)}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white truncate">{selectedFile.name}</p>
            <p className="text-xs text-gray-400">{formatFileSize(selectedFile.size)}</p>
          </div>
          <button
            onClick={handleRemoveFile}
            className="text-gray-400 hover:text-white transition-colors"
            title="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-gray-400 hover:text-white"
          title={modelSupportsImages ? "Upload image or text file" : "Upload text file (images not supported by this model)"}
        >
          <Paperclip className="w-5 h-5" />
        </button>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        accept={modelSupportsImages ? "image/*,text/*,.txt,.md" : "text/*,.txt,.md"}
        className="hidden"
      />
    </div>
  )
}
