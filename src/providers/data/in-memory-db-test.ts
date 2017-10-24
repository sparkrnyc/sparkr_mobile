import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDbTestProvider implements InMemoryDbService {

  createDb() {
    
    // activity log 
    let feed = [
      {
        id : 1,
        name : 'feed_post1',
        property1 : 1,
        property2 : 2,
        property3 : 'prop3',
        date_created : '2017-01-15',
        startdate : '2017-01-21',
        enddate : '2017-02-25'
      },
      {
        id : 2,
        name : 'feed_post2',
        property1 : 1,
        property2 : 2,
        property3 : 'prop3',
        date_created : '2017-02-15',
        startdate : '2017-02-21',
        enddate : '2017-03-25'
      }
    ];

    let notification = [
      {
        "id" : 1
      }
    ];

    let profile = [
      {
        id: "1",
        name: "Remko de Knikker",
        thumbnail: "assets/imgs/roles/developer.png",
        email: "user1@email.com",
        linkedin: "https://linkedin.com/in/remkohdev/",
        college: "Amsterdam University of Applied Sciences",
        major: "History",
        bio: "",
        role: "Developer"
      },
      {
        id: "2",
        name: "Emily Long",
        thumbnail: "assets/imgs/roles/business.png",
        email: "longemilyn@email.com",
        linkedin: "https://www.linkedin.com/in/emily-long-1a0a87b4/",
        college: "CUNY BMCC",
        major: "CS",
        bio: "Entrepreneur. Passionate about change. Advocate for Women in Technology.",
        role: "Business"
      },
      {
        id: "3",
        name: "Klanti Islam",
        thumbnail: "assets/imgs/roles/developer.png",
        email: "klantiislam@email.com",
        linkedin: "https://www.linkedin.com/in/klantiislam/",
        college: "CUNY Brooklyn College",
        major: "AA",
        bio: "Active Member at Women in Technology and Entrepreneurship (WiTNY)",
        role: "Developer"
      },
      {
        id: "4",
        name: "Albert Avetisian",
        thumbnail: "assets/imgs/roles/developer.png",
        email: "aavetis@email.com",
        linkedin: "https://www.linkedin.com/in/albert-avetisian/",
        college: "CUNY Baruch",
        degree: "CS",
        bio: "Design minded developer of web applications, experiences, and businesses. Working daily to realize designs into tangible prototypes, solutions, and tools for the enterprise in the form of web and hybrid mobile applications. Besides developing interfaces, I work with schools like Bayside High School to bring advanced technical education and opportunities to better prepare students for their careers.",
        role: "Developer"
      },
      {
        id: "5",
        name: "olga",
        thumbnail: "assets/imgs/roles/business.png",
        email: "olga@email.com",
        linkedin: "https://www.linkedin.com/in/olgabartnicki/",
        college: "Harvard",
        major: "",
        bio: "Innovative and decisive leader with extensive experience in launching startups from idea to tangible revenue-generating businesses, and launching new ventures within established companies.",
        role: "ProjectManager"
      },
      {
        id: "6",
        name: "shanesnipes1",
        thumbnail: "assets/imgs/roles/business.png",
        email: "shanesnipes1@email.com",
        linkedin: "https://www.linkedin.com/in/shanesnipes/",
        college: "Prescott College",
        major: "PhD Ed",
        bio: "I'm a professor/facilitator in academia, as well as a HR and innovation strategist for organizations. I'm expert in business people systems, innovation labs, and process redesign. I have worn many hats in my career—college faculty, chief technology officer, TV personality, innovation manager, HR executive, CEO, and education consultant. As a result, I have a unique ability to manage projects and to navigate complex challenges.",
        role: "ProjectManager"
      }
    ];

    let team = [
      {
        id : 1,
        name : "d0pe hAckers_01",
        thumbnail: "assets/imgs/team_icon_1.png",
        description : "Some kind of sample team that intended to work at the upcoming CUNY Hackathon. Super talented team that does..uh..hacking.",
        members: [
          1
        ],
        invitations: [
          
        ]
      },
      {
        id : 1,
        name : "The Russian Election Campaignteam",
        thumbnail: "assets/imgs/team_icon_2.png",
        description : "Trying to hack foreign elections and place puppet presidents in power.",
        members: [
          1,3
        ],
        invitations: [
          2
        ]
      },
      {
        id : 3,
        name : "SPARKR",
        thumbnail: "assets/imgs/teams/sparkr.png",
        description : "Thinking about going to a Hacakthon in NYC? Want to learn some new skills and test the waters? But do not have a team? Use SPARKR to let others know what you are good at and to find other team members.",
        members: [
          1,2,4
        ],
        invitations: [
          5,6
        ]
      }
    ];
      
    return { feed, notification, profile, team };
  }
  
}
