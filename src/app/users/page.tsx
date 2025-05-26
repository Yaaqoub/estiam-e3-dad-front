'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';


interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export default function Users() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const apiUrl = 'https://api.escuelajs.co/api/v1/users';

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        setUsers(json);
        setLoading(false);
      } catch (error: any) {
        console.error(error.message);
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <Skeleton className="h-[150px] w-[200px] rounded-xl" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 mx-4">
          {users.map((_user, index) => (
            <div key={index}>
              <Card>
                <CardHeader>
                  <CardTitle>{_user.name}</CardTitle>
                  <CardDescription>{_user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Avatar>
                    <AvatarImage src={_user.avatar} />
                    <AvatarFallback>?</AvatarFallback>
                  </Avatar>
                </CardContent>
                <CardFooter>
                  <p>{_user.role}</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
