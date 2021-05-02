#!/bin/bash
nss_start () {
    echo "Starting solid server in port 8443"
    docker run -d -p 8443:8443 --name solid -e NODE_TLS_REJECT_UNAUTHORIZED=0 -e SOLID_MULTIUSER=true -e SOLID_NO_REJECT_UNAUTHORIZED=true nodesolidserver/node-solid-server
}

nss_stop () {
    echo "Stopping solid server..."
    docker stop solid
    echo "Removing solid server..."
    docker rm solid
}

add_user () {
    HTTP=$(curl --write-out "%{http_code}\n" -s -o /dev/null --insecure -X POST -d "name=${1}" -d "username=${2}" -d "password=${3}" -d "repeat_password=${3}" https://localhost:8443/api/accounts/new)
    echo "Response code: $HTTP"
}

end () {
    nss_stop
    exit 0
}

default_users () {
    add_user "alice" "alice" "1234"
    add_user "bob" "bob" "1234"
    add_user "charlie" "charlie" "1234"
}

menu () {
    echo "s to start"
    echo "r to restart"
    echo "q to quit (stopping nss)"
    echo "x to exit"
    echo "a to add user (requires curl)"
    echo "u to add users alice bob and charlie with password 1234"
    echo "d equivalent to r + u"
    read  -n 1 -p "Option: " input
    echo ""
    if  [ "$input" = "q" ]; then
        end
    elif [ "$input" = "r" ]; then
        nss_stop
        nss_start
    elif [ "$input" = "s" ]; then
        nss_start
    elif [ "$input" = "x" ]; then
        exit 0
    elif [ "$input" = "a" ]; then
        read -p "Username:" username
        read -p "Name:" name
        read -p "Password:" password
        add_user "$username" "$name" "$password"
    elif [ "$input" = "u" ]; then
        default_users
    elif [ "$input" = "d" ]; then
        nss_stop
        nss_start
        echo "Waiting to for solid server to start"
        sleep 2
        echo "Adding users, if response is 000 then NSS hasn't started yet"
        default_users
    else
        echo "Unrecognized option <${input}>"
    fi
    menu
}

menu

exit 0