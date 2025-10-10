import { faker } from '@faker-js/faker';
import { database } from './context';
import * as schema from './schema';
import type { PgInteger } from 'drizzle-orm/pg-core';

type RoleType = 'guest' | 'user' | 'admin';
type SexType = 'male' | 'female';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  birthday: Date;
  email: string;
  sex: SexType;
  role: RoleType
}

function createRandomUser(): User {
    const sex = faker.helpers.arrayElement(schema.sexEnum.enumValues);
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
  
    return {
      id: faker.number.int(),
      avatar: faker.image.avatar(),
      birthday: faker.date.birthdate(),
      email,
      firstName,
      lastName,
      sex,
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

