const API_KEY = 'b97b066171d442a69e867bf901a1ccd0';
const API_KEY2 = '48a40cb8eafb434bb538f6fe4856317a';
const END_POINT = 'https://sirajfacerecognizer.cognitiveservices.azure.com/';
const LOCALISATION = 'southafricanorth';
const HOST = LOCALISATION + '.api.cognitive.microsoft.com';
const API_URL = 'https://' + LOCALISATION + '.api.cognitive.microsoft.com/face/v1.0/';
const LARGE_PERSON_GROUP_URL = API_URL + 'largepersongroups/';
const DETECT_URL = API_URL + 'detect';
const DETETCT_MODEL = 'detection_01';
const RECOGNITION_MODEL = 'recognition_03';

const createFormData = (body) => {
    const data = new FormData();
    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });
    return data;
};

export const createLargePersonGroup = (groupId, groupName) => {
    const params = createFormData({ name: groupName, userData: 'test user data', recognitionModel: RECOGNITION_MODEL });
    const headerParams = {
        Host: HOST,
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': API_KEY,
    };
    return new Promise((resolve, reject) => {
        fetch(LARGE_PERSON_GROUP_URL + groupId, {
            "method": "PUT", headers: headerParams, body: params
        })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error) => { reject(error); });
    });
}
export const trainLargePersonGroup = (groupId) => {
    const headerParams = {
        Host: HOST,
        'Ocp-Apim-Subscription-Key': API_KEY,
    };
    return new Promise((resolve, reject) => {
        fetch(LARGE_PERSON_GROUP_URL + groupId + '/train', {
            "method": "POST", headers: headerParams, body: {}
        })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error) => { reject(error); });
    });
}


export const largePersonGroupTrainingStatus = (groupId) => {
    const headerParams = {
        Host: HOST,
        'Ocp-Apim-Subscription-Key': API_KEY,
    };
    return new Promise((resolve, reject) => {
        fetch(LARGE_PERSON_GROUP_URL + groupId + '/training', {
            "method": "POST", headers: headerParams, body: {}
        })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error) => { reject(error); });
    });
}

export const addPerson = (groupId = 'almadina', username, userdata = "") => {
    const params = createFormData({ name: groupName, userData: 'test user data' });
    const headerParams = {
        Host: HOST,
        'Ocp-Apim-Subscription-Key': API_KEY,
        'Content-Type': 'application/json',
    };
    return new Promise((resolve, reject) => {
        fetch(LARGE_PERSON_GROUP_URL + groupId + '/persons', {
            "method": "POST", headers: headerParams, body: params
        })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error) => { reject(error); });
    });
}
export const addFace = (groupId = 'almadina', personId, img) => {
    const photo = base64ToArrayBuffer.decode(img.base64);
    const params = createFormData({ photo });
    const headerParams = {
        Host: HOST,
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': API_KEY,
    };
    return new Promise((resolve, reject) => {
        fetch(LARGE_PERSON_GROUP_URL + groupId + '/persons/' + personId + '/persistedfaces?detectionModel=' + DETETCT_MODEL
            , { "method": "POST", headers: headerParams, body: params })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error) => { reject(error); });
    });
}

export const detectFace = (img) => {
    const photo = base64ToArrayBuffer.decode(img.base64);
    const params = createFormData({ photo });
    const headerParams = {
        Host: HOST,
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': API_KEY,
    };
    return new Promise((resolve, reject) => {
        fetch(DETECT_URL + '?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=' + RECOGNITION_MODEL + '&detectionModel=' + DETETCT_MODEL
            , { "method": "POST", headers: headerParams, body: params })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error) => { reject(error); });
    });
}

export const identify = (groupId, faces, maxResult = 1, confidence = 0.5) => {

    const params = createFormData({
        largePersonGroupId: groupId,
        faceIds: faces,
        maxNumOfCandidatesReturned: maxResult,
        confidenceThreshold: confidence
    });
    const headerParams = {
        Host: HOST,
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': API_KEY,
    };
    return new Promise((resolve, reject) => {
        fetch(API_URL + 'identify', {
            "method": "POST", headers: headerParams, body: params
        })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error) => { reject(error); });
    });
}