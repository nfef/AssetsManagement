import fileDownload from "js-file-download";
import { toast } from "react-toastify";
import { clients } from "../lib/axios";


//Téléchargement connaissant l'url
export const download = async (url : string,filename : string) =>  {
  const axios = await clients();

  let promise = new Promise((resolve,reject) => {
  
    // check if the url is absolute or not
    if(url.indexOf('://') > 0 || url.indexOf('//') === 0){
      downloadFile(url,filename);
      resolve(true)
      return;
    }else{
      return axios.get(url, { responseType: 'arraybuffer' })
      .then(response => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        fileDownload(blob, filename); // npm " js-file-download" responsible for downloading the file for the user
        resolve(true)
      })
      .catch((e) => {
        reject(true);
      });
    }
  });

  toast.promise(promise,{
    pending: "Téléchargement en cours ...",
    //loading: 'Téléchargement en cours ...',
    success: 'Téléchargement terminé avec succès',
    error: 'Erreur de téléchargement'
  },
  {
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
} 

const downloadFile = (url : string, filename: string) => {
  const link = document.createElement('a')
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.setAttribute("target","_blank");
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}