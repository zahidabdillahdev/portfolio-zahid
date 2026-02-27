"use client";

import { useEffect, useState, useRef } from "react";
import { Column, Row, Button, Input, Text, Heading, Feedback, Icon, Grid, Media, useToast } from "@once-ui-system/core";
import { useRouter } from "next/navigation";

type MediaItem = {
  id: string;
  url: string;
  filename: string;
};

export function ProfileForm() {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    name: "",
    role: "",
    avatar: "",
    email: "",
    location: "",
    languages: [] as string[],
    github_link: "",
    linkedin_link: "",
    instagram_link: "",
    threads_link: "",
    home_headline: "",
    home_subline: "",
  });
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    Promise.all([
      fetch("/api/profile").then(res => res.json()),
      fetch("/api/media").then(res => res.json())
    ]).then(([profileData, mediaData]) => {
      if (isMounted.current) {
        if (profileData && !profileData.error) {
          setFormData(prev => ({
            ...prev,
            ...profileData,
            first_name: profileData.first_name ?? "",
            last_name: profileData.last_name ?? "",
            name: profileData.name ?? "",
            role: profileData.role ?? "",
            avatar: profileData.avatar ?? "",
            email: profileData.email ?? "",
            location: profileData.location ?? "",
            home_headline: profileData.home_headline ?? "",
            home_subline: profileData.home_subline ?? "",
          }));
        }
        if (Array.isArray(mediaData)) {
          setMediaItems(mediaData);
        }
      }
    }).catch(err => console.error("Error loading data:", err))
      .finally(() => {
        if (isMounted.current) setFetching(false);
      });

    return () => { isMounted.current = false; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectAvatar = (url: string) => {
    setFormData(prev => ({ ...prev, avatar: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        addToast({
            message: "Identity updated successfully!",
            variant: "success"
        });
        router.refresh();
      } else {
        addToast({
            message: "Failed to update profile.",
            variant: "danger"
        });
      }
    } catch (err) {
      console.error(err);
      addToast({
          message: "An unexpected error occurred.",
          variant: "danger"
      });
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  if (fetching) return <Column fillWidth paddingY="64" horizontal="center"><Text onBackground="neutral-weak">Loading identity data...</Text></Column>;

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Column gap="48" fillWidth>
        
        <Column gap="24">
          <Row gap="12" vertical="center">
            <Icon name="person" size="s" onBackground="brand-medium" />
            <Heading variant="heading-strong-m">Personal Brand</Heading>
          </Row>
          
          <Column gap="12">
            <Text variant="label-default-m" onBackground="neutral-weak">Select Profile Photo</Text>
            {mediaItems.length > 0 ? (
              <Grid columns="6" gap="12" s={{ columns: 3 }}>
                {mediaItems.map((item) => (
                  <Column 
                    key={item.id} 
                    cursor="interactive"
                    onClick={() => selectAvatar(item.url)}
                    style={{ 
                      position: 'relative',
                      border: formData.avatar === item.url ? '2px solid var(--brand-solid-strong)' : '2px solid transparent',
                      borderRadius: '12px',
                      padding: '2px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Media
                      src={item.url}
                      alt={item.filename}
                      aspectRatio="1 / 1"
                      radius="m"
                    />
                    {formData.avatar === item.url && (
                      <Row 
                        position="absolute" 
                        style={{ top: '-8px', right: '-8px' }}
                        background="brand-solid-strong"
                        radius="full"
                        padding="4"
                      >
                        <Icon name="check" size="xs" onBackground="static-white" />
                      </Row>
                    )}
                  </Column>
                ))}
              </Grid>
            ) : (
              <Text variant="body-default-s" onBackground="neutral-weak">No media found. Upload photos in the Media section first.</Text>
            )}
          </Column>

          <Row gap="16" s={{ direction: "column" }}>
            <Column gap="12" flex={1}>
              <Text variant="label-default-m" onBackground="neutral-weak">First Name</Text>
              <Input name="first_name" value={formData.first_name} onChange={handleChange} />
            </Column>
            <Column gap="12" flex={1}>
              <Text variant="label-default-m" onBackground="neutral-weak">Last Name</Text>
              <Input name="last_name" value={formData.last_name} onChange={handleChange} />
            </Column>
          </Row>
          
          <Column gap="12">
            <Text variant="label-default-m" onBackground="neutral-weak">Full Display Name</Text>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </Column>

          <Column gap="12">
            <Text variant="label-default-m" onBackground="neutral-weak">Your Role</Text>
            <Input name="role" value={formData.role} onChange={handleChange} placeholder="e.g. Design Engineer" />
          </Column>

          <Row gap="16" s={{ direction: "column" }}>
            <Column gap="12" flex={1}>
              <Text variant="label-default-m" onBackground="neutral-weak">Email</Text>
              <Input name="email" value={formData.email} onChange={handleChange} />
            </Column>
            <Column gap="12" flex={1}>
              <Text variant="label-default-m" onBackground="neutral-weak">Timezone / Location</Text>
              <Input name="location" value={formData.location} onChange={handleChange} />
            </Column>
          </Row>
        </Column>

        <Column gap="24">
          <Row gap="12" vertical="center">
            <Icon name="globe" size="s" onBackground="brand-medium" />
            <Heading variant="heading-strong-m">Social Presence</Heading>
          </Row>
          <Grid columns="3" gap="16" s={{ columns: 1 }}>
            <Column gap="12">
              <Text variant="label-default-m" onBackground="neutral-weak">GitHub Link</Text>
              <Input name="github_link" value={formData.github_link} onChange={handleChange} />
            </Column>
            <Column gap="12">
              <Text variant="label-default-m" onBackground="neutral-weak">LinkedIn Link</Text>
              <Input name="linkedin_link" value={formData.linkedin_link} onChange={handleChange} />
            </Column>
            <Column gap="12">
              <Text variant="label-default-m" onBackground="neutral-weak">Instagram Link</Text>
              <Input name="instagram_link" value={formData.instagram_link} onChange={handleChange} />
            </Column>
          </Grid>
        </Column>

        <Column gap="24">
          <Row gap="12" vertical="center">
            <Icon name="home" size="s" onBackground="brand-medium" />
            <Heading variant="heading-strong-m">Website Hero Content</Heading>
          </Row>
          <Column gap="12">
            <Text variant="label-default-m" onBackground="neutral-weak">Main Headline</Text>
            <textarea
                name="home_headline"
                value={formData.home_headline}
                onChange={handleChange}
                style={{
                    width: "100%",
                    minHeight: "100px",
                    padding: "16px",
                    borderRadius: "12px",
                    backgroundColor: "var(--neutral-alpha-weak)",
                    border: "1px solid var(--neutral-alpha-weak)",
                    color: "var(--neutral-on-background-strong)",
                    fontFamily: "inherit",
                    fontSize: "14px"
                }}
            />
          </Column>
          <Column gap="12">
            <Text variant="label-default-m" onBackground="neutral-weak">Intro Subline</Text>
            <textarea
                name="home_subline"
                value={formData.home_subline}
                onChange={handleChange}
                style={{
                    width: "100%",
                    minHeight: "150px",
                    padding: "16px",
                    borderRadius: "12px",
                    backgroundColor: "var(--neutral-alpha-weak)",
                    border: "1px solid var(--neutral-alpha-weak)",
                    color: "var(--neutral-on-background-strong)",
                    fontFamily: "inherit",
                    fontSize: "14px"
                }}
            />
          </Column>
        </Column>

        <Row gap="12" horizontal="end" paddingTop="24" style={{ borderTop: '1px solid var(--neutral-alpha-weak)' }}>
          <Button type="submit" variant="primary" loading={loading} data-border="rounded">
            Save All Changes
          </Button>
        </Row>
      </Column>
    </form>
  );
}
