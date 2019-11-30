import { IUserProfile } from ".";
export declare namespace AuthDTO {
    interface SignUp {
        firstName: string;
        lastName: string;
        latitude: number;
        longitude: number;
        email: string;
        password: string;
    }
    interface SignIn {
        email: string;
        password: string;
    }
    interface Payload {
        userId: number;
        profile: IUserProfile;
    }
    interface Me {
        token: string;
    }
}
