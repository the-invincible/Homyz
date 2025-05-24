import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import useAuthCheck from '../../hooks/useAuthCheck';
import { useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailContext from '../../context/UserDetails';
import { toFav } from '../../utils/api';
import { checkFavourites } from '../../utils/common';

const Heart = ({id}) => {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const { userDetails: { favourites, token }, setUserDetails } = useContext(UserDetailContext);
  useEffect(() => {
    setHeartColor(() => checkFavourites(id, favourites))
  }, [favourites]);

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user?.email, token),
    onSuccess: () => {
        setUserDetails((prev) => (
            {
                ...prev,
                favourites: updateFavourites(id, prev.favourites)
            }
        ))
    }
  })
  const handleLike = () => {
    if(validateLogin()) {
        setHeartColor((prev) => prev === "#fa3ef5" ? "white" : "#fa3ef5")
    }
  }
  return (    
    <AiFillHeart size={24} color={heartColor} onClick={(e) => {
        e.preventDefault()
        handleLike();
    }} />
  )
}

export default Heart;