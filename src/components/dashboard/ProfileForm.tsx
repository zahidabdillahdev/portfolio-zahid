"use client";

import { useEffect, useState, useRef } from "react";
import { Column, Row, Button, Input, Text, Heading, Feedback, Icon, Grid } from "@once-ui-system/core";
import { useRouter } from "next/navigation";

export function ProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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
    
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (isMounted.current && data && !data.error) {
          setFormData(prev => ({
            ...prev,
            first_name: data.first_name ?? "",
            last_name: data.last_name ?? "",
            name: data.name ?? "",
            role: data.role ?? "",
            avatar: data.avatar ?? "",
            email: data.email ?? "",
            location: data.location ?? "",
            languages: data.languages ?? [],
            github_link: data.github_link ?? "",
            linkedin_link: data.linkedin_link ?? "",
            instagram_link: data.instagram_link ?? "",
            threads_link: data.threads_link ?? "",
            home_headline: data.home_headline ?? "",
            home_subline: data.home_subline ?? "",
          }));
        }
      })
      .catch(err => console.error("Error loading profile:", err))
      .finally(() => {
        if (isMounted.current) setFetching(false);
      });

    return () => { isMounted.current = false; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        alert("Profile updated successfully!");
        router.refresh();
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  if (fetching) return <Column fillWidth paddingY="64" horizontal="center"><Text onBackground="neutral-weak">Loading identity data...</Text></Column>;

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Column gap="48" fillWidth>
        
        {/* Basic Information Section */}
        <Column gap="24">
          <Row gap="12" vertical="center">
            <Icon name="person" size="s" onBackground="brand-medium" />
            <Heading variant="heading-strong-m">Personal Brand</Heading>
          </Row>
          
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

          <Column gap="12">
            <Text variant="label-default-m" onBackground="neutral-weak">Avatar URL</Text>
            <Input name="avatar" value={formData.avatar} onChange={handleChange} placeholder="Link to your image from assets" />
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

        {/* Social Presence Section */}
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

        {/* Website Content Section */}
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
