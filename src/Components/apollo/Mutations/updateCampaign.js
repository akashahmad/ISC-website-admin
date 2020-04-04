import gql from 'graphql-tag'

export const EDIT_CAMPAIGN = gql`
mutation updateCampaign(
    $Name: String,
    $CampaignType: String,
    $ShortDescription: String,
    $Description: String,
    $goal_support: Int,
    $facebook_url: String,
    $twitter_url: String,
    $website_url: String,
    $Banner:String,
    $Primary_color: String,
    $Secondary_color: String,
    $Tertiary_color: String,
    $StartDate: DateTime,
    $EndDate: DateTime,
    $Overlay: String
    )
    {
        updateCampaign(
            Name: $Name,
            CampaignType:$CampaignType,
            ShortDescription:$ShortDescription,
            Description:$Description,
            goal_support:$goal_support,
            facebook_url:$facebook_url,
            twitter_url:$twitter_url,
            website_url:$website_url,
            Banner:$Banner,
            Primary_color:$Primary_color,
            Secondary_color:$Secondary_color,
            Tertiary_color:$Tertiary_color,
            StartDate:$StartDate,
            EndDate:$EndDate,
            Overlay:$Overlay
            )
                {
                    error
                }
        }
`;





