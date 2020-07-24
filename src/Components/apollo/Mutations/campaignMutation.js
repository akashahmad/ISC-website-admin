import gql from 'graphql-tag'

export const VIEW_CAMPAIGN = gql`
mutation allCampaignFilters(
      $CampaignType:String,
      $page:Int,
      $limit:Int,
      $sort: String,
      $Createduser: String,
      $CategoryId: Int,
      $Boosted:String,
      )
      { 
        allCampaignFilters(
        CampaignType:$CampaignType,
        page:$page,
        limit:$limit,
        sort:$sort,
        Createduser:$Createduser,  
        CategoryId:$CategoryId,
        Boosted:$Boosted
        )
        {
      campaigns{
        Id
        Slug
       Name
       CampaignType
        CreatedBy
        Verified
        CategoryId
        CreatedDate
        is_campaign_aws
        Status
        ShowOnList
        is_donation
        support_count
        reportCount
        recent_reported_date
       
      }
      totalPages
      totalCampaigns
    }
  }

  
`;
// creatorEmail 