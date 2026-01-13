'use client';

import React, { useState, useRef } from 'react';
import { Button, Input, FormLabel, Icon } from '@/components/UI';
import { toast } from '@/components/Toast';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = 'Image',
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (e.g., limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File is too large. Maximum size is 5MB.');
      return;
    }

    setUploading(true);

    try {
      // 1. Get presigned URL
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, fileUrl } = await response.json();

      // 2. Upload file to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to S3');
      }

      // 3. Set the resulting URL
      onChange(fileUrl);
      toast.success('Image uploaded successfully!');
    } catch (error: unknown) {
      console.error('Upload error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to upload image.',
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className='space-y-2'>
      <FormLabel>{label}</FormLabel>
      <div className='flex flex-col gap-4'>
        {value && (
          <div className='relative aspect-video w-full overflow-hidden rounded-md border dark:border-neutral-700'>
            <Image
              src={value}
              alt='Uploaded image'
              fill
              className='object-cover'
              unoptimized // S3 URLs might not be in next.config.js images domains
            />
            <button
              type='button'
              onClick={() => onChange('')}
              className='absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600 transition-colors'
            >
              <Icon name='x' className='h-4 w-4' />
            </button>
          </div>
        )}
        <div className='flex gap-2'>
          <Input
            type='text'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder='Image URL or upload a file'
            className='flex-1'
          />
          <input
            type='file'
            accept='image/*'
            onChange={handleUpload}
            className='hidden'
            ref={fileInputRef}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className='whitespace-nowrap'
          >
            {uploading ? (
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800 dark:border-neutral-700 dark:border-t-white' />
            ) : (
              <Icon name='image' className='h-4 w-4' />
            )}
            <span className='ml-2'>
              {uploading ? 'Uploading...' : 'Upload'}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
