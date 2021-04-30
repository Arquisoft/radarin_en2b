const Grafana = () => {
    return (
        <div class="embed-container" stylw={{position: "relative", height: "0", overflow: "hidden"}}>
            <iframe class="responsive-iframe" src="https://radarinen2bgrafana.herokuapp.com/" title="grafana"
            style={{position: "absolute", top: "0", left: "0", height: "100%", width: "100%"}} frameborder="0" allowfullscreen/>
        </div>
    );
};

export default Grafana;
