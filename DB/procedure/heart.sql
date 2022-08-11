drop procedure heart;

DELIMITER $$
create procedure heart(IN user varchar(50),project varchar(20))
begin
    declare heartnum int;
    declare heartCheckk int;
        set heartnum = (select count(*) from heart where userID = user and projectIndex = project);
        set heartCheckk = (select heartCheck from heart where userID = user and projectIndex = project);
        if(heartnum) = 1 then
                if(heartCheckk) = 1 then
                    update heart set heartCheck = 0 where userId = user and projectIndex = project;
                    select 0 as result;
                else
                    update heart set heartCheck = 1 where userId = user and projectIndex = project;
                    select 1 as result;
                end if;
        else
            insert into heart(userID, projectIndex) values (user,project);
            select 1 as result;
        end if;
end $$
DELIMITER;