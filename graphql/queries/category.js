import { gql } from 'graphql-request';

export const GetCategoriesQuery = gql`
{
    Categories {
        category_uid
        category_name
        display_order
    }
}
`;

export const GetCategoryQuery = gql`
   query getCategory($category_uid: ID!){
    Category(category_uid: $category_uid) {
        category_uid
        category_name
        category_description
        is_active
        display_order
    }
}
`;