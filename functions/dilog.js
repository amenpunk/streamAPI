module.exports.config = {
    host : () => {
        const protocol = "https://"
        const project = "atomdev-216900";
        const session = "2c7d5d22-de1d-cfb9-ba23-ec01127372e4";
        const method = "detectIntent";
        const versionApi = "2"
        const url = `${protocol}dialogflow.googleapis.com/v${versionApi}/projects/${project}/agent/sessions/${session}:${method}`;
        return url.replace(/\s/g,'')
    }    
}
