const express=require('express');
const cors=require('cors');
const mysql=require('mysql');

const app=express();

//const selectAll = 'select * from lostandfound where unit_id>(select count(*) from lostandfound)-5 order by unit_id asc limit 5 ';
const selectAll = 'select * from lostandfound';

const selectAll01 = 'select * from loselist order by id';
const connection=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'1234',
    database:'huangjing'
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



app.get('/measurement',(req,res)=>{
    connection.query(selectAll,(err, results)=>{
        if(err){
            return res.send(err)
        }
        else{
            
            console.log(JSON.stringify(results));
            return res.json({
                data: results
    
            });
            
            
        }
    })
    })




    app.get('/measurement/detail',(req,res)=>{
        const {ID}=req.query;
       console.log(ID);
        const detail_quary=" SELECT * FROM loselist WHERE ID='"+ID+"'"
                                   
       connection.query(detail_quary,(err,results)=>{
            if(err){
                return res.send(err)
            }else{
               
               console.log(results);
            return res.json({
                data: results
               
            });
            
            }
        });
        });




        app.get('/measurement/chart',(req,res)=>{
    
            const detail_quary="SELECT area ,count(*) as time FROM loselist group by area"
                                       
           connection.query(detail_quary,(err,results)=>{
                if(err){
                    return res.send(err)
                }else{
                   
                   console.log(results);
                return res.json({
                    data: results
                   
                });
                
                }
            });
            });




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