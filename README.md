# Documentation
## How to run the project

### BUILD  
> ```docker-compose -f docker-compose.yml up --build```

### run  
> ```docker-compose -f docker-compose.yml up -d```

## Test 
> ```docker-compose -f docker-compose.yml run --rm app sh -c "python manage.py test"```

## Browser Test

### Endpoints: OpenApi Documentation 

> Default URL 
> - >  localhost:8000/api/docs
> - >  localhost:8000/admin/


### Screen-shot 

![alt text](https://github.com/KenanBolat/face-id-app-api/blob/main/faq/ss001.png?raw=true)

# data-download-app-api
## Notes 
    - APIVIEW: 
       - focused around HTTP methods 
       - Class methods for HTTP methods:
        - GET, POST, PUT, PATCH, DELETE 
       - Provide flexibility over URLS and logic 
       - Useful for non CRUD APIs: 
       - Avoid for simple Create, Read, Update, Delete APIs 
       - Bespoke logic (eg: auth, jobs, external apis)

     - ViewSet:
       - focused around actions:
       - retrieve, list, update, partial update, destroy
       - Map to Django models  
       - Use Routers to generate URLs 
       - Great for CRUD operations on models

# docker permission
> - >  sudo usermod -aG docker <user-name>
> - > sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
> - > -sudo chmod +x /usr/local/bin/docker-compose
