"use client";

import { GetProfileType } from "@/lib/profile";

interface ProfileMemberPageProps {
  userData: GetProfileType;
}

const ProfileMemberPage = ({ userData }: ProfileMemberPageProps) => {
  return (
    <main>
      <div>
        <section>ini bagian foto</section>
        <section>ini bagian Data</section>
      </div>
    </main>
  );
};

export default ProfileMemberPage;
