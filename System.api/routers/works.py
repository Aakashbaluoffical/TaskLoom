from fastapi import APIRouter,Depends, Request 
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from storage.database import get_db
from storage import querydata
from datetime import datetime





router = APIRouter(prefix="",
                   tags=["works"])

@router.get("/api/v1/works")
def get_all_works(person:str = None, db:Session = Depends(get_db)):
    if person:
        data = querydata.get_all_works(db,person) 
    else:
        data = querydata.get_all_works(db,person) 
        
    return {"data":data}


@router.post("/api/v1/works")
async def get_all_works( info:Request ,db:Session = Depends(get_db)):
    data = await info.json()
    data = querydata.post_work(db,data) 
    return {'data':'Added'}


    

@router.put("/api/v1/works")
def get_all_works(db:Session = Depends(get_db)):
    data = querydata.put_work(db) 
    return {"data":data}

@router.delete("/api/v1/works")
def get_all_works(bid:int = None,person:str = None,db:Session = Depends(get_db)):
    data = querydata.delete_work(db,bid,person,None)
    if data:
        data = 'Data Deleted'
    else:
        data = 'Data Not Deteletd'
    return {'data':data}

@router.delete("/api/v1/works/undo")
def get_all_works(active:str=True,bid:int = None,person:str = None,db:Session = Depends(get_db)):
    data = querydata.delete_work(db,bid,person,active)
    if data:
        data = 'Data Retrived'
    else:
        data = 'Data Not Retrived'
    return {'data':data}