import UserTable from "~/component/users/usersTable";
import type { Route } from "./+types/allusers.tsx";
import { database } from "~/database/context";

export async function loader({ context }: Route.LoaderArgs) {
  const db = database();

  const lastUsers = await db.query.usersLZ.findMany({
    columns: {
    id: true,
    firstName: true,
    lastName: true,
    avatar: true,
    email: true,
    birthday: true,
    sex: true,
    role: true
    }
});

  return {
    lastUsers,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function AllUsers({loaderData, actionData} : Route.ComponentProps) {
    return (
        <UserTable users={loaderData.lastUsers}  />
    )
}
