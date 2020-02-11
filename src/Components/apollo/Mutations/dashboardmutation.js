import gql from 'graphql-tag';


export const LAST_WEEK_CAMPAIGN_PAGINATION= gql`
mutation lastWeekCampaignPagination (
$CampaignType: String!,
$page: Int!,
$limit: Int!
    
){
lastWeekCampaignPagination(
CampaignType: $CampaignType,
page: $page,
limit: $limit
){
campaigns{
Id
Name
Slug


}
}
}
`;

