import React, { useEffect, useState } from 'react';
import { getAllUsers } from 'utils/data/user';
import { User } from 'types/user';
import Login from 'components/forms/Login';
import SignUp from 'components/forms/SignUp';
import UserList from 'components/lists/Users';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [setUsers]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <Login />
      <SignUp />
      <UserList users={users} />
    </div>
  );
}

export default App;
