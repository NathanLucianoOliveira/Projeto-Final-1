namespace Projeto
{
    public class Response<T> : Response
    {
        public T? Data { get; set; }


        public Response(T? data, string? message, bool success = true) : base(message, success)
        {
            Data = data;
        }

        public Response(string? message, bool success = false) : base(message, success)
        {
        }
    }

    public class Response
    {
        public string? Message { get; set; }
        public bool Success { get; set; }

        public Response(string? message, bool success = false)
        {
            Message = message;
            Success = success;
        }
    }
}
