#!/bin/bash
set -ev
# Make sure starter fixtures can load successfully and all tests pass.
# Run tests with --keepdb to avoid OperationalError during teardown, in case
# any db connections are stillr open from threads in TransactionTestCases.

docker-compose -f docker-compose-test.yml exec nginx sh -c "nc -z -v backend_app:3000"
docker-compose -f docker-compose-test.yml exec backend_app sh -c "ping  -c 4 nginx"
docker-compose -f docker-compose-test.yml exec backend_app sh -c "ping  -c 4 mysql"
docker-compose -f docker-compose-test.yml exec backend_app sh -c "nc -z -v mysql 3306"
docker-compose -f docker-compose-test.yml logs backend_app
# curl -s http://localhost:8000/test --connect-timeout 20  --progress-bar | cat # output json write data in mysql
while ! curl -s http://localhost:80/health --connect-timeout 20  --progress-bar ; do sleep 1 ; done
# docker exec -it node_mariadb_test sh -c "mysql -u root -ptest -e 'SHOW DATABASES; USE db_assign; SELECT * from user_knex;'"