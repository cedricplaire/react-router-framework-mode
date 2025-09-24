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
  let firstName = formData.get("firstName");
  let lastName = formData.get("lastName");
  let avatar = formData.get("avatar");
  let email = formData.get("email");
  let birthday = formData.get("birthday");
  let sex = formData.get("sex");
  let role = formData.get("role");
  if (typeof firstName !== "string" || typeof lastName !== "string" || typeof avatar !== "string" || typeof email !== "string") {
    return { guestUsersError: "firstName, lastName and avatar are required" };
  }

  firstName = firstName.trim();
  lastName = lastName.trim();
  avatar = avatar.trim();
  email = email.trim();
  if (!firstName || !lastName || !avatar || !email) {
    return { guestUsersError: "firstName, lastName and email are required" };
  }

  const db = database();
  try {
    await db.insert(schema.usersLZ).values({ firstName, lastName, email, avatar, sex, role });
  } catch (error) {
    return { guestUsersError: "Error adding to guest book" };
  }
}

export async function loader({ context }: Route.LoaderArgs) {
  const db = database();

  const guestUser = await db.query.usersLZ.findMany({
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      avatar: true,
      email: true,
      sex: true,
      role: true
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
