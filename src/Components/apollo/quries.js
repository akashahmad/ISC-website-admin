import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export  const DATA = gql `
{
    admins{
        Id
        Email
    }
}
`;