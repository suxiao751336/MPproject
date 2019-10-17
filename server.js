const express=require('express');
const cors=require('cors');
const mysql=require('mysql');

const app=express();

//const selectAll = 'select * from lostandfound where unit_id>(select count(*) from lostandfound)-5 order by unit_id asc limit 5 ';
const selectAll = 'select * from lostandfound';
const connection=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'root',
    database:'lostandfound'
});

connection.connect(err => {
    if(err){
        return err;
    }
});

app.use(cors());

// app.get('/',(req,res)=>{
// res.send('go to /measurement to see measurement');
// });

app.get('/found',(req,res)=>{
connection.query(selectAll,(err, results)=>{
    if(err){
        return res.send(err)
    }
    else{
        return res.json({
            data: results
        })
    }
})
})

app.get('/found/add',(req,res)=>{
const{name,logo,lengths,width,color,mark,time,descr,area}=req.query;
//console.log(name,logo,lengths,width,color,mark,time,descr,area);
const INSERT_PRODUCTS_QUERY="INSERT INTO lostandfound (name,logo,lengths,width,color,mark,time,descr,area) VALUES ('"+name+"','"+logo+"','"+lengths+"','"+width+"','"+color+"','"+mark+"','"+time+"','"+descr+"','"+area+"')"

connection.query(INSERT_PRODUCTS_QUERY,(err,results)=>{
    if(err){
        return res.send(err)
    }else{
        return res.send('successfully added product')
    }
});
});

app.get('/found/delect',(req,res)=>{
    const{ID}=req.query;
    //console.log(name);
    const DELECT_PRODUCTS_QUERY="DELETE FROM lostandfound WHERE ID='"+ID+"'"
    connection.query(DELECT_PRODUCTS_QUERY,(err,results)=>{
        if(err){
            return res.send(err)
        }else{
            return res.send('successfully delect product')
        }
    });
    });

app.listen(5000,()=>{
    console.log('products server listening on 8080')
})