import axios from "axios";








export const DownloadButton = () => {
 
    const handleDownload = () => {
        axios({
            url: 'http://localhost:3001/api/download-csv', // Replace with your server URL
            method: 'GET',
            responseType: 'blob', // Important: This tells axios to treat the response as a binary blob
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.csv');
            document.body.appendChild(link);
            link.click();
          });
    }


  return <>
  <button onClick={handleDownload}>Download summery</button>
  </>
}

