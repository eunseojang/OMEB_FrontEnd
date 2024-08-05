import { useEffect, useState } from 'react';
import axios from 'axios';
import TopUsers from './TopUsers';
import UserTable from './UserTable';

const RankingPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/user/rank`,
          {
            params: {
              page: 1,
              size: 10,
            },
          }
        );
        setUsers(response.data.data.userRankInfoResponseList || []);
      } catch (err) {
        setError('Failed to fetch user rankings.');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(users);

  const topUsers = users.slice(0, 3);
  console.log(topUsers);
  const restOfUsers = users.slice(3);
  console.log(restOfUsers);

  return (
    <div className="rank">
      <TopUsers users={topUsers} />
      <UserTable users={restOfUsers} />
    </div>
  );
};

export default RankingPage;
