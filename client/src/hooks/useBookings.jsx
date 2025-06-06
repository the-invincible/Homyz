import React, { useContext, useRef, useEffect } from 'react'
import UserDetailContext from '../context/UserDetails'
import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { getAllBookings } from '../utils/api';

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allBookings",
    queryFn: () => getAllBookings(user?.email, userDetails?.token),
    onSuccess: (data) => setUserDetails((prev) => ({
        ...prev, bookings: data})) ,
    enabled: user !== undefined,
    staleTime: 3000,
  });
  queryRef.current = refetch;
  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);
  
  return {data, isError, isLoading, refetch}
}

export default useBookings;