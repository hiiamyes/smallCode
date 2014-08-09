
1. read date, keyword, latitude, longitude from photo's metadata

1. write into a sqlite database

1. finally, you can use

```
$sqlite3 app.sqlite
sqlite> select * from photo
```  
to see the result of db content
