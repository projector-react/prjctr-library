export type User = {
    readonly id: number;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
};

export type AuthenticatedState =
    | {
          readonly isAuthenticated: false;
      }
    | {
          readonly isAuthenticated: true;
          readonly user: User;
      };

export type AuthService = {
    readonly register: (email: string, password: string) => Promise<User>;
    readonly login: (email: string, password: string) => Promise<User>;
    readonly logout: () => void;
    readonly getCurrentUser: () => AuthenticatedState;
};
