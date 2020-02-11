import gql from 'graphql-tag';

export const ADMIN_DASHBOARD= gql`
{ 
    adminDashboard{
        TotalSupportToday
        TotalSupportLastWeek
        TotalNewCampaignToday
        TotalNewCampaignLastWeek
        TotalNewUsersToday
        TotalNewUsersLastWeek
        TotalNewSupportCampaignToday
        TotalNewSupportCampaignLastWeek
        TotalNewpetitionsCampaignToday
        TotalNewpetitionsCampaignLastWeek
        TotalNewpledgesCampaignToday
        TotalNewpledgesCampaignLastWeek
        error
     }
    }
`;