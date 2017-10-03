import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDbTestProvider implements InMemoryDbService {

  createDb() {

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
        "id": "1",
        "username": "remkohdev",
        "thumbnail": "assets/imgs/person1.png",
        "email": "remkohdev@gmail.com",
        "linkedin": "https://linkedin.com/in/remkohdev/",
        "firstname": "Remko",
        "lastname": "de Knikker",
        "city": "New York",
        "state": "NY",
        "country": "US",
        "college": "",
        "degree": "CS",
        "company": "IBM",
        "bio": "",
        "role": "developer"
      },
      {
        "id": "2",
        "username": "longemilyn",
        "thumbnail": "assets/imgs/person2.png",
        "email": "longemilyn@gmail.com",
        "linkedin": "https://www.linkedin.com/in/emily-long-1a0a87b4/",
        "firstname": "Emily",
        "lastname": "Long",
        "city": "",
        "state": "NY",
        "country": "US",
        "college": "CUNY BMCC",
        "degree": "CS",
        "company": "",
        "bio": "",
        "role": "business lead"
      },
      {
        "id": "3",
        "username": "klantiislam",
        "thumbnail": "assets/imgs/person3.png",
        "email": "",
        "linkedin": "https://www.linkedin.com/in/klantiislam/",
        "firstname": "Klanti",
        "lastname": "Islam",
        "city": "",
        "state": "",
        "country": "",
        "college": "CUNY Brooklyn College",
        "degree": "AA",
        "company": "",
        "bio": "",
        "role": "developer"
      },
      {
        "id": "4",
        "username": "aavetisian",
        "thumbnail": "assets/imgs/person4.png",
        "email": "",
        "linkedin": "https://www.linkedin.com/in/albert-avetisian/",
        "firstname": "Albert",
        "lastname": "Avetisian",
        "city": "",
        "state": "NY",
        "country": "US",
        "college": "CUNY Baruch",
        "degree": "CS",
        "company": "IBM",
        "bio": "Design minded developer of web applications, experiences, and businesses. Working daily to realize designs into tangible prototypes, solutions, and tools for the enterprise in the form of web and hybrid mobile applications. Besides developing interfaces, I work with schools like Bayside High School to bring advanced technical education and opportunities to better prepare students for their careers.",
        "role": "developer"
      }
    ];

    let project = [
      {
        "id" : 1,
        "title" : "Hacking App",
        "description" : "Some kind of sample app that we want to make at the upcoming CUNY Hackathon. Please help!",
        "url": "",
        "prototype": ""
      }
    ];

    let team = [
      {
        "id" : 1,
        "name" : "d0pe hAckers_01",
        "thumbnail": "assets/imgs/team_icon_1.png",
        "description" : "Some kind of sample team that intended to work at the upcoming CUNY Hackathon. Super talented team that does..uh..hacking.",
        "members": [
          1,2
        ],
        "projects": [
          1
        ]
      }
    ];
    
    return { feed, notification, profile, project, team };
  }
  
}
