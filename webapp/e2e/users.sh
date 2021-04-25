#!/bin/bash
alice=("alice" "alice" "1234")
bob=("bob" "bob" "1234")
charlie=("charlie" "charlie" "1234")


create_user() {
    echo "Creating user <${2}> with username <${1}> and password <${3}>"
    curl --insecure -X POST -d "name=${1}" -d "username=${2}" -d "password=${3}" -d "repeat_password=${3}" https://localhost:8443/api/accounts/new
}

create_user "${alice[@]}"
create_user "${bob[@]}"
create_user "${charlie[@]}"

exit 0