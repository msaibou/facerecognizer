const API_KEY = "b97b066171d442a69e867bf901a1ccd0";
const API_KEY2 = "48a40cb8eafb434bb538f6fe4856317a";
const END_POINT = "https://sirajfacerecognizer.cognitiveservices.azure.com/";
const LOCATION = "southafricanorth";
//const URL = END_POINT + "/face/v1.0/facelists/";
//const URL = 'https://' + LOCATION + ".api.cognitive.microsoft.com/" + "face/v1.0/facelists/";
const URL = 'https://southafricanorth.api.cognitive.microsoft.com/face/v1.0/facelists/';
export const createFaceList = (info) => {
    fetch(URL
        ,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //'Content-Type': 'application/octet-stream',
            },
            body: JSON.stringify({
                "name": info.name,
                "userData": info.data,
                "api_key": API_KEY,
                "recognitionModel": "recognition_03"
            }),

        })
        .then(response => response.json())
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch((error) => { console.error(error); });
}
export const addFace = (img, personInfo) => {
    fetch(URL, {
        method: 'POST',
        params: {
            detectionModel: 'detection_02',
            returnFaceId: true
        },
        data: {
            url: img,
        },
        headers: { 'Ocp-Apim-Subscription-Key': API_KEY },
        /*headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstParam: 'yourValue',
            secondParam: 'yourOtherValue'
        })*/
    })
        .then((response) => {
            console.log('Status text: ' + response.status)
            console.log('Status text: ' + response.statusText)
            console.log()
            console.log(response.data)
        })
        .catch((error) => { console.error(error); });
}
export function recognize(img) {
    fetch(URL, {
        method: 'POST',
        params: {
            detectionModel: 'detection_02',
            returnFaceId: true
        },
        data: {
            url: img,
        },
        headers: { 'Ocp-Apim-Subscription-Key': API_KEY },
    })
        .then((response) => {
            console.log('Status text: ' + response.status)
            console.log('Status text: ' + response.statusText)
            console.log()
            console.log(response.data)
        })
        .catch((error) => { console.error(error); });
}

