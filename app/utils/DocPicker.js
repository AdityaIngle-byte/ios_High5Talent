import DocumentPicker from 'react-native-document-picker';
// import pdf2base64 from 'pdf-to-base64';
// import RNFetchBlob from 'rn-fetch-blob';
import { showAlert } from './Message';


export const getDocument = () => new Promise((resolve,reject) => {

    const types = [
        DocumentPicker.types.pdf,
        DocumentPicker.types.doc,
        DocumentPicker.types.docx
    ]

    DocumentPicker.pick({
        type : types
    })
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })

})



export const convertPdfToBase64 = () => new Promise((resolve, reject) => {

    const types = [
        DocumentPicker.types.pdf,
    ]

    DocumentPicker.pick({
        type : types
    })
        .then((response) => {
            const file = response[0];
            console.log('[DocPicker.js] ',file.uri);
            convertBlobToBase64(file.uri)
                .then(result => {
                    console.log('[DocPicker,js] ',result,file);
                    resolve({base64String : result,file});
                    
                })
                .catch(error => {
                    console.log('[DocPicker,js] ',error);
                    reject(error)
                })
        })
        .catch(error => {
            console.log('[DocPicker.js] ',error);
            reject(error)
        })
   
})

// export const convertBlobToBase64 = path => new Promise(async(resolve, reject) => {
//     let arr = path.split('/')
//     const dirs = RNFetchBlob.fs.dirs
//     const filePath = `${dirs.DocumentDir}/${arr[arr.length - 1]}`
//     console.log('[DocPicker.js] FilePath: ', filePath,'\n',path)

//     RNFetchBlob.fs.exists(path)
//         .then(response => {
//             console.log('[DocPicker.js] IS DIR : ',response)
//         })
//         .catch(error => {
//             console.log('[DocPicker.js] IS DIR error: ',error)
//         })

//     RNFetchBlob.fs.readFile(path, 'base64')
//         .then(data => resolve(data))
//         .catch(error => reject(error))
// });





// let arr = fileUri.split('/')
            // const dirs = RNFetchBlob.fs.dirs
            // const filePath = `${dirs.DocumentDir}/${arr[arr.length - 1]}`
            // console.log('[DocPicker.js] FilePath: ', filePath)
            // RNFetchBlob.fs
            //     .readFile(fileUri, 'base64')
            //         .then((data) => {
            //             resolve(data)
            //             alert(JSON.stringify(data))
            //         })
            //         .catch((error) => {
            //             reject(error)
            //             alert(JSON.stringify(error))
            //         });