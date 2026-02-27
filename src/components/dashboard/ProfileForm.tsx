"use client";

import { useEffect, useState } from "react";
import { Column, Row, Button, Input, Text, Heading, Feedback } from "@once-ui-system/core";
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

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          // Ensure null values from DB become empty strings for inputs
          const sanitizedData = { ...data };
          Object.keys(sanitizedData).forEach(key => {
            if (sanitizedData[key] === null) {
              sanitizedData[key] = "";
            }
          });
          
          setFormData(prev => ({
            ...prev,
            ...sanitizedData,
            languages: data.languages || [],
          }));
        }
      })
      .finally(() => setFetching(false));
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
      setLoading(false);
    }
  };

  if (fetching) return <Text>Loading profile...</Text>;

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Column gap="32" fillWidth>
        <Column gap="16">
          <Heading variant="heading-strong-m">Personal Information</Heading>
          <Row gap="16">
            <Column gap="12" flex={1}>
              <Text variant="label-default-m">First Name</Text>
              <Input name="first_name" value={formData.first_name} onChange={handleChange} />
            </Column>
            <Column gap="12" flex={1}>
              <Text variant="label-default-m">Last Name</Text>
              <Input name="last_name" value={formData.last_name} onChange={handleChange} />
            </Column>
          </Row>
          <Column gap="12">
            <Text variant="label-default-m">Display Name</Text>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </Column>
          <Column gap="12">
            <Text variant="label-default-m">Professional Role</Text>
            <Input name="role" value={formData.role} onChange={handleChange} />
          </Column>
          <Column gap="12">
            <Text variant="label-default-m">Avatar URL (R2 link)</Text>
            <Input name="avatar" value={formData.avatar} onChange={handleChange} />
          </Column>
          <Row gap="16">
            <Column gap="12" flex={1}>
              <Text variant="label-default-m">Email</Text>
              <Input name="email" value={formData.email} onChange={handleChange} />
            </Column>
            <Column gap="12" flex={1}>
              <Text variant="label-default-m">Location / Timezone</Text>
              <Input name="location" value={formData.location} onChange={handleChange} />
            </Column>
          </Row>
        </Column>

        <Column gap="16">
          <Heading variant="heading-strong-m">Social Links</Heading>
          <Column gap="12">
            <Text variant="label-default-m">GitHub Link</Text>
            <Input name="github_link" value={formData.github_link} onChange={handleChange} />
          </Column>
          <Column gap="12">
            <Text variant="label-default-m">LinkedIn Link</Text>
            <Input name="linkedin_link" value={formData.linkedin_link} onChange={handleChange} />
          </Column>
          <Column gap="12">
            <Text variant="label-default-m">Instagram Link</Text>
            <Input name="instagram_link" value={formData.instagram_link} onChange={handleChange} />
          </Column>
        </Column>

        <Column gap="16">
          <Heading variant="heading-strong-m">Home Content</Heading>
          <Column gap="12">
            <Text variant="label-default-m">Headline</Text>
            <textarea
                name="home_headline"
                value={formData.home_headline}
                onChange={handleChange}
                style={{
                    width: "100%",
                    minHeight: "100px",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "var(--surface-background)",
                    border: "1px solid var(--neutral-alpha-weak)",
                    color: "var(--neutral-on-background-strong)",
                }}
            />
          </Column>
          <Column gap="12">
            <Text variant="label-default-m">Subline</Text>
            <textarea
                name="home_subline"
                value={formData.home_subline}
                onChange={handleChange}
                style={{
                    width: "100%",
                    minHeight: "150px",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "var(--surface-background)",
                    border: "1px solid var(--neutral-alpha-weak)",
                    color: "var(--neutral-on-background-strong)",
                }}
            />
          </Column>
        </Column>

        <Row gap="12" horizontal="end">
          <Button type="submit" variant="primary" loading={loading}>
            Update Identity
          </Button>
        </Row>
      </Column>
    </form>
  );
}
