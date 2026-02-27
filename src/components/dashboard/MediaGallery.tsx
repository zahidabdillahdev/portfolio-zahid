"use client";

import { useEffect, useState } from "react";
import { Column, Heading, Text, Row, Button, Icon, Grid, Media, Feedback } from "@once-ui-system/core";

type MediaItem = {
  id: string;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  created_at: string;
};

interface MediaGalleryProps {
  isConfigured: boolean;
}

export function MediaGallery({ isConfigured }: MediaGalleryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedia = async () => {
    if (!isConfigured) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/media");
      const data = await response.json();
      if (Array.isArray(data)) {
        setMedia(data);
      } else {
        setMedia([]);
        setError(data.error || "Failed to load media");
      }
    } catch (err) {
      console.error(err);
      setMedia([]);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [isConfigured]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        fetchMedia();
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      const response = await fetch(`/api/media?id=${id}`, { method: "DELETE" });
      if (response.ok) fetchMedia();
      else alert("Delete failed");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Column fillWidth gap="32">
      <Row fillWidth horizontal="justify" vertical="center" s={{ direction: "column", horizontal: "center", gap: "16" }}>
        <Column gap="8" s={{ horizontal: "center", align: "center" }}>
          <Heading variant="display-strong-s">Assets Library</Heading>
          <Text onBackground="neutral-weak">Media and project resources stored in R2.</Text>
        </Column>
        <label>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleUpload}
            disabled={uploading || !isConfigured}
            accept="image/*,video/*,application/pdf"
          />
          <Button
            as="span"
            variant="primary"
            size="m"
            loading={uploading}
            style={{ pointerEvents: !isConfigured ? 'none' : 'auto', opacity: !isConfigured ? 0.5 : 1 }}
          >
            <Row gap="8" vertical="center">
              <Icon name="plus" size="s" />
              Upload Asset
            </Row>
          </Button>
        </label>
      </Row>

      {!isConfigured && (
        <Feedback
          variant="warning"
          title="Database not configured"
          description="Please set DATABASE_URL in your .env file to enable asset library."
        />
      )}

      {error && (
        <Feedback
          variant="danger"
          title="Error loading assets"
          description={error}
        />
      )}

      {loading ? (
        <Column fillWidth paddingY="64" horizontal="center">
          <Text onBackground="neutral-weak">Scanning library...</Text>
        </Column>
      ) : (
        <Grid columns="4" gap="16" s={{ columns: 2 }}>
          {Array.isArray(media) && media.map((item) => (
            <Column
              key={item.id}
              background="surface"
              radius="l"
              border="neutral-alpha-weak"
              overflow="hidden"
              gap="12"
              padding="8"
              transition="all"
              style={{ borderStyle: 'solid' }}
            >
              <Media
                src={item.url}
                alt={item.filename}
                aspectRatio="1 / 1"
                radius="m"
                style={{ objectFit: "cover" }}
              />
              <Column paddingX="4" paddingBottom="4" gap="8">
                <Text variant="body-default-xs" onBackground="neutral-weak" style={{ 
                  whiteSpace: "nowrap", 
                  overflow: "hidden", 
                  textOverflow: "ellipsis" 
                }}>
                  {item.filename}
                </Text>
                <Row gap="8">
                  <Button
                    variant="secondary"
                    size="s"
                    fillWidth
                    onClick={() => {
                      navigator.clipboard.writeText(item.url);
                      alert("Link copied!");
                    }}
                  >
                    Link
                  </Button>
                  <Button
                    variant="danger"
                    size="s"
                    onClick={() => deleteMedia(item.id)}
                  >
                    <Icon name="close" size="s" />
                  </Button>
                </Row>
              </Column>
            </Column>
          ))}
          {media.length === 0 && !error && (
            <Column fillWidth style={{ gridColumn: "1 / -1" }} paddingY="64" horizontal="center" background="surface" radius="l" border="neutral-alpha-weak">
              <Icon name="gallery" size="l" onBackground="neutral-alpha-medium" marginBottom="16" />
              <Text onBackground="neutral-weak">The library is empty.</Text>
            </Column>
          )}
        </Grid>
      )}
    </Column>
  );
}
