import { Form, useNavigation } from "react-router";
import UserTable from './usersTable'

export function UserList({
    guestUser,
    guestUserError,
    message,
  }: {
    guestUser: {
      fullName: string;
      nickName: string;
      avatar?: string | null;
      id: number;
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
                  name="fullName"
                  placeholder="FullName"
                  required
                  className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  name="nickName"
                  type="text"
                  placeholder="NickName"
                  required
                  className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  name="avatar"
                  type="text"
                  placeholder="Profil avatar"
                  required
                  className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
                />
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