import axios from "axios";


// token for authentificated on https://userscare-apis.orange.cm
const config = {
  headers: {
      'Authorization': 'Basic c2VkY29fdGVzdDpzZWRjb190ZXN0'
  }
};
// this API return the user for a key work but the it doent return all the required information
export const getApiSuggestions = (word:string) => {
  let result = axios
    .get(`https://userscare-apis.orange.cm/api/Realms/digital-app/Users?search=${word}&max=10`, config)
    .then((response) => {
        let listLogins = "";
        let tabUser = response.data;
        for (let i = 0; i < tabUser.length; i++) {
            listLogins = listLogins + "logins=" + tabUser[i].username + "&";
        }
        return listLogins;
    })
    .catch((error) => {
        console.log(error)
    });

  return result;
};

// this methode helm to get all information on users by passing the cuids
export const getUsersInfos = async (cuids:string|void) => {
  let result = await axios
    .get(`https://tools-svc.orange.cm/api/InfoEmployee/v2?${cuids}`)
    .then((response) => {
        let listUser = []
        let list = response.data;
        for (let i = 0; i < list.length; i++) {
          // add only user who have email and the cuid is different to the adfs_svc and ___VMware_Conv_SA___
          if(list[i].LogonName.length == 8 && //settings.cuid_length && 
            list[i].LogonName != "adfs_svc" && 
            list[i].LogonName != "___VMware_Conv_SA___"){

            listUser.push(
              {
                name: list[i].Name,
                email: list[i].EMailAddress,
                cuid: list[i].LogonName,
                direction: list[i].DistinguishedName,
                // tel: list[i].MobileNumber
              },
            );

          }  
        }
        return listUser;
    })
    .catch((error) => {
        return [];
    });

  return result;
}



export const filterNameValue = (responses:Array<any>) => {
  return responses.map((employe : any) => ({
      label: employe.name,
      value: employe,
  }));
};