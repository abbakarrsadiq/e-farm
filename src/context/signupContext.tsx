import React, { createContext, useContext, useState } from 'react';

export interface UserDetails {
  firstName: string;
  lastName: string;
  credential: string;
  email: string;
  password: string;
  roleName: string;
  gender: string;
  resAddress: string;
  ageGroup: string;
  hasBankAccount: boolean;
  hasSmartphone: boolean;
  profilePic: { url: string };
}

export interface IdUpload {
  idType: string;
  idNumber: string;
  url: string;
}

export interface BankDetails {
  accountNumber: number;
  bankName: string;
}

export interface FarmDetails {
  name: string;
  address: string;
  long: number;
  lat: number;
  docUploads: { url: string }[];
  crops: { cropId: string; farmSeasonStart: string; farmSeasonEnd: string }[];
}

interface SignupData {
  userDetails: UserDetails;
  idUpload: IdUpload;
  siteId: string;
  bankDetails?: BankDetails;
  farmDetails: FarmDetails[];
}

interface SignupContextProps {
  signupData: SignupData;
  setSignupData: React.Dispatch<React.SetStateAction<SignupData>>;
}

const SignupContext = createContext<SignupContextProps | undefined>(undefined);

export const useSignupContext = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error('useSignupContext must be used within a SignupProvider');
  }
  return context;
};

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialUserDetails: UserDetails = {
    firstName: 'Abubakar',
    lastName: 'Muhammad',
    credential: 'Sadiq',
    email: 'abbakarrsadiq@gmail.com',
    password: 'Abb@kar@093',
    roleName: 'Farmer',
    gender: 'male',
    resAddress: '20, Khartoum Street, Wuse',
    ageGroup: 'senior',
    hasBankAccount: false,
    hasSmartphone: false,
    profilePic: { url: '' },
  };

  const initialSignupData: SignupData = {
    userDetails: initialUserDetails,
    idUpload: {
      idType: 'nimc',
      idNumber: '234567887626',
      url: '',
    },
    siteId: '',
    farmDetails: [],
    ...(initialUserDetails.hasBankAccount && {
      bankDetails: {
        accountNumber: 1239876532,
        bankName: 'Access Bank',
      },
    }),
  };

  const [signupData, setSignupData] = useState<SignupData>(initialSignupData);

  console.log('SIGNUP DATA ARE', signupData);

  return (
    <SignupContext.Provider value={{ signupData, setSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};
