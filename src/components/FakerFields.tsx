import React from 'react'
import {faker} from '@faker-js/faker';

const FakerFields = () => {

    return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        works: faker.company.name(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    };
}

export default FakerFields