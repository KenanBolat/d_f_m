INSERT INTO public.core_user ("password",last_login,is_superuser,email,"name",is_active,is_staff,"blocked") VALUES
         ('pbkdf2_sha256$320000$u1QzOMxVxauADJRJ6z33NP$yaVZ/yelNEDLcWoUNSaJAUwwvSDFbOjQatceqPieNF8=','2023-12-28 22:04:34.324818+03',true,'kenan23@gmail.com','',true,true,NULL),
         ('pbkdf2_sha256$320000$eyyANevANAy3AyhwroNRnq$pfyl9sBZwtZPJdzJ/3ra2Zph0QSC9RkYlsHx8NX+ziA=',NULL,false,'demo@demo.com','k',true,true,NULL);

-- Path: demo.sql
INSERT INTO public.core_mission (satellite_mission,created_at,updated_at,is_active,description) VALUES
         ('MSG','2023-12-28 22:04:56.730515+03','2023-12-28 22:04:56.730526+03',true,'MSG'),
         ('IODC','2023-12-28 22:05:02.294308+03','2023-12-28 22:05:02.294318+03',true,'IODC');

INSERT INTO public.core_configuration (folder_locations,ftp_server,ftp_user_name,ftp_password,ftp_port,status,created_at,updated_at,is_active,satellite_mission_id) VALUES
         ('{"chanel 01": "_________", "chanel 02": "HRV______", "chanel 03": "IR_016___", "chanel 04": "IR_039___", "chanel 05": "IR_087___", "chanel 06": "IR_097___", "chanel 07": "IR_108___", "chanel 08": "IR_120___", "chanel 09": "IR_134___", "chanel 10": "VIS006___", "chanel 11": "VIS008___", "chanel 12": "WV_062___", "chanel 13": "WV_073___"}','ftp_server','foo','bar',21,'On development','2023-12-28 22:05:11.875701+03','2023-12-28 22:05:11.875711+03',true,1),
         ('{"chanel 01": "_________", "chanel 02": "HRV______", "chanel 03": "IR_016___", "chanel 04": "IR_039___", "chanel 05": "IR_087___", "chanel 06": "IR_097___", "chanel 07": "IR_108___", "chanel 08": "IR_120___", "chanel 09": "IR_134___", "chanel 10": "VIS006___", "chanel 11": "VIS008___", "chanel 12": "WV_062___", "chanel 13": "WV_073___"}','ftp_server','foo','bar',21,'On development','2023-12-28 22:05:18.152947+03','2023-12-28 22:05:18.152975+03',true,2);

INSERT INTO public.authtoken_token ("key",created,user_id) VALUES ('40af0014c54cc99c0c11ff606b74d3d5a106ce14','2023-12-28 22:06:22.22059+03',2);
