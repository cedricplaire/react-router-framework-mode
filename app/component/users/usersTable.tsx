type RoleType = 'guest' | 'user' | 'admin';
type SexType = 'male' | 'female';

type guestUser = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string | null;
  email: string | null;
  sex: SexType | null;
  role: RoleType | null;
}[];

export default function UserTable({users}: {users: guestUser}) {
    return (
        <div className="w-full intems-center">
          <h1 className={`mb-8 text-xl md:text-2xl justify-self-center`}>
            Customers
          </h1>
          {/* <Search placeholder="Search customers..." /> */}
          <div className="mt-6 flow-root">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                  <div className="md:hidden">
                    {users?.map((customer) => (
                      <div
                        key={customer.id}
                        className="mb-2 w-full rounded-md bg-white p-4"
                      >
                        <div className="flex items-center justify-between border-b pb-4">
                          <div>
                            <div className="mb-2 flex items-center">
                              <div className="flex items-center gap-3">
                                <img
                                  src={'/evil-rabbit.png'}
                                  className="rounded-full"
                                  alt={`${customer.firstName}'s profile picture`}
                                  width={28}
                                  height={28}
                                />
                                <p>{customer.firstName}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500">
                              {customer.firstName} - {customer.lastName}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-full items-center justify-between border-b py-5">
                          <div className="flex w-1/2 flex-col">
                            <p className="text-xs">EMail</p>
                            <p className="font-medium">{customer.email}</p>
                          </div>
                          <div className="flex w-1/2 flex-col">
                            <p className="text-xs">ID</p>
                            <p className="font-medium">{customer.id}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                    <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                      <tr>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                          Avatar
                        </th>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                          FulltName
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                          EMail
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                          ID
                        </th>
                      </tr>
                    </thead>
    
                    <tbody className="divide-y divide-gray-200 text-gray-900">
                      {users.map((customer) => (
                        <tr key={customer.id} className="group">
                          <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={'/evil-rabbit.png'}
                                className="rounded-full"
                                alt={`${customer.firstName}'s profile picture`}
                                width={28}
                                height={28}
                              />
                              <p>{customer.firstName}</p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {customer.lastName}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {customer.email}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {customer.id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );    
}