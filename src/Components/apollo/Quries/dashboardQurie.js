import gql from 'graphql-tag';

export const ADMIN_DASHBOARD=gql`
{ 
adminDashboard
    {   
      TotalSupportToday
      TotalSupportLastWeek
    }
}`;