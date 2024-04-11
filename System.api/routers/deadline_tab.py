from fastapi import APIRouter,Depends, Request 
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from storage.database import get_db
from storage import querydata
from datetime import datetime





router = APIRouter(prefix="",
                   tags=["Deadline tab"])

@router.get("/api/v1/works")
def get_all_works(person:str = None, db:Session = Depends(get_db)):
    if person:
        data = querydata.get_filtered_works(db,person) 
    else:
        data = querydata.get_filtered_works(db,person)
    
     
    today = datetime.now()
    format_today = today.strftime("%Y-%m-%d %H:%M:%S")
      
    over_due = list(filter(lambda x:datetime.strptime(x['deadline'],"%Y-%m-%d %H:%M:%S") < format_today,data))       
    due_today = list(filter(lambda x:datetime.strptime(x['deadline'],"%Y-%m-%d %H:%M:%S") == format_today,data)) 
    
    # due_this_week = list(filter(lambda x:datetime.strptime(x['deadline'],"%Y-%m-%d %H:%M:%S") == format_today,data)) not finished
    # due_next_week = list(filter(lambda x:datetime.strptime(x['deadline'],"%Y-%m-%d %H:%M:%S") == format_today,data)) not finished
    
    
    no_deadline = list(filter(lambda x:x['deadline']==None,data))       
    due_over_two_weeks = list(filter(lambda x:x['deadline']==None,data)) 
        
    return {"data":
                {"over_due":over_due,
                 "due_today":due_today,
                 "due_this_week":due_this_week,
                 "due_next_week":due_next_week,
                 "no_deadline":no_deadline,
                 "due_over_two_weeks":due_over_two_weeks
                }
            }

