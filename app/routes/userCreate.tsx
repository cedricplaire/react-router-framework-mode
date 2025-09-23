import type { Route } from "./+types/userCreate.tsx";
import { database } from "~/database/context";
import * as schema from "~/database/schema";
import { UserList } from '~/component/users/usersList'


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "user create", content: "User and profil creation form" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  let fullName = formData.get("fullName");
  let nickName = formData.get("nickName");
  let avatar = formData.get("avatar");
  if (typeof fullName !== "string" || typeof nickName !== "string" || typeof avatar !== "string") {
    return { guestUsersError: "fullName, nickName and avatar are required" };
  }

  fullName = fullName.trim();
  nickName = nickName.trim();
  avatar = avatar.trim();
  if (!fullName || !nickName || !avatar) {
    return { guestUsersError: "fullName, nickName and avatar are required" };
  }

  const db = database();
  try {
    await db.insert(schema.usersLZ).values({ fullName, nickName, avatar });
  } catch (error) {
    return { guestUsersError: "Error adding to guest book" };
  }
}

export async function loader({ context }: Route.LoaderArgs) {
  const db = database();

  const guestUser = await db.query.usersLZ.findMany({
    columns: {
      id: true,
      fullName: true,
      nickName: true,
      avatar: true
    },
  });

  return {
    guestUser,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function UserCreate({ actionData, loaderData }: Route.ComponentProps) {
    return (
      <UserList
        guestUser={loaderData.guestUser}
        guestUserError={actionData?.guestUsersError}
        message={loaderData.message}
      />
  );
}
