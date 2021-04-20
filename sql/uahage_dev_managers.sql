-- ## 우아하게 애플리케이션 개발용 테이블 명세서 V1 ✨ ##

-- 즐겨찾기 ( 북마크 )
create table managers(
	id serial primary key, -- pk 
	email varchar(50) unique not null, -- 이메일 
	password varchar(200) not null, -- 비밀번호
	nickname varchar(20) not null, -- 닉네임
	roles varchar(10) default 'GENERAL' not null, -- 역할 "SUPER / MANAGER / GENERAL"
	email_matched smallint default 0 not null, -- 이메일 확인 여부
	is_verified smallint default 0 not null, -- 관리자 승인 여부
	refresh_token varchar(255), 
	created_at timestamp default now(), -- 생성일
	updated_at timestamp, -- 수정일
);

comment on table public.managers
is '
다른 데이터들을 관리할 수 있는 관리자 테이블
- 역할에 따라 권한 제한
';

-- select U.email, P.
-- from users as U
-- left join places as P
select * from managers;