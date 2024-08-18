import React, { createContext, useState, ReactNode } from 'react';

type UserDetails = {
  firstName: string;
  lastName: string;
  credential: string;
  email: string;
  password: string;
  roleName: string;
  gender: string;
  resAddress: string;
  ageGroup: string;
  hasBankAccount: string;
  hasSmartphone: boolean;
  profilePic: {
    url: string;
  };
};

type IdUpload = {
  idType: string;
  idNumber: string;
  url: string;
};

type BankDetails = {
  accountNumber: number;
  bankName: string;
};

type FarmDetail = {
  name: string;
  address: string;
  long: number;
  lat: number;
  docUploads: { url: string }[];
  crops: { cropId: string; farmSeasonStart: string; farmSeasonEnd: string }[];
};

type SignupContextType = {
  userDetails: UserDetails;
  idUpload: IdUpload;
  siteId: string;
  bankDetails?: BankDetails;
  farmDetails: FarmDetail[];
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
  setIdUpload: React.Dispatch<React.SetStateAction<IdUpload>>;
  setSiteId: React.Dispatch<React.SetStateAction<string>>;
  setBankDetails: React.Dispatch<React.SetStateAction<BankDetails | undefined>>;
  setFarmDetails: React.Dispatch<React.SetStateAction<FarmDetail[]>>;
};

const defaultValues: SignupContextType = {
  userDetails: {
    firstName: '',
    lastName: '',
    credential: '',
    email: '',
    password: '',
    roleName: '',
    gender: '',
    resAddress: '',
    ageGroup: '18',
    hasBankAccount: '',
    hasSmartphone: false,
    profilePic: { url: '' }
  },
  idUpload: {
    idType: '',
    idNumber: '',
    url: ''
  },
  siteId: '',
  bankDetails: undefined,
  farmDetails: [],
  setUserDetails: () => {},
  setIdUpload: () => {},
  setSiteId: () => {},
  setBankDetails: () => {},
  setFarmDetails: () => {}
};

const SignupContext = createContext<SignupContextType>(defaultValues);

const SignupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>(defaultValues.userDetails);
  const [idUpload, setIdUpload] = useState<IdUpload>(defaultValues.idUpload);
  const [siteId, setSiteId] = useState<string>(defaultValues.siteId);
  const [bankDetails, setBankDetails] = useState<BankDetails | undefined>(defaultValues.bankDetails);
  const [farmDetails, setFarmDetails] = useState<FarmDetail[]>(defaultValues.farmDetails);

  return (
    <SignupContext.Provider
      value={{
        userDetails,
        idUpload,
        siteId,
        bankDetails,
        farmDetails,
        setUserDetails,
        setIdUpload,
        setSiteId,
        setBankDetails,
        setFarmDetails
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export { SignupProvider, SignupContext };
