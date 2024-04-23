

export default {
    baseURL : "http://localhost:8000/api",
    getUserKey : () => {
        const UserDataStorage = localStorage.getItem("@ecotech-dados")
        if(UserDataStorage){
            const UserData = JSON.parse(UserDataStorage);
            return UserData.chave
        }
    }
} 