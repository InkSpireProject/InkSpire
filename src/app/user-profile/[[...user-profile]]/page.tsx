import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="w-full flex justify-center pt-20">
    <UserProfile path="/user-profile" />
  </div>
);

export default UserProfilePage;
