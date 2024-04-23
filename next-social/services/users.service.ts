import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../firebase-config';
import { UserData } from 'types/types';

export const getUserByHandle = (handle: string) => {

  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = async (data: UserData) => {    //(data: z.infer<typeof FormSchema>)

  return set(ref(db, `users/${data.handle}`),
    {
      ...data 
    });
};

export const getUserData = (uid: string) => {

  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};