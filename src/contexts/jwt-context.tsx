'use client';

import type { FC, ReactNode } from 'react';
import { createContext, useEffect, useReducer, useCallback } from 'react';
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

type Handler = (state: State, action: any) => State;

const initialState: State = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
};

const handlers: Record<ActionTypes, Handler> = {
    INITIALIZE: (state: State, action: InitializeAction): State => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    SIGN_IN: (state: State, action: SignInAction): State => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    SIGN_OUT: (state: State): State => {
        return {
            ...state,
            isAuthenticated: false,
            user: null,
        };
    },
};

const reducer = (state: State, action: Action): State => 
    handlers[action.type] ? handlers[action.type](state, action) : state;

export interface AuthContextType extends State {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    ...initialState,
    signIn: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    const initialize = useCallback(async (): Promise<void> => {
        try {
            const accessToken = globalThis.localStorage.getItem('access_token');

            if (accessToken) {
                console.log('YYYYYYYYYYYY');
            } else {
                dispatch({
                    type: ActionTypes.INITIALIZE,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    }
                });
            }
        } catch (err) {
            dispatch({
                    type: ActionTypes.INITIALIZE,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    }
                });
        }
    }, [dispatch]);

    useEffect(() => {
        initialize();
    }, []);

    const signIn = useCallback(async (email: string, password: string): Promise<void> => {
        console.log('test');
    }, [dispatch]);

    const signOut = useCallback(async (): Promise<void> => {
        console.log('test');
    }, [dispatch]);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const AuthConsumer = AuthContext.Consumer;