import { Form, useNavigation } from "react-router";
import UserTable from "./usersTable";
import { rolesEnum } from "~/database/schema";

type RoleType = "guest" | "user" | "admin";
type SexType = "male" | "female";

export function UserList({
  guestUser,
  guestUserError,
  message,
}: {
  guestUser: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string | null;
    email: string | null;
    birthday: Date | null;
    sex: SexType | null;
    role: RoleType | null;
  }[];
  guestUserError?: string;
  message: string;
}) {
  const navigation = useNavigation();

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
                name="firstName"
                type="text"
                id="firstName"
                placeholder="FirstName"
                required
                className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
              />
              <input
                name="lastName"
                type="text"
                id="lastName"
                placeholder="LastName"
                required
                className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
              />
              <input
                name="avatar"
                type="text"
                id="avatar"
                placeholder="/path to avatar"
                className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
              />
              <input
                name="email"
                type="email"
                id="email"
                placeholder="your@email.com"
                required
                className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="Date"
                id="birthday"
                name="birthday"
                defaultValue="22-10-1985"
                min="1960-01-01"
                max="2007-12-31"
                className="w-full mb-0 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-12 px-6 rounded-t-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="birthday"
                className="mx-auto flex cursor-pointer justify-center gap-1.5 rounded-b-3xl px-3 py-1.5 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 text-sm font-medium"
              >
                Set Birth Date
              </label>
              <fieldset className="flex-row justify-between">
                <div className="rounded-t-md border border-gray-700 bg-gray-800 px-[14px]">
                  <div className="flex justify-evenly gap-4 h-12 mx-auto">
                    <div className="flex items-center">
                      <input
                        id="male"
                        name="sex"
                        type="radio"
                        value="male"
                        className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-200 text-gray-800 focus:ring-2"
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
                        defaultChecked
                        value="female"
                        className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-200 text-gray-800 focus:ring-2"
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
                className="peer block w-full cursor-pointer h-12 mb-0 rounded-t-md border border-gray-700 bg-gray-800 text-gray-200 py-2 pl-10 text-sm placeholder:text-gray-500"
                defaultValue="guest"
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
              <label className="mb-4 mt-0 flex mx-auto justify-center gap-1.5 rounded-b-3xl px-3 py-1.5 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 text-sm font-medium">
                Choose Role (Admin Right)
              </label>
              <button
                type="submit"
                disabled={navigation.state === "submitting"}
                className="w-full h-10 px-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Sign-up on LearnZic
              </button>
              {guestUserError && (
                <p className="text-red-500 dark:text-red-400">
                  {guestUserError}
                </p>
              )}
            </Form>
          </section>
        </div>
      </div>
          <div className="w-full p-6">
              <UserTable users={guestUser} />
            </div>
    </main>
  );
}
