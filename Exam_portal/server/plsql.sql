CREATE or REPLACE PROCEDURE insert_into_exam(sn in varchar(255))
LANGUAGE SQL AS
$$
insert into exam(SubName) values(sn);
$$;
CREATE or REPLACE PROCEDURE insert_into_linker(sid in varchar(255),eid in varchar(255))
LANGUAGE SQL AS
$$
insert into linker(SID,EID) values(cast(sid as int),cast(eid as int));
$$;

CREATE or REPLACE PROCEDURE insert_into_student(sn in varchar(255),pwd in varchar(255), ph in varchar(255))
LANGUAGE SQL AS
$$
insert into student(SName,Pwd,PhNo) values(sn,pwd,ph);
$$;

CALL insert_into_exam('Math');
CALL insert_into_student('Rakshith','raksh','1234567890');
CALL insert_into_linker('1','1','23');


select eid,marks,subname from linker natural left join exam where sid=4;