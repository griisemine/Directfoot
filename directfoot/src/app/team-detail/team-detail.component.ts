import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  teamID = ""
  leagueID = ""
  season = ""
  responses: Array<ResponsesMatch> = [];
  tabInt: Array<number> = [];

  data!:Content;
  readonly ROOT_URL = "https://v3.football.api-sports.io";
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.teamID = params['id'];
        this.leagueID = params['league'];
        this.season = params['season'];
    });
  }

  ngOnInit(): void {
    if( this.teamID.length > 0 && this.leagueID.length > 0 && this.season.length > 0 ){
      console.log(this.teamID)
      this.envoyerRequete(this.teamID)
      this.ChargerCinqDerniereMatch();
    }
  }

    /**
   * Methode qui permet d'envoyer la requete
   * au serveur avec les parametre voulu
   * @param params les parametres de la requete
   */
     envoyerRequete (id:string){
      
       const headers = new HttpHeaders()
        .set('x-rapidapi-host', 'v3.football.api-sports.io')
        .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');
      this.http.get(this.ROOT_URL + '/teams/statistics?league='+ this.leagueID + '&team='+ this.teamID + '&season=' + this.season ,{ headers , responseType: 'text' } )
              .subscribe( data =>  this.dataParser( JSON.parse(data) )  );
      
      //https://v3.football.api-sports.io/fixtures?league=61&season=2020&round=Regular Season - 32"
      // this.http.get('https://samymahi.eu/team-detail.json' , {  responseType: 'text' } ).subscribe( data =>  this.dataParser( JSON.parse(data) )  );
    }

    ChargerCinqDerniereMatch(){
      const headers = new HttpHeaders()
        .set('x-rapidapi-host', 'v3.football.api-sports.io')
        .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');
      this.http.get(this.ROOT_URL + '/fixtures?team='+ this.teamID + '&last=6' ,{ headers , responseType: 'text' } )
              .subscribe( data =>  this.dataParserMatch( JSON.parse(data) )  );
    }

    dataParserMatch( data:ContentMatch ){
      console.log("Je commence fini")
      console.log(data)
      for( var i=0 ; i < data.results ; i++ ){
       this.responses[i] = data.response[i];
       this.tabInt[i] = i;
     } 
    }
    
    /**
     * Methode qui permet de parser les donnees recu
     * dans une interface du type Content
     * appliquer directement ces information dans le 
     * html
     * @param data jeu de donnee recu
     */
    dataParser( data:Content ){
      console.log(data)
      this.data = data
      data.response.team.name
      data.response.team.logo
    }

    

}

interface ContentMatch {
  get:string;
  response:Array<ResponsesMatch>;
  results:number;
}

interface ResponsesMatch {
  fixture:{
    date:string,
    id:number,
    status:{
      long:string,
      elapsed:string
    }

  },
  league:{
    id:string,
    name:string,
    country:string,
    logo:string,
    flag:string,
    season:string
  },
  goals:{
    away:string,
    home:string
  },
  teams:{
    away:{
      id:string,
      logo:string,
      name:string,
      winner:string
    },
    home:{
      id:string,
      logo:string,
      name:string,
      winner:string
    }
  }
}

interface Content {
  get:string,
  results:number,
  response:{
    league:{
      id:string,
      name:string,
      country:string,
      logo:string,
      flag:string,
      season:string
    },
    team:{
      id:string,
      name:string,
      logo:string
    },
    form:string,
    fixtures:{
      played:{
        home:string,
        away:string,
        total:string
      },
      wins:{
        home:string,
        away:string,
        total:string
      },
      draws:{
        home:string,
        away:string,
        total:string
      },
      loses:{
        home:string,
        away:string,
        total:string
      },
    },
    goals:{
      for:{
        total:{
          home:string,
          away:string,
          total:string
        },
        average:{
          home:string,
          away:string,
          total:string
        },
        minute:{
          "0-15":{
            total:string,
            percentage:string
          },
          "16-30":{
            total:string,
            percentage:string
          },
          "31-45":{
            total:string,
            percentage:string
          },
          "46-60":{
            total:string,
            percentage:string
          },
          "61-75":{
            total:string,
            percentage:string
          },
          "76-90":{
            total:string,
            percentage:string
          },
          "91-105":{
            total:string,
            percentage:string
          },
          "106-120":{
            total:string,
            percentage:string
          }
        }
      },
      against:{
        total:{
          home:string,
          away:string,
          total:string
        },
        average:{
          home:string,
          away:string,
          total:string
        },
        minute:{
          "0-15":{
            total:string,
            percentage:string
          },
          "16-30":{
            total:string,
            percentage:string
          },
          "31-45":{
            total:string,
            percentage:string
          },
          "46-60":{
            total:string,
            percentage:string
          },
          "61-75":{
            total:string,
            percentage:string
          },
          "76-90":{
            total:string,
            percentage:string
          },
          "91-105":{
            total:string,
            percentage:string
          },
          "106-120":{
            total:string,
            percentage:string
          }
        }
      }
    },
    biggest:{
      streak:{
        wins:string,
        draws:string,
        loses:string
      },
      wins:{
        home:string,
        away:string
      },
      loses:{
        home:string,
        away:string
      },
      goals:{
        for:{
          home:string,
          away:string
        },
        against:{
          home:string,
          away:string
        }
      }
    },
    clean_sheet:{
      home:string,
      away:string,
      total:string
    },
    failed_to_score:{
      home:string,
      away:string,
      total:string
    },
    penalty:{
      scored:{
        total:string,
        percentage:string
      },
      missed:{
        total:string,
        percentage:string
      },
      total:string
    },
    lineups:Array<{
      formation:string,
      played:string
    }>,
    cards:{
      yellow:{
  
        "0-15":{
          total:string,
          percentage:string
        },
        "16-30":{
          total:string,
          percentage:string
        },
        "31-45":{
          total:string,
          percentage:string
        },
        "46-60":{
          total:string,
          percentage:string
        },
        "61-75":{
          total:string,
          percentage:string
        },
        "76-90":{
          total:string,
          percentage:string
        },
        "91-105":{
          total:string,
          percentage:string
        },
        "106-120":{
          total:string,
          percentage:string
        }
      },
      red:{
  
        "0-15":{
          total:string,
          percentage:string
        },
        "16-30":{
          total:string,
          percentage:string
        },
        "31-45":{
          total:string,
          percentage:string
        },
        "46-60":{
          total:string,
          percentage:string
        },
        "61-75":{
          total:string,
          percentage:string
        },
        "76-90":{
          total:string,
          percentage:string
        },
        "91-105":{
          total:string,
          percentage:string
        },
        "106-120":{
          total:string,
          percentage:string
        }
      }
    }
  
  }
}

interface Statistique {
  league:{
    id:string,
    name:string,
    country:string,
    logo:string,
    flag:string,
    season:string
  },
  team:{
    id:string,
    name:string,
    logo:string
  },
  form:string,
  fixtures:{
    played:{
      home:string,
      away:string,
      total:string
    },
    wins:{
      home:string,
      away:string,
      total:string
    },
    draws:{
      home:string,
      away:string,
      total:string
    },
    loses:{
      home:string,
      away:string,
      total:string
    },
  },
  goals:{
    for:{
      total:{
        home:string,
        away:string,
        total:string
      },
      average:{
        home:string,
        away:string,
        total:string
      },
      minute:{
        "0-15":{
          total:string,
          percentage:string
        },
        "16-30":{
          total:string,
          percentage:string
        },
        "31-45":{
          total:string,
          percentage:string
        },
        "46-60":{
          total:string,
          percentage:string
        },
        "61-75":{
          total:string,
          percentage:string
        },
        "76-90":{
          total:string,
          percentage:string
        },
        "91-105":{
          total:string,
          percentage:string
        },
        "106-120":{
          total:string,
          percentage:string
        }
      }
    },
    against:{
      total:{
        home:string,
        away:string,
        total:string
      },
      average:{
        home:string,
        away:string,
        total:string
      },
      minute:{
        "0-15":{
          total:string,
          percentage:string
        },
        "16-30":{
          total:string,
          percentage:string
        },
        "31-45":{
          total:string,
          percentage:string
        },
        "46-60":{
          total:string,
          percentage:string
        },
        "61-75":{
          total:string,
          percentage:string
        },
        "76-90":{
          total:string,
          percentage:string
        },
        "91-105":{
          total:string,
          percentage:string
        },
        "106-120":{
          total:string,
          percentage:string
        }
      }
    }
  },
  biggest:{
    streak:{
      wins:string,
      draws:string,
      loses:string
    },
    wins:{
      home:string,
      away:string
    },
    loses:{
      home:string,
      away:string
    },
    goals:{
      for:{
        home:string,
        away:string
      },
      against:{
        home:string,
        away:string
      }
    }
  },
  clean_sheet:{
    home:string,
    away:string,
    total:string
  },
  failed_to_score:{
    home:string,
    away:string,
    total:string
  },
  penalty:{
    scored:{
      total:string,
      percentage:string
    },
    missed:{
      total:string,
      percentage:string
    },
    total:string
  },
  lineups:Array<{
    formation:string,
    played:string
  }>,
  cards:{
    yellow:{

      "0-15":{
        total:string,
        percentage:string
      },
      "16-30":{
        total:string,
        percentage:string
      },
      "31-45":{
        total:string,
        percentage:string
      },
      "46-60":{
        total:string,
        percentage:string
      },
      "61-75":{
        total:string,
        percentage:string
      },
      "76-90":{
        total:string,
        percentage:string
      },
      "91-105":{
        total:string,
        percentage:string
      },
      "106-120":{
        total:string,
        percentage:string
      }
    },
    red:{

      "0-15":{
        total:string,
        percentage:string
      },
      "16-30":{
        total:string,
        percentage:string
      },
      "31-45":{
        total:string,
        percentage:string
      },
      "46-60":{
        total:string,
        percentage:string
      },
      "61-75":{
        total:string,
        percentage:string
      },
      "76-90":{
        total:string,
        percentage:string
      },
      "91-105":{
        total:string,
        percentage:string
      },
      "106-120":{
        total:string,
        percentage:string
      }
    }
  }

}
