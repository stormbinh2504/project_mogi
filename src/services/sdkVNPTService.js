
import axioscompareface from '../axioscompareface';
const URL_EKYC = 'https://api.idg.vnpt.vn';

const TOKEN_ID = 'cf677413-a4a6-35aa-e053-62199f0a934f';
const TOKEN_KEY = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM5Fq/IpXhKqw0Ummp1UMs2M1KH4YJJ+zg2Dy3dI48OaFRDgwqSLsJng4KyReSDi/pylYFDL9lR1VqSmB29+HW0CAwEAAQ==';
const AUTHORIZATION = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MjAwZmEzZC0zN2QyLTExZWMtYTEzNy0xZGYxN2RlYmQyNzkiLCJhdWQiOlsicmVzdHNlcnZpY2UiXSwidXNlcl9uYW1lIjoiYWRtaW5AZHNjLmNvbS52biIsInNjb3BlIjpbInJlYWQiXSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3QiLCJuYW1lIjoiYWRtaW5AZHNjLmNvbS52biIsInV1aWRfYWNjb3VudCI6IjkyMDBmYTNkLTM3ZDItMTFlYy1hMTM3LTFkZjE3ZGViZDI3OSIsImF1dGhvcml0aWVzIjpbIlVTRVIiXSwianRpIjoiNmJlODk3YTktMzJhOS00YjhhLTk4ZWItMWE3YWQ4MGZkM2E3IiwiY2xpZW50X2lkIjoiYWRtaW5hcHAifQ.HoIECREIjvfsydLfKiA6WkvCYSC-Uij_O5tEpkyw1tIOKpz75NOQ_YPuUzTJCw7kwZDDXB1HVxNTGhT_KPXQlIgSqT4m1BLRA51CnsSS-Sl-m0MVyz7nahslbzuZ1lQTqu1xv8teJkvC5gxlUMQEfjG8bnTPI4cxUhFZVpdabURlMyBukUJkq02kEubaOf2OxWs4cv8YzQGqIM0GHIg-snZsqEXZfdjt0-QTTjqfYatBapVUueXrHVm4agRvLTk5oev9GzcpWW-5Gs_YQsvWt1E-mpp1PYzplErcn3RbfClWQyTF5xKJBJc4LDhOJW6cxGTrhDFnVWvZUw2PM8CRGw"

const client_session = "20221025000643"

const sdkVNPTService = {
    addFileServerEkyc(data) {
        let url = `${URL_EKYC}/file-service/v1/addFile`;
        let header = {
            headers: {
                "Token-id": TOKEN_ID,
                "Token-key": TOKEN_KEY,
                "Authorization": `Bearer ` + AUTHORIZATION,
            },
        }
        let form = new FormData();
        form.append('file', data.file);
        form.append('title', data.title ? data.title : '',);
        form.append('description', data.description ? data.description : '')
        return axioscompareface.post(url, form, header);
    },

    // compare 2 mặt
    compare2Faces(data) {
        let url = `${URL_EKYC}/ai/v1/face/compare`;
        let header = {
            headers: {
                "Token-id": TOKEN_ID,
                "Token-key": TOKEN_KEY,
                "Authorization": `Bearer ` + AUTHORIZATION,
            },
        }

        // let form = new FormData();
        // form.append('img_front', data.image_hash_front);
        // form.append('img_face', data.image_hash_face);
        // form.append('client_session', client_session)
        // form.append('token', 'token')
        // return axioscompareface.post(url, form, header);

        let body = {
            img_front: data.image_hash_front,
            img_face: data.image_hash_face,
            client_session: client_session,
            token: 'token'
        }

        return axioscompareface.post(url, body, header);

    },

    comparetwoFaces(data) {
        let url = `${URL_EKYC}/face-service/face/verify`;
        let header = {
            headers: {
                "Token-id": TOKEN_ID,
                "Token-key": TOKEN_KEY,
                "Authorization": `Bearer ` + AUTHORIZATION,
            },
        }

        let body = {
            img: data.hash,
            id_card: data.id_card,
            id_type: data.id_type,
            unit: data.unit
        }

        // let body = {
        //     img_front: data && data.image_hash_front,
        //     img_face: data && data.image_hash_face,
        //     client_session: data.client_session,
        //     token: 'token'
        // }


        return axioscompareface.post(url, body, header);
    },
}

export default sdkVNPTService

