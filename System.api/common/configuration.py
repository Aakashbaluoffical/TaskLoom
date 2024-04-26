from pydantic import BaseSettings

import os

  

# class REDISCACHE(BaseSettings):
#     PASSWORD: str = os.environ["REDIS_PASSWORD"]
#     HOST:  str = os.environ["REDIS_HOST"]
#     PORT:  str = os.environ["REDIS_PORT"]
#     SOCKET_TIMEOUT : int = os.environ["REDIS_SOCKET_TIMEOUT"]
#     DB : int = os.environ["REDIS_DB"]

class POSTGRESDB(BaseSettings):
    USERNAME1:  str = 'postgres'
    PASSWORD: str = 'admin'
    HOST:  str = 'localhost'
    PORT:  str = '5432'
    SCHEMA: str = 'taskloom'

# # class STRAPIDB(BaseSettings):
# #     URL: str =  os.environ["STRAPI_URL"]
# #     IDENTIFIER: str =  os.environ["STRAPI_IDENTIFIER"]
# #     PASSWORD: str =  os.environ["STRAPI_PASSWORD"]

# # class VDMDB(BaseSettings):
# #     USERNAME1:  str = "analytic_user"
# #     PASSWORD: str = "bVArxruwE9RbyxnyS@Y"
# #     HOST:  str = "mscsmvdm-prod.c9jsnq2znqag.eu-west-1.rds.amazonaws.com" 
# #     PORT:  str = "SYSYEM API"
# #     SCHEMA:str = "mscsmvdm_vms"
    
CLIENT: str = "TASKLOOM" + "_"
CACHE_EXPIRY_IN_SECONDS = "1800"

class SETTINGS(BaseSettings):
    # CACHE_EXPIRY_IN_SECONDS: int = CLIENT + os.environ["CACHE_EXPIRY_IN_SECONDS"] #SECONDS
    CACHE_EXPIRY_IN_SECONDS: int = CLIENT + CACHE_EXPIRY_IN_SECONDS
    

# class CACHEKEY(BaseSettings):
    
    # TRIM_DATA: str = CLIENT + os.environ["CACHE_TRIM_DATA"]

