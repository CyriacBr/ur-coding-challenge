import { IUser } from "./user";
import { IShop } from "./shop";
export interface IShopDislike {
    id: number;
    user: IUser;
    shop: IShop;
    date: Date;
}
