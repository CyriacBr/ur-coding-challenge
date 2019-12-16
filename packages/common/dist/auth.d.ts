import { IUserProfile } from ".";
import { ServerError } from "./base";
import { ILocation } from "./location";
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
        location: ILocation;
    }
    interface Me {
        token: string;
    }
    type Error = ServerError & {
        alreadyRegistered?: boolean;
        accountNotFound?: boolean;
        incorrectCredentials?: boolean;
    };
}
