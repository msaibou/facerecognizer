const API_KEY = '19aN26m-kL9GXjLFE5RYEKV5-Df4Vet7';
const API_SECRET = 'kANJK1oVZVWKvxZiPgP5ut-5XD0fejTs';
const DETECT_URL = 'https://api-us.faceplusplus.com/facepp/v3/detect';
const CREATE_URL = 'https://api-us.faceplusplus.com/facepp/v3/faceset/create';
const ADDFACE_URL = 'https://api-us.faceplusplus.com/facepp/v3/faceset/addface';
const SEARCH_URL = 'https://api-us.faceplusplus.com/facepp/v3/search';
const createFormData = (body) => {
    const data = new FormData();
    //hello
    /*if (photo) {
        data.append("image_base64", photo.base64);
    }*/
    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });
    return data;
};

export const detectFace = async (img) => {
    const params = createFormData({ api_key: API_KEY, api_secret: API_SECRET, image_base64: img.base64 });
    return new Promise((resolve, reject) => {
        fetch(DETECT_URL, { "method": "POST", body: params })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.error_message == "CONCURRENCY_LIMIT_EXCEEDED") {
                    //console.log(responseJson);
                    detectFace(img);
                }
                else {
                    resolve(responseJson);
                }
            })
            .catch((error) => { reject(error); });
    });
}
export const createFaceSet = () => {
    const params = createFormData({ api_key: API_KEY, api_secret: API_SECRET });
    return new Promise((resolve, reject) => {
        fetch(CREATE_URL, { "method": "POST", body: params })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error) => { reject(error); });
    });
}
export const addFace = (faceset, faces) => {
    const params = createFormData({
        api_key: API_KEY, api_secret: API_SECRET,
        faceset_token: faceset, face_tokens: faces
    });
    return new Promise((resolve, reject) => {
        fetch(ADDFACE_URL, { "method": "POST", body: params })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error) => { reject(error); });
    });
}
export const searchFace = (faceset, img) => {
    console.log("The faceset where i will look in : " + faceset);
    const params = createFormData({ api_key: API_KEY, api_secret: API_SECRET, faceset_token: faceset, image_base64: img.base64 });
    return new Promise((resolve, reject) => {
        fetch(SEARCH_URL, { "method": "POST", body: params })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                if (responseJson.error_message == "CONCURRENCY_LIMIT_EXCEEDED") {
                    //console.log(responseJson);
                    searchFace(faceset, img);
                }
                else {
                    resolve(responseJson);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });

}
