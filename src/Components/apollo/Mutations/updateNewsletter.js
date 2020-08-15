import gql from 'graphql-tag'

export const UPDATE_NEWSLETTER = gql`
mutation updatenewsletter(
    $Id: Int,
    $name: String,
    $support_mailsettings_id: Int,
    $datetime: DateTime,
    $status: String,
    $group: String,
    $cron_status: String,
    $date_updated: DateTime,
    $interestId: Int,
    $campaign_id: Int,
    $campaign_type: String
    )
    {
        updatenewsletter(
            Id:$Id,
            name:$name,
            support_mailsettings_id:$support_mailsettings_id,
            datetime:$datetime,
            status:$status,
            group:$group,
            cron_status:$cron_status,
            date_updated:$date_updated,
            interestId:$interestId,
            campaign_id:$campaign_id,
            campaign_type:$campaign_type
            )
            {
                error
            }
    }
`;
