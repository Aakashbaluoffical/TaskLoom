from fastapi import APIRouter,Depends,Request
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from storage.database import get_db
from storage import querydata
from datetime import datetime
from dateutil.relativedelta import relativedelta
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials #jwt
import json
import smtplib
import logging
# import requests
# import jwt   #jwt 



router = APIRouter(prefix="",
                   tags=["Login"])


@router.post("/api/v1/login")
def login(username:str = None,password:str = None, db:Session = Depends(get_db)):
    print("Here is your entered Username:",username,"and Password:",password)
    
    conditional_parameter = [None,"","undefined"]
    
    
    if (username in conditional_parameter  and password in conditional_parameter):
        return {'data': [{'data': ''}, {'Error': 'Invalid!'}]}
    if username in conditional_parameter and password in conditional_parameter:
        return {"data":[],"Error":"Please enter your Username & Password."}
        

    if username in conditional_parameter:
        return {"data":[],"Error":"Please enter your Username."}

    if password in conditional_parameter:
        return {"data":[],"Error":"Please enter your Password."}

    #--------------Function ---------------------------------------------
    # def homepage(times):
    #     print("count ",times)
    #     return '''Welcome your Home page'''
    def alert_mail(mail_subject,mail_body,to_address_mail_id,from_address_mail_id,from_address_mail_password):
        from_address = from_address_mail_id
        to_address = [to_address_mail_id]#'
        password = from_address_mail_password
        subject = mail_subject
        body = mail_body
        msg = f"Subject: {subject}\n\n{datetime}\n{body}"
        port = 587
        server = 'outlook.office365.com'
        server = smtplib.SMTP(server, port)
        server.starttls()
        server.login(from_address, password)

        try:
            server.sendmail(from_address, to_address, msg)
        except Exception as e:
            logging.error(str(e))

        server.quit()
    #----------------------------------------------------
    times = 4
    now_time = datetime.now()
    
    data = querydata.check_user_pass(db,username,password)
    data = json.dumps(jsonable_encoder(data))
    data = json.loads(data)
    if data and data['block'] == 'block':
        return {"data":[],"Error":"Account has been permanently suspended"}

        # return {'data': [{'data': ''}, {'Error': 'Account has been permanently suspended'}]}

    if data and data['block_date_time']=="" :
        
        return {"data":['Welcome to your Home page'],"Error":""}
    
    if data and data['block_date_time'] and data['times'] !=0: 
        querydata.update_times_after(db,username)
        print("data['block_date_time'] and data['times']",data['block_date_time'], data['times'])
        return {"data":['Welcome to your Home page'],"Error":""}
        
         
    elif username:
        user_check = querydata.check_user(db,username)
        user_check = json.dumps(jsonable_encoder(user_check))
        user_check = json.loads(user_check)
        if user_check :
            if user_check['times']!=0 and user_check['times'] is not None:
                times = user_check['times']-1
                querydata.update_times(db,times,username,now_time)
                return {"data":[],"Error":f"Incorrect Password, {user_check['times']} more changes"}
                
                
            else:
                user_check = querydata.check_user(db,username)
                user_check = json.dumps(jsonable_encoder(user_check))
                user_time_check = json.loads(user_check)
                if user_time_check['block_date_time'] is not None:
                    block_date_time =datetime.strptime(user_time_check['block_date_time'], "%Y-%m-%dT%H:%M:%S.%f")
                    new_block_date = block_date_time + relativedelta(minutes=1)
                    print("now_time",now_time)
                    print("new_block_date",new_block_date)
                    # if user_time_check['block'] == 'clear' and user_time_check['block'] == 'unblock':
                    if now_time > new_block_date :
                        querydata.update_times_after(db,username)
                        return {"data":[],"Error":"Your account is unlocked ,please enter correct password"}
                        

                    else:
                        return {"data":[],"Error":"Account is locked due to multiple incorrect attempts. Check after 1 minutes"}
                    
                    # else:
                    #      return {"data":"Account has been permanently suspended "}   
                else:
                    blocked_time = datetime.now()
                    querydata.update_only_times(db,username,blocked_time)
                    
                    return {"data":[],"Error":"Account is locked due to multiple incorrect attempts. Check after 1 minutes"}
                    
                
        else:
            
            return {"data":[],"Error":"User not found!"}
            
     
     
     
@router.post("/api/v1/register")
async def register(info:Request , db:Session = Depends(get_db)):
    
    data = await info.form()
    print("data",data)
    if data:
        data = querydata.check_unique_user(db,data[0]['email'])
        if data is None:
            try:
                querydata.post_user(db,data)
                return  {"data":['Registration Successful!'],"Error":""} 
            except:
                return {"data":[],"Error":"Something issue  with Database! Try Again Later."}
        else:
            return {"data":[],"Error":"Email already exist !"}
    else:
        return {"data":[],"Error":"No Data!"}      
    
         
        
     
    
    
        
        
     
     
     
    