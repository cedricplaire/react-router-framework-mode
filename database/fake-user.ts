import { faker } from '@faker-js/faker';
import { date, PgDate } from "drizzle-orm/pg-core";
import { database } from './context';
import * as schema from './schema';
import type { DatetimeFsp, MySqlDate, MySqlDateTime } from 'drizzle-orm/mysql-core';

type RoleType = 'guest' | 'user' | 'admin';
type SexType = 'male' | 'female';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  birthday: Date;
  email: string;
  sex: SexType;
  //subscriptionTier: SubscriptionTier;
  role: RoleType
}

function createRandomUser(): User {
    const sex = faker.helpers.arrayElement(["male", "female"]);
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
  
    return {
      _id: faker.string.uuid(),
      avatar: faker.image.avatar(),
      birthday: faker.date.birthdate(),
      email,
      firstName,
      lastName,
      sex,
      //subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
      role: faker.helpers.arrayElement(['guest', 'user' , 'admin'])
    };
  }
  
  const user = createRandomUser();

  async function SeedUser() {
    const db = database();
      try {
        await db.insert(schema.usersLZ).values({ ...user} );
      } catch (error) {
        return { guestUsersError: "Error adding to guest book" };
      }
  }

