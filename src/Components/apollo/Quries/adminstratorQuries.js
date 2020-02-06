import gql from 'graphql-tag';

export const ADMIN_DASHBOARD= gql`
{ 
    admins{
        Id
        Email
        Name
    }
}
`;