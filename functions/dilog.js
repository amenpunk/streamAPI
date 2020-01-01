exports.config = {
    host : () => {
        const protocol = "https://"
        const project = "atomdev-216900";
        const session = "123456789";
        const method = "detectIntent";
        const versionApi = "2"
        const url = `${protocol}dialogflow.googleapis.com/v${versionApi}/projects/${project}/agent/sessions/${session}:${method}`;
        return url;
    }    
}
