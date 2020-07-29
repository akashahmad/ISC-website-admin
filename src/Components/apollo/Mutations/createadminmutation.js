import gql from 'graphql-tag';

export const CREATE_ADMIN = gql`
  mutation createAdmin(
                        $Email:String!,
                        $Password:String!,
                        $RoleId:Int!,
                        $Name:String!,
                        $Status:String!,
                        $CreatedDate:DateTime!,
                        $CreatedIp: Int!,
                        $CreatedBy: Int!
                        )
                       {
    createAdmin (Email:$Email ,
                Password:$Password,
                RoleId:$RoleId,
                Name:$Name,
                Status:$Status,
                CreatedDate:$CreatedDate,
                CreatedIp:$CreatedIp,
                CreatedBy:$CreatedBy)
                {
                   error
                }
        }
`;

