// 1 RTRJobs
// 2 Vetting
// 3 Learning
// 4 Interview

import {interviewerJsonList} from './interviewerJsonList'

export const todosJson = [
    {
        id : '01',
        type : 1,
        title : 'RTR',
        data : [
            {
                id: 'job_1',
                job_title : 'UI/UX Designer',
                company_name : 'Microsoft',
                company_location : 'California, USA',
                days_ago : '2',
                company_logo : 'https://venture2impact.org/wp-content/uploads/2019/06/microsoft-logo-small-29.png',
                is_promoted : false,
                job_mode : 0,
                currency : 'USD',
                currency_sign : '$',
                minimum_salary : '50K',
                maximum_salary : '70K',
                salary_period : 'year',
                is_new : true
            },
            {
                id: 'job_2',
                job_title : 'Mobile App Developer',
                company_name : 'Tek System LLC',
                company_location : 'Jacksonville, USA',
                days_ago : '5',
                company_logo : 'https://westmichigan.iiba.org/sites/hamptonroads/files/teksystems_new_logo_png.png',
                is_promoted : true,
                job_mode : 0,
                currency : 'USD',
                currency_sign : '$',
                minimum_salary : '50K',
                maximum_salary : '70K',
                salary_period : 'year',
                is_new : false
            },
            {
                id: 'job_3',
                job_title : 'Graphic Designer',
                company_name : 'Atlassian',
                company_location : 'California, USA',
                days_ago : '3',
                company_logo : 'https://uploads-ssl.webflow.com/5c29380b1110ec92a203aa84/5c43ff7e27353e502b27fe3a_corporate-deck%402x_V2.png',
                is_promoted : false,
                job_mode : 0,
                currency : 'USD',
                currency_sign : '$',
                minimum_salary : '45K',
                maximum_salary : '65K',
                salary_period : 'year',
                is_new : false
            }
        ]
    },
    {
        id : '02',
        type : 2,
        title : 'Vetting',
        data : []
    },
    {
        id : '03',
        type : 3,
        title : 'Learning',
        data : [
            {
                id : '1L',
                course_name : 'Java',
                status : 0,
                complete_percentage : 0,
                chapters : [],
                last_updated : '2 days ago'
            },
            {
                id : '2L',
                course_name : 'React Native',
                status : 1,
                complete_percentage : 63,
                chapters : [],
                last_updated : '2 days ago'
            },
            {
                id : '3L',
                course_name : 'Java/Kotlin',
                status : 0,
                complete_percentage : 40,
                chapters : [],
                last_updated : '2 days ago'
            },
        ]
    },
    {
        id : '04',
        type : 4,
        title : 'Interview',
        data : [interviewerJsonList[0],interviewerJsonList[1]]
    }
]