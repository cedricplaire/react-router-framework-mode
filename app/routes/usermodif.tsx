import { database } from "~/database/context";
import { Form, redirect, useNavigation } from "react-router";
import { eq } from "drizzle-orm";
import * as schema from "~/database/schema";
import type { Route } from "./+types/usermodif.tsx";
import { useState } from "react";

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
      return { guestUserError: "firstName and lastName are required" };
    }
    
    firstName = firstName.trim();
    lastName = lastName.trim();
    if (!firstName || !lastName || !avatar) {
      return { guestUserError: "firstName, lastName and email are required" };
    }
    // parser la date (ou la laisser à null)
    const ParsedBirthday = typeof birthday === "string" && birthday ? new Date(birthday) : null;
    const pathName = typeof avatar === "string" && avatar ? avatar.toString() : undefined;
    const genre = sex === "male" ? schema.sexEnum.enumValues[0] : schema.sexEnum.enumValues[1];
    let roleRight = schema.rolesEnum.enumValues.find((right) => right === role);
    /* schema.rolesEnum.enumValues.forEach((right, i) => {
      if (role === right[i])
        roleRight = schema.rolesEnum.enumValues[i];
    }) */
    const db = database();
    try {
      await db.update(schema.usersLZ)
      .set({
        id: parseInt(id as string),
        firstName,
        lastName, 
        avatar: pathName,
        birthday: ParsedBirthday,
        sex: genre,
        role: roleRight,
      })
      .where(eq(schema.usersLZ.id, parseInt(id as string)))
      .returning();
    } catch (error) {
      return { guestUserError: "Error adding to guest user" };
    };
    return redirect("/createuser");
}

export async function loader({ context, params }: Route.LoaderArgs) {
    const db = database();
    let user = await db.query.usersLZ.findFirst({
      where: (user, { eq }) => eq(user.id, parseInt(params.id)),
    })

    return user;
}

export default function UserModif({ actionData, loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  let userbeb = loaderData;
  let guestUserError = actionData?.guestUserError;
  let [genre, setGenre] = useState(userbeb?.sex);
  let [role, setRole] = useState(userbeb?.role);

  const toggleGenre = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const genre = event.target.id;
    if (genre === "male") {
      setGenre(schema.sexEnum.enumValues[0]);
    } else {
      setGenre(schema.sexEnum.enumValues[1]);
    };
  }

  const toggleRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.persist();
    const role = event.target.value;
    if (role === "guest") {
      setRole(schema.rolesEnum.enumValues[0]);
    } else if (role === "user") {
      setRole(schema.rolesEnum.enumValues[1]);
    } else {
      setRole(schema.rolesEnum.enumValues[2]);
    };
  }
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="space-y-6 px-4">
          <section className="rounded-3xl border max-w-lg border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <Form
              method="post"
              className="space-y-4 w-full justify-self-center"
              onSubmit={(event) => {
                if (navigation.state === "submitting") {
                  event.preventDefault();
                }
                const form = event.currentTarget;
                requestAnimationFrame(() => {
                  form.reset();
                });
              }}
            >
              <input
                type="text"
                name="id"
                title="id of selected user"
                value={userbeb?.id}
              />
              <input
                name="firstName"
                type="text"
                id="firstName"
                placeholder={userbeb?.firstName}
                //value={userbeb?.firstName}
                required
                className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:border-gray-500 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
              />
              <input
                name="lastName"
                type="text"
                id="lastName"
                placeholder={userbeb?.lastName}
                //value={userbeb?.lastName}
                required
                className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:border-gray-500 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
              />
              <input
                name="avatar"
                type="file"
                id="avatar"
                title="profil photo"
                placeholder={userbeb?.avatar ? userbeb.avatar : "no avatar" }
                //value={userbeb?.avatar}
                className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:border-gray-500 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
              />
              <input
                name="email"
                type="email"
                id="email"
                placeholder={userbeb?.email}
                //value={userbeb?.email}
                readOnly
                className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:border-gray-500 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="Date"
                id="birthday"
                name="birthday"
                placeholder={userbeb?.birthday ? userbeb.birthday.toDateString() : ""}
                min="1960-01-01"
                max="2007-12-31"
                className="w-full mb-0 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:border-gray-500 dark:focus:ring-blue-500 h-12 px-6 rounded-t-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="birthday"
                className="mx-auto flex cursor-pointer justify-center gap-1.5 rounded-b-3xl px-3 py-1.5 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 text-sm font-medium"
              >
                Set Birth Date
              </label>
              <fieldset className="flex-row justify-between">
                <div className="rounded-t-md border border-gray-700 bg-gray-800 hover:border-gray-500 px-[14px]">
                  <div className="flex justify-evenly gap-4 h-12 mx-auto">
                    <div className="flex items-center">
                      <input
                        id="male"
                        name="sex"
                        type="radio"
                        value={genre as string}
                        onChange={toggleGenre}
                        checked={genre === 'male'}
                        className="h-4 w-4 cursor-pointer hover:border-gray-500 border-gray-600 bg-gray-200 text-gray-800 focus:ring-2"
                      />
                      <label
                        htmlFor="male"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-800 sel aria-selected:bg-green-700 active:bg-amber-300 px-3 py-1.5 text-sm font-medium text-gray-100"
                      >
                        male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="female"
                        name="sex"
                        type="radio"
                        onChange={toggleGenre}
                        checked={genre === 'female'}
                        value={genre as string}
                        className="h-4 w-4 cursor-pointer hover:border-gray-500 border-gray-600 bg-gray-200 text-gray-800 focus:ring-2"
                      />
                      <label
                        htmlFor="female"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full  bg-gray-800 aria-selected:bg-green-700 active:bg-amber-300 px-3 py-1.5 text-xs font-medium text-gray-100"
                      >
                        female
                      </label>
                    </div>
                  </div>
                </div>
                <label className="mb-0 mt-0 flex mx-auto justify-center gap-1.5 rounded-b-3xl px-3 py-1.5 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 text-sm font-medium">
                  Select your genre
                </label>
              </fieldset>
              
              <select
                id="role"
                title="selection of role"
                name="role"
                onChange={toggleRole}
                className="peer block w-full cursor-pointer pr-2 h-12 mb-0 rounded-t-md border hover:border-gray-500 border-gray-700 bg-gray-800 text-gray-200 py-2 pl-10 text-sm placeholder:text-gray-500"
                defaultValue={role as string}
              >
                <option value="" disabled>
                  Choose a role
                </option>

                <option key={"guest"} value={"guest"}>
                  {"guest"}
                </option>
                <option key={"user"} value={"user"}>
                  {"user"}
                </option>
                <option key={"admin"} value={"admin"}>
                  {"admin"}
                </option>

              </select>
              <label htmlFor="role" className="mb-4 mt-0 flex mx-auto justify-center gap-1.5 rounded-b-3xl px-3 py-1.5 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 text-sm font-medium">
                Choose Role (Admin Right)
              </label>
              <button
                type="submit"
                disabled={navigation.state === "submitting"}
                className="w-full h-10 px-3 text-white bg-blue-400 rounded-lg hover:bg-blue-800"
              >
                Sign-up on LearnZic
              </button>
              {guestUserError && (
                <p className="text-red-700 dark:text-red-400">
                  {guestUserError}
                </p>
              )}
            </Form>
          </section>
        </div>
      </div>
    </main>
  );;
}