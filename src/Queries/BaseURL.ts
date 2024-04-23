

export default {
    baseURL : "http://192.168.0.135:8000/api",
    getUserKey : () => {
        const UserDataStorage = localStorage.getItem("@ecotech-dados")
        if(UserDataStorage){
            const UserData = JSON.parse(UserDataStorage);
            return UserData.chave
        }
    }
} 