import { getSession } from "@/utils/session";
import ProfileClient from "@/components/ProfileClient";

export default async function ProfilePage() {
  const session = await getSession();
  const firstName = session?.user?.first_name || "User";

  return <ProfileClient firstName={firstName} />;
}
