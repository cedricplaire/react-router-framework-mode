import { Form, useNavigation } from "react-router";
import { rolesEnum } from "~/database/schema";

type RoleType = "guest" | "user" | "admin";
type SexType = "male" | "female";

export function UserEdit({
  userbeb,
  guestUserError,
}: {
  userbeb: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    birthday: Date;
    sex: SexType;
    role: RoleType;
};
  guestUserError?: string;
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
                type="hidden"
                name="id"
                value={userbeb?.id ?? ""}
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
                placeholder={userbeb?.avatar}
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
                placeholder={userbeb?.birthday.toDateString()}
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
                        value="male"
                        checked={userbeb?.sex === 'male'}
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
                        defaultChecked
                        checked={userbeb?.sex === 'female'}
                        value="female"
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
                className="peer block w-full cursor-pointer pr-2 h-12 mb-0 rounded-t-md border hover:border-gray-500 border-gray-700 bg-gray-800 text-gray-200 py-2 pl-10 text-sm placeholder:text-gray-500"
                value="guest"
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
    </main>
  );
}
