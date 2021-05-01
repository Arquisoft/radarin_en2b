const Prometheus = () => {
    return (
        <div data-testid="div-embed" className="embed-container" style={{position: "relative", height: "0", overflow: "hidden"}}>
            <iframe data-testid="iframe-prometheus" className="responsive-iframe" src="https://radarinen2bprometheus.herokuapp.com/" title="prometheus" 
            style={{position: "absolute", top: "0", left: "0", height: "100%", width: "100%"}} frameBorder="0" allowFullScreen/>
        </div>
    );
};

export default Prometheus;