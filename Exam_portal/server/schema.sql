create table student(
    SID serial primary key not null,
    SName varchar(30) not null unique,
    Pwd varchar(30) not null,
    PhNo varchar(30) not null
);
create table exam(
    EID serial primary key not null,
    SubName varchar(30) not null
);
create table linker(
    SID int not null,
    EID int not null,
    Marks int DEFAULT NULL,
    primary key(SID,EID),
    foreign key(SID) references student(SID) ON UPDATE CASCADE ON DELETE CASCADE, 
    foreign key(EID) references exam(EID) ON UPDATE CASCADE ON DELETE CASCADE
);
drop table exam;
drop table linker;
drop table student;

CALL insert_into_exam('Chemistry');
CALL insert_into_exam('Tamil');
CALL insert_into_exam('India');
CALL insert_into_exam('physics');
CALL insert_into_exam('Biology');
CALL insert_into_exam('Computer Science');
CALL insert_into_exam('OS');
CALL insert_into_exam('OT');
CALL insert_into_exam('SP');
CALL insert_into_exam('DBMS');