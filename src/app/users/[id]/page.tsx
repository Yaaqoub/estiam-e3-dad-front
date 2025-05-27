'use client';

import { useParams } from 'next/navigation';

export default function UserPage() {
  const params = useParams<{ id: string }>();

  // Execute the api to get user data
  
  return (
    <div>
      User id: {params?.id}<br />
      User name: 
    </div>
  );
}