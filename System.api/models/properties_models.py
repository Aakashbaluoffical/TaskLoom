from datetime import date
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String ,Date, DateTime
from sqlalchemy.orm import relationship

from storage.database import Base

class User(Base):
    __tablename__ = "user_tbls"  

    id = Column(Integer, primary_key=True, index=True)
    username =  Column (String)
    password =  Column (String)
    email =  Column (String)
    status =  Column (String)
    mobile_no =  Column (Integer)
    types =  Column (String)
    block =  Column (String)
    times =  Column (Integer) 
    block_date_time =  Column (Date) 
    
    
   
class AllWorks(Base):
    __tablename__ = "all_works_tbl"  

    id = Column(Integer, primary_key=True, index=True)
    task_name = Column (String)
    assigned_person	=  Column (String)
    created_datetime =  Column (DateTime)
    finished_datetime =  Column (DateTime)
    deadline =  Column (DateTime)
    task_summary	=  Column (String)
    Project_name	=  Column (String)
    Priority	=  Column (String)
    status	=  Column (String)
    active =  Column (Boolean)
    feedback	=  Column (String)
    assigned_team	=  Column (String)
    progress =  Column (Integer)
    url	=  Column (String)
    created_by_user	=  Column (String)
    delete_by_user	=  Column (String)
    update_by_user	=  Column (String)
    update_by_manager	=  Column (String)


    
    
        