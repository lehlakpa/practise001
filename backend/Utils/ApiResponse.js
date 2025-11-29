class ApiResponse{
    cpnstructor(status, message="Success", data){
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
export default ApiResponse;