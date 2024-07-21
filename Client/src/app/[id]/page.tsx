import { UserProfilePageServer } from "./UserProfilePage.server";
import UserProfilePageClient from "./UserProfilePage.client";

interface Props {
    params: {
        id: string;
    };
}

const UserProfilePage = async ({ params }: Props) => {
    const userInfo = await UserProfilePageServer({ userId: params.id });

    return <UserProfilePageClient userInfo={userInfo} />;
};

export default UserProfilePage;
