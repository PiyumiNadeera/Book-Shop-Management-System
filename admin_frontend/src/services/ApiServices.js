import axios from "axios";

const base_url = "http://localhost:8080";

const setAuthHeader = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
};

export const getRequest = async (path) =>{
    try{
        setAuthHeader();
        const response = await axios.get(base_url+path);
        return response;
    }catch (error){
        console.log(error)
            // if(error.response.status === 401){
            //     sessionStorage.removeItem('token')
            //     sessionStorage.removeItem('adminId')
            //     sessionStorage.removeItem('adminUsername')
            //     window.location.href = "/"
            // }
    }
}


export const postRequest = async (path,data)=>{
    try{
        setAuthHeader();
        const response = await axios.post(base_url+path,data);
        return response.data;
    }catch(error){
        console.log(error)
        // if(error.response.status === 401){
        //     sessionStorage.removeItem("token");
        //     sessionStorage.removeItem("adminId");
        //     sessionStorage.removeItem("adminUsername");
        //     window.location.href="/";
        // }
    }
}

export const postRequestFile = async (path,data)=>{
    try {
        const response = await axios.post(base_url+path,data,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    } catch (error) {
        console.log(error)
        if(error.response.status === 401){
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userid');
            sessionStorage.removeItem('username');
            window.location.href = '/'

        }
    }
}

export const putRequestFile = async(path,data)=>{
    try{
        setAuthHeader()
        const response = await axios.put(base_url+path,data,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        return response.data;
    }catch(error){
        console.log(error)
        // if(error.response.status === 401){
        //     sessionStorage.removeItem("token");
        //     sessionStorage.removeItem("adminId");
        //     sessionStorage.removeItem("adminUsername");
        //     window.location.href="/";
        // }
    }
}

export const putRequest = async(path,data)=>{
    try{
        setAuthHeader()
        const response = await axios.put(base_url+path,data);
        return response.data;
    }catch(error){
        console.log(error)
        // if(error.response.status === 401){
        //     sessionStorage.removeItem("token");
        //     sessionStorage.removeItem("adminId");
        //     sessionStorage.removeItem("adminUsername");
        //     window.location.href="/";
        // }
    }
}

export const deleteRequest = async(path)=>{
   try{
        const response = await axios.delete(base_url+path);
        return response;
    }catch(error){
        if(error.response.status === 401){
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("adminId");
            sessionStorage.removeItem("adminUsername");
            window.location.href="/";
        }
    }
}