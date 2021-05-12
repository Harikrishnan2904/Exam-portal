const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const pool =require('./database.js');
const port = 5000;
app.listen(port, ()=>{
    console.log(`Listening at port ${port}...`);
});


app.get('/admin/exams', async(req,res)=>{
    try {
        const query = await pool.query('select * from exam');
        res.send(query.rows);
        console.log(query.rows);
    } catch (error) {
        console.log(error);
    }
});

app.get('/admin/student', async(req,res)=>{
    try {
        const query = await pool.query('select * from student');
        res.send(query.rows);
        console.log(query.rows);
    } catch (error) {
        console.log(error);
    }
});

app.post('/admin/exams',async(req,res)=>{
    try {
        const {subname} = req.body;
        const query =await pool.query('call insert_into_exam($1)',
        [subname]
        );
        console.log(query);
        res.send('Inserted into Exam');
    } catch (error) {
        console.log(error);
    }
});

app.post('/admin/student',async(req,res)=>{
    try {
        console.log(req.body);
        const {studentname, password, phno} = req.body;
        const query =await pool.query('call insert_into_student($1,$2,$3)',
        [studentname, password, phno]
        );
        console.log(query);
        res.send('Inserted into Exam');
    } catch (error) {
        console.log(error);
    }
});
app.delete('/admin/student/:sid', async(req,res)=>{
    try {
        const {sid} = req.params;
        const query = pool.query('delete from student where sid=$1 returning *',[sid]);
        console.log(query.rows);
        res.send(query.rows);

    } catch (error) {
        console.log(error);
    }
});

app.post('/exam/enroll', async(req,res)=>{
    try {
        const {sid,eid} = req.body;
        const query = pool.query('call insert_into_linker(CAST($1 AS VARCHAR(255)),CAST($2 AS VARCHAR(255)))',[sid,eid]);
        res.send('Inserted...');
        console.log(query);
    } catch (error) {
        console.log(error);
    }
});

app.get('/student/myexams/:sid',async(req,res)=>{
    try {
        const {sid} = req.params;
        const query = await pool.query('select eid,marks,subname from linker natural left join exam where sid=cast($1 as integer)',[sid]);
        res.send(query.rows);
    } catch (error) {
        console.log(error);
    }
});

app.get('/admin/exams/markentry/:eid',async(req,res)=>{
    try {
        const {eid} = req.params;
        console.log(eid);
        const query = await pool.query('select sid,sname,marks from linker natural left join student where eid=CAST($1 as INTEGER)',[eid]);
        res.json(query.rows);
    } catch (error) {
        console.log(error);
    }
});