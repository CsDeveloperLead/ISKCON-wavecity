const {username,password} = process.env;
export const connectionstr = "mongodb+srv://"+username+":"+password+"@cluster0.a7npt.mongodb.net/ISCKON?retryWrites=true&w=majority&appName=Cluster0"