/* You can include shared interfaces/types in a separate file
   and then use them in any component by importing them. For
   example, to import the interface below do:

   import { User } from 'path/to/interfaces';
*/

export type User = {
  id: number;
  name: string;
};

export type SvgProps = {
  width?: number;
  height?: number;
  fill?: string;
  title?: string;
  className?: string;
};

export interface GuideIState {
  show: boolean;
  mode: number;
}

export interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T;
}
// handleChange(event: DOMEvent<HTMLInputElement>) {
//   this.setState({ value: event.target.value });
// }

export interface UserType {
  account_uid: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  profile_img: string;
  privileges: string[];
}
export interface AuthPageProps {
  token: string;
  userInfo: UserType;
}
export interface AttributeType {
  attribute_uid: string;
  product_uid: string;
  attribute_name: string;
  options: OptionType[];
}

export interface OptionType {
  option_uid: string | null;
  option_name: string | null;
  additional_price: number;
  color_hex: string | null;
}
export interface ProductType {
  product_uid?: string;
  category_uid: string;
  account_uid: string;
  title: string;
  price: number;
  discount: number;
  warehouse_location: string;
  product_description: string;
  short_description: string;
  inventory: number;
  product_weight: number;
  is_new: boolean;
  note: string;
  thumbnail:
    | {
        image_uid: string;
        image: string;
        display_order: number;
      }[]
    | null;
  gallery:
    | {
        image_uid: string;
        image: string;
        display_order: number;
      }[]
    | null;
}
export interface CategoryType {
  category_uid?: string;
  category_name: string;
  category_description: string;
  is_active: boolean;
  display_order?: number;
}
