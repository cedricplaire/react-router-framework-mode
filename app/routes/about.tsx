import type { Route } from "./+types/about"
import { database } from "~/database/context";

export async function loader({ context }: Route.LoaderArgs) {
  const db = database();

  const lastUsers = await db.query.usersLZ.findMany({
    columns: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  return {
    lastUsers,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function about({loaderData, actionData} : Route.ComponentProps) {
   let data=loaderData.lastUsers;
    return (
        <div>
            <ul className="text-center">
              <li className="p-3">Personnes ayant signer</li>
              {data.map(({ id, firstName, lastName }) => (
                <li key={id} className="p-3">
                  <div className="aboutCard">
                    <span>{firstName}</span>
                    <span>{lastName}</span>
                  </div>
                  {firstName}
                </li>
              ))}
            </ul>
        </div>
    )
}
