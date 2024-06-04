export const getChatResponse = async (query:string) => {

fetch('https://gateway-dev.on-demand.io/chat/v1/sessions', {
    method: 'POST',
    headers: {
        'apikey': '<replace_api_key>',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
        "pluginIds": [], 
        "externalUserId": "<replace_external_user_id>" 
    })
})
.then(response => response.json())
.then(data => {
    const sessionId = data.chatSession.id; // Extracting session ID from the response
    // Call Answer Query API using the sessionId
    fetch(`https://gateway-dev.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
        method: 'POST',
        headers: {
            'apikey': '<replace_api_key>',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            "endpointId": "predefined-openai-gpt4o", 
            "query": {query}, 
            "pluginIds": [
                "plugin-1713962163", 
                "plugin-1717421574", 
                "plugin-1717419365", 
                "plugin-1717418212", 
                "plugin-1717399977", 
                "plugin-1713965172"
            ], 
            "responseMode": "sync" 
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Handle the response data as needed
        return data;
    })
    .catch(error => console.error('Error:', error));
})
.catch(error => console.error('Error:', error));
}