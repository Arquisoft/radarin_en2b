FROM grafana/grafana:latest
ENV GF_AUTH_DISABLE_LOGIN_FORM=true
ENV GF_AUTH_ANONYMOUS_ENABLED=true
ENV GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
ADD provisioning /etc/grafana/provisioning
ADD heroku-run.sh /
ADD grafana.ini /etc/grafana/grafana.ini
ENTRYPOINT ["/heroku-run.sh"]