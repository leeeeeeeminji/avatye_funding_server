drop procedure follow;

DELIMITER $$
create PROCEDURE `follow`(IN user varchar(50),followeduser varchar(50))
begin
    declare follownum int;
    declare followCheck int;
    set follownum = (select count(*) from follow where follow.following = user and followed = followeduser);
    set followCheck = (select followingCheck from follow where following = user and followed = followeduser);
    if(follownum) = 1 then
            if(followCheck) = 1 then
                update follow set followingCheck = 0 where following = user and followed = followeduser;
                select 0 as result;
            else
                update follow set followingCheck = 1 where following = user and followed = followeduser;
                select 1 as result;
            end if;
    else
        insert into follow(following, followed) values (user,followeduser);
        select 1 as result;
    end if;
end $$
DELIMITER;