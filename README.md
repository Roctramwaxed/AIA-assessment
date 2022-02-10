# ROUTES

## POST /images
  Get list of images from flickr public feed

### Request
  ```
  request.body: {
    tags: [ STRING ]
  }
  ```
  
### Response
```
  response.data: [
    id: STRING,
    title: STRING,
    imageSrc: STRING,
    author: STRING,
    tags: [ STRING ]
  ]
```
