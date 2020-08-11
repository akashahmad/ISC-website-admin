import gql from 'graphql-tag'

export const CREATE_NEWSLETTER = gql`
mutation createnewsletter(
    $name: String,
    $support_mailsettings_id:Int,
    $datetime: DateTime,
    $status: String,
    $group: String,
    $cron_status: String,
    $date_created: DateTime,
    $interestId: Int,
    $campaign_id: Int,
    $campaign_type: String
    )
    {
        createnewsletter(
            name:$name,
            support_mailsettings_id:$support_mailsettings_id,
            datetime:$datetime,
            status:$status,
            group:$group,
            cron_status:$cron_status,
            date_created:$date_created,
            interestId:$interestId,
            campaign_id: $campaign_id,
            campaign_type:$campaign_type
            )
            {
                Id
                error
            }
    }
`;

