import { database } from "~/database/context";
import { eq } from "drizzle-orm";
import * as schema from "~/database/schema";
import type { Route } from "./+types/usermodif.tsx";
import { UserEdit } from "~/component/users/useredit";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    let id = formData.get("id");
    let firstName = formData.get("firstName");
    let lastName = formData.get("lastName");
    let avatar = formData.get("avatar");
    let birthday = formData.get("birthday");
    let sex = formData.get("sex");
    let role = formData.get("role");
    if (typeof firstName !== "string" || typeof lastName !== "string") {
      return { guestUsersError: "firstName and lastName are required" };
    }
  
    firstName = firstName.trim();
    lastName = lastName.trim();
    //sex?.valueOf() === schema.sexEnum;
    if (!firstName || !lastName || !avatar) {
      return { guestUserError: "firstName, lastName and email are required" };
    }
    // parser la date (ou la laisser à null)
    const ParsedBirthday = typeof birthday === "string" && birthday ? new Date(birthday) : null;
    const pathName = typeof avatar === "string" && avatar ? avatar.toString() : undefined;
    const roleend = schema.rolesEnum[role as keyof typeof schema.rolesEnum];

     const db = database();
     const user = await db.update(schema.usersLZ)
     .set({
      avatar: pathName,
      firstName,
      lastName,
      birthday: ParsedBirthday,
      sex: sex === "male" ? "male" : "female",
      role,
    })
     .where(eq(schema.usersLZ.id, id))
    .returning();
    return user[0];
    /* .set({
      avatar: pathName,
      firstName,
      lastName,  
      birthday: ParsedBirthday,
      sex,
      role,
    }); */
}

export async function loader({ context, params }: Route.LoaderArgs) {
    const db = database();
    let user = await db.query.usersLZ.findFirst({
      where: (user, { eq }) => eq(user.id, parseInt(params.id)),
    })

    return user;
}

export default function UserModif({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <UserEdit userbeb={loaderData} guestUserError={actionData?.guestUserError} />
  );
}