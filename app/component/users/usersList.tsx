import { Form, useNavigation } from "react-router";
import UserTable from './usersTable';

type RoleType = 'guest' | 'user' | 'admin';
type SexType = 'male' | 'female';

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
      sex: SexType | null;
      role: RoleType | null;
    }[];
    guestUserError?: string;
    message: string;
  }) {
    const navigation = useNavigation();
  
    return (
      <main className="flex items-center justify-center pt-16 pb-4">
        <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
          <div className="lg:max-w-[800px] w-full space-y-6 px-4">
            <section className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
              <Form
                method="post"
                className="space-y-4 w-full max-w-1/2 justify-self-center"
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
                  placeholder="firstName"
                  required
                  className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="lastName"
                  required
                  className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  name="avatar"
                  type="text"
                  placeholder="Profil avatar"
                  className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Profil email"
                  className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
                />
                <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the sex
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="male"
                  name="sexm"
                  type="radio"
                  value="male"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="male"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female"
                  name="sexf"
                  type="radio"
                  value="female"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="female"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  female
                </label>
              </div>
            </div>
          </div>
        </fieldset>
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
              {/* <ul className="text-center">
                {<li className="p-3">{message}</li>}
                {guestUser.map(({ id, fullName, nickName, avatar }) => (
                  <li key={id} className="p-3">
                    {fullName} - {nickName} - {avatar}
                  </li>
                ))}
              </ul> */}
              <div>
                <UserTable users={guestUser} />
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }