import gql from 'graphql-tag'

export const CREATE_USER = gql`
mutation createUsers(
    $Name: String!,
    $Email: String!,
    $Password: String!,
    $Status: String,
    $CreatedDate: DateTime,
    $CreatedIp: Long
    ){
        createUsers(
            Name:$Name,
            Email:$Email,
            Password:$Password,
            Status:$Status,
            CreatedDate:$CreatedDate,
            CreatedIp:$CreatedIp
            )
    {
        Id
        error
    }

}
`;