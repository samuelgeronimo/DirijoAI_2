alter table instructors 
add column if not exists service_mode text check (service_mode in ('student_home', 'meeting_point', 'both'));

comment on column instructors.service_mode is 'The mode of service delivery: at student home, at a meeting point, or both.';
