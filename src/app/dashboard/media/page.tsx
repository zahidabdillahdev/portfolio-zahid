"use client";

import { useEffect, useState } from "react";
import { Column, Heading, Text, Row, Button, Icon, Grid, Media } from "@once-ui-system/core";
import { isConfigured } from "@/lib/db";

type MediaItem = {
  id: string;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  created_at: string;
};

export default function MediaDashboard() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/media");
      const data = await response.json();
      setMedia(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

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

  return (
    <Column maxWidth="m" fillWidth paddingY="24" gap="24">
      <Row fillWidth horizontal="justify" vertical="center">
        <Column gap="8">
          <Heading variant="display-strong-s">Media</Heading>
          <Text onBackground="neutral-weak">Upload and manage your images and videos.</Text>
        </Column>
        <label>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleUpload}
            disabled={uploading}
            accept="image/*,video/*"
          />
          <Button
            as="span"
            variant="primary"
            size="m"
            loading={uploading}
          >
            <Row gap="8" vertical="center">
              <Icon name="plus" size="s" />
              Upload Media
            </Row>
          </Button>
        </label>
      </Row>

      {loading ? (
        <Text align="center" paddingY="48">Loading media...</Text>
      ) : (
        <Grid columns="4" gap="16" s={{ columns: 2 }}>
          {media.map((item) => (
            <Column
              key={item.id}
              background="surface"
              radius="m"
              border="neutral-alpha-weak"
              overflow="hidden"
              gap="8"
            >
              <Media
                src={item.url}
                alt={item.filename}
                aspectRatio="1 / 1"
                style={{ objectFit: "cover" }}
              />
              <Column paddingX="8" paddingBottom="8" gap="4">
                <Text variant="body-default-xs" onBackground="neutral-weak" style={{ 
                  whiteSpace: "nowrap", 
                  overflow: "hidden", 
                  textOverflow: "ellipsis" 
                }}>
                  {item.filename}
                </Text>
                <Button
                  variant="tertiary"
                  size="s"
                  onClick={() => {
                    navigator.clipboard.writeText(item.url);
                    alert("URL copied to clipboard!");
                  }}
                >
                  Copy URL
                </Button>
              </Column>
            </Column>
          ))}
          {media.length === 0 && (
            <Column fillWidth style={{ gridColumn: "1 / -1" }} paddingY="48" horizontal="center">
              <Text onBackground="neutral-weak">No media found.</Text>
            </Column>
          )}
        </Grid>
      )}
    </Column>
  );
}
