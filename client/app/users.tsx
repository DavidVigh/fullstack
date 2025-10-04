'use client'
import { use, useEffect, useState } from 'react'
 
export default function Users(){

  const [users, setUsers] = useState<{id: number; fullname: string; username: string; email: string }[]>([])
    
  useEffect(() => {
    fetch('http://localhost:3002/users')
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => console.log('Error fetching users.'));
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.fullname}</li>
      ))}
    </ul>
  )
}