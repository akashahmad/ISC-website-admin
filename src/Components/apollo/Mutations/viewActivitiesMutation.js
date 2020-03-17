import gql from 'graphql-tag'

export const VIEW_MUTATION = gql`
mutation userActivity(
    $page:Int!,
    $limit:Int!
  )
  {
    userActivity(
    page: $page,
    limit:$limit
  )
    {
    userActivity
    {
        Image
        CampaignId
        CreatedDate
        CampaignName {
          Id
          Name
          error
        }

    }
    totaluserActivity
    totalPages
    currentPage
    error
    
    }
  }
`;


// userName {
//   Id
//   Name
//   Status
//   is_affiliated
//   CreatedDate
//   }

