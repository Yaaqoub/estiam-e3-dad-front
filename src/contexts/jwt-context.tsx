import { createContext } from 'react';
import type { User } from '@/types/user';

interface State {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: User | null;
}

enum ActionTypes {
    INITIALIZE = 'INITIALIZE',
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT'
}

type InitializeAction = {
    type: ActionTypes.INITIALIZE,
    payload: {
        user: User | null;
        isAuthenticated: boolean;
    };
};

type SignInAction = {
    type: ActionTypes.SIGN_IN,
    payload: {
        user: User;
    };
};

type SignOutAction = {
    type: ActionTypes.SIGN_OUT;
};

type Action = InitializeAction | SignInAction | SignOutAction;