import { isConfigured } from "@/lib/db";
import { MediaGallery } from "@/components/dashboard/MediaGallery";

export default async function MediaDashboardPage() {
  return <MediaGallery isConfigured={isConfigured} />;
}
