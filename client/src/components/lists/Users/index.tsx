import React from 'react';
import { User } from 'types/user';

interface Props {
  users: User[];
}

function UserList({ users }: Props) {
  return (
    <div>
      <h1>Users from database</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>
              {user.firstName} {user.lastName}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
